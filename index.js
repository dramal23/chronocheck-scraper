const express = require('express');
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs'); // file writing import
const app = express();
const scraper = require('./scraper');

app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send("Welcome");
});

app.listen(5000, () => {
	console.log('Server Started at 5000');
});
