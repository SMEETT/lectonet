const express = require("express");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const axios = require("axios");
const slugify = require("slugify");

const app = express();

// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up static folder
app.use("/static", express.static(path.resolve(__dirname, "static")));

const pageTitle = "lectonet Title";

app.get("/", (req, res) => {
	res.render("pages/index", {
		pageTitle: pageTitle,
	});
});

app.get("/:path", (req, res) => {
	axios.get("http://localhost:1337/pages").then((response) => {
		// look for page with a title that matches the requested path
		const match = response.data.find((page) => {
			return slugify(page.title, { lower: true }) === req.params.path;
		});

		// if no match is returned, render 404
		if (!match) {
			console.log("No match1");
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

const port = process.env.PORT || 5060;
app.listen(port, () => console.log(`Server running on port ${port}`));
