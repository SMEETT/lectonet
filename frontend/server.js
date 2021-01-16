// imports
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");

const slugify = require("slugify");
const axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const md = require("markdown-it")();

// api base path
const apiPath = process.env.apiPath || "http://localhost:1337";
const priceCalcMailPW = process.env.priceCalcMailPW || "Prei$rechner1";
const priceCalcSMTP = process.env.priceCalcSMTP || "smtp.ionos.de";

// express init
const app = express();

// CSP Header
app.use(
	expressCspHeader({
		directives: {
			"default-src": [SELF, apiPath, "http://localhost:*"],
			"script-src": [SELF, INLINE, "http://localhost:*"],
			"style-src": [SELF, "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
			"img-src": [SELF, "data:", "images.com"],
			"worker-src": [NONE],
			"block-all-mixed-content": true,
			"font-src": ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
			"frame-ancestors": [NONE],
			"connect-src": [apiPath, "ws://localhost:*"],
		},
	})
);

// app.use(cors());

// use EJS as template engine
app.set("view engine", "ejs");

// set up static folders
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use("/svelte-components", express.static(path.resolve(__dirname, "svelte-components")));

//////////////////////////////////
// index route
//////////////////////////////////
app.get("/", (req, res) => {
	axios.get(`${apiPath}/indices`).then((response) => {
		// console.log(response.data[0].copytext);
		res.render("pages/index", {
			data: response.data[0],
			md: md.renderInline(response.data[0].copytext),
		});
	});
});

//////////////////////////////////
// dynamic routing
//////////////////////////////////
app.get("/:path", (req, res) => {
	axios.get(`${apiPath}/pages`).then((response) => {
		// look for page with a title that matches the requested path
		const match = response.data.find((page) => {
			return slugify(page.title, { lower: true }) === req.params.path;
		});

		// if no match is returned, render 404
		if (!match) {
			console.log("No match/404");
			res.render("pages/404", {
				data: { title: "Page doesn't exist", content: "Page doesn't exist" },
			});
			return;
		}

		// render template based on provided category
		if (match.category === "leistungen") {
			console.log(apiPath);
			res.render("pages/genericSite", {
				data: match,
				apiPath: apiPath,
				md: md.renderInline(match.copytext),
			});
		}
	});
});

//////////////////////////////////
// send 'Preisrechner' E-Mail
//////////////////////////////////

app.get("/send/price", (req, res) => {
	const receiver = req.query.email;

	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		port: 587,
		host: priceCalcSMTP,
		auth: {
			user: "preisrechner@lectonet.de",
			pass: priceCalcMailPW,
		},
		tls: {
			ciphers: "SSLv3",
		},
		secureConnection: false,
	});

	const mailData = {
		from: "preisrechner@lectonet.de", // sender address
		to: receiver, // list of receivers
		subject: "Sending Email using Node.js",
		text: "That was easy!",
		html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
	};

	transporter.sendMail(mailData, function (err, info) {
		if (err) console.log(err);
		else console.log(info);
	});
	return;
});

const port = process.env.PORT || 1338;
app.listen(port, () => console.log(`Server running on port ${port}`));
