const express = require('express');
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs'); // file writing import
const app = express();
const scraper = require('./scraper');
const { insertWatchesFromJSON } = require('./database');

app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send("Welcome");
});

app.listen(5000, () => {
	console.log('Server Started at 5000');
});

const rolexJSON = 'rolex_data.json';
const patekJSON = 'patek_data.json';
const audemarsJSON = 'audemars_data.json';
const omegaJSON = 'omega_data.json';
const seikoJSON = 'seiko_data.json';

insertWatchesFromJSON(rolexJSON);
insertWatchesFromJSON(patekJSON);
insertWatchesFromJSON(audemarsJSON);
insertWatchesFromJSON(omegaJSON);
insertWatchesFromJSON(seikoJSON);
