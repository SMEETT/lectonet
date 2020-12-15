// imports
const express = require("express");
const slugify = require("slugify");
const axios = require("axios");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const md = require("markdown-it")();

// express init
const app = express();

// use EJS as template engine
app.set("view engine", "ejs");

// set up static folders
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use("/svelte-components", express.static(path.resolve(__dirname, "svelte-components")));

// api base path
const apiPath = process.env.apiPath || "http://localhost:1337";

// index route
app.get("/", (req, res) => {
	axios.get(`${apiPath}/indices`).then((response) => {
		console.log(response.data[0].copytext);
		res.render("pages/index", {
			data: response.data[0],
			md: md.renderInline(response.data[0].copytext),
		});
	});
});

// dynamic routing
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
			res.render("pages/genericSite", {
				data: match,
				md: md.renderInline(match.copytext),
			});
		}
	});
});

const port = process.env.PORT || 1338;
app.listen(port, () => console.log(`Server running on port ${port}`));
