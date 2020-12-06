// imports
const express = require("express");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const axios = require("axios");
const slugify = require("slugify");

// express init
const app = express();

// use EJS as template engine
app.set("view engine", "ejs");

// set up static folder
app.use("/static", express.static(path.resolve(__dirname, "static")));

// index route
app.get("/", (req, res) => {
	axios.get("http://localhost:1337/index").then((response) => {
		res.render("pages/index", {
			data: response.data,
		});
	});
});

// dynamic routing
app.get("/:path", (req, res) => {
	axios.get("http://localhost:1337/pages").then((response) => {
		// look for page with a title that matches the requested path
		const match = response.data.find((page) => {
			return slugify(page.title, { lower: true }) === req.params.path;
		});

		// if no match is returned, render 404
		if (!match) {
			console.log("No match/404");
			res.render("pages/404", { data: { title: "Page doesn't exist", content: "Page doesn't exist" } });
			return;
		}

		// render template based on provided category
		if (match.category === "leistungen") {
			res.render("pages/genericSite", {
				data: match,
			});
		}
	});
});

const port = process.env.PORT || 1338;
app.listen(port, () => console.log(`Server running on port ${port}`));
