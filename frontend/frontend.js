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
const compression = require("compression");

// environment variables
const strapiURL = process.env.strapiURL;
const priceCalcMailPW = process.env.priceCalcMailPW;
const priceCalcSMTP = process.env.priceCalcSMTP;
const frontendPORT = process.env.frontendPORT;

// express init
const app = express();

app.use(compression());

// CSP Header
app.use(
	expressCspHeader({
		directives: {
			"default-src": [SELF, strapiURL],
			"script-src": [SELF],
			"style-src": [SELF, "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
			"img-src": [SELF],
			"worker-src": [NONE],
			"block-all-mixed-content": true,
			"font-src": ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
			"frame-ancestors": [NONE],
			"connect-src": [SELF, strapiURL],
		},
	})
);

// app.use(cors());

// use EJS as template engine
app.set("view engine", "ejs");

// set up static folders
app.use("/static", express.static(path.resolve(__dirname, "static")));

app.use(function (req, res, next) {
	// TODO: have one API-endpoint to get data necessary for all pages

	const index = `${strapiURL}/indices`;
	const pages = `${strapiURL}/pages`;

	const requestIndex = axios.get(index);
	const requestPages = axios.get(pages);

	axios
		.all([requestIndex, requestPages])
		.then(
			axios.spread((...responses) => {
				const responseIndex = responses[0];
				const responsePages = responses[1];

				// console.log(responsePages.data);

				res.locals.resIndex = responseIndex.data[0];
				res.locals.resPages = responsePages.data;

				next();
			})
		)
		.catch((err) => {
			console.log(err);
		});

	// axios.get(`${strapiURL}/indices`).then((response) => {
	// 	res.locals.indexData = response.data[0];
	// 	next();
	// });
});

//////////////////////////////////
// index route
//////////////////////////////////
app.get("/", (req, res) => {
	const indexData = res.locals.resIndex;
	res.render("pages/index", {
		title: "Home",
		headline: md.renderInline(indexData.headline),
		subheadline: md.renderInline(indexData.subheadline),
		copytext: md.renderInline(indexData.copytext),
	});
});

// //////////////////////////////////
// // index route
// //////////////////////////////////
// app.get("/", (req, res) => {
// 	axios.get(`${strapiURL}/indices`).then((response) => {
// 		console.log(response.data[0]);
// 		res.render("pages/index", {
// 			title: "Home",
// 			headline: md.renderInline(response.data[0].headline),
// 			subheadline: md.renderInline(response.data[0].subheadline),
// 			copytext: md.renderInline(response.data[0].copytext),
// 		});
// 	});
// });

//////////////////////////////////
// dynamic routing
//////////////////////////////////
app.get("/:path", (req, res) => {
	axios.get(`${strapiURL}/pages`).then((response) => {
		console.log(response);
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
			console.log(strapiURL);
			res.render("pages/genericSite", {
				title: md.renderInline(response.data[0].headline),
				strapiURL: strapiURL,
				md: md.renderInline(match.copytext),
			});
		}
	});
});

//////////////////////////////////
// send 'Preisrechner' E-Mail
//////////////////////////////////

app.post("/send/price", (req, res) => {
	console.log("/send/price");

	const receiver = req.query.email;
	const firstname = req.query.firstname;
	const lastname = req.query.lastname;
	const price = req.query.price;
	const service = req.query.service;
	const type = req.query.type;
	const quantity = req.query.quantity;

	// don't show 'quantity' when 'Bewerbung' was selected
	let interchangeableBit;
	if (service === "Bewerbung") {
		interchangeableBit = `
        <b>Umfang: </b>${type}<br>
        `;
	} else {
		interchangeableBit = `
        <b>Art: </b>${type}<br>
        <b>Umfang: </b>${quantity} Seite(n)<br>
        `;
	}

	const subject = "Ihre Preisanfrage auf Lectonet.de";
	const html = `<b>Sehr geehrte(r) ${firstname} ${lastname}! </b><br>
    <br>
    Anbei finden Sie den von Ihnen berechneten Preis:<br>
    <br>
    <b>Leistung: </b>${service}<br>
    ${interchangeableBit}
    <b>Preis: </b>${price} €<br>
    <br>
    Bei weiteren Fragen stehen wir Ihnen gerne zur Verfügung.<br/>
    <br>
    Mit freundlichen Grüßen, <br>
    R. Wackwitz, Geschäftsführer<br>
    <br>
    <img src="cid:unique@kreata.ee"/><br>
    Rüdiger Wackwitz<br>
    Eine Straße 17<br>
    53215 Ort<br>
    <br>
    02214 / 4236231<br>
    info@lectonet.de<br>
    www.lectonet.de<br>
    `;

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
		subject: subject,
		html: html,
		attachments: [
			{
				filename: "logo_grey.svg",
				path: "../frontend/static/images/logo_grey.svg",
				cid: "unique@kreata.ee", //same cid value as in the html img src
			},
		],
	};

	transporter.sendMail(mailData, function (err, info) {
		if (err) console.log(err);
		else console.log(info);
	});
	res.end();
});

app.listen(frontendPORT, () => console.log(`Server running on port ${frontendPORT}`));
