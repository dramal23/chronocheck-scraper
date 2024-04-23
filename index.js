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

const blancpainJSON = 'blancpain_data.json';
const zenithJSON = 'zenith_data.json';
const longinesJSON = 'longines_data.json';
const hamiltonJSON = 'hamilton_data.json';
const hublotJSON = 'hublot_data.json';

const rolexJSON = 'rolex_data.json';
const audemarsJSON = 'audemars_data.json';
const seikoJSON = 'seiko_data.json';
const omegaJSON = 'omega_data.json';
const patekJSON = 'patek_data.json';

const tagheuerJSON = 'tagheuer_data.json';
const jaegerJSON = 'jaeger_data.json';
const tudorJSON = 'tudor_data.json';
const cartierJSON = 'cartier_data.json';
const breitlingJSON = 'breitling_data.json';

insertWatchesFromJSON(blancpainJSON);
insertWatchesFromJSON(zenithJSON);
insertWatchesFromJSON(longinesJSON);
insertWatchesFromJSON(hamiltonJSON);
insertWatchesFromJSON(hublotJSON);

insertWatchesFromJSON(rolexJSON);
insertWatchesFromJSON(audemarsJSON);
insertWatchesFromJSON(seikoJSON);
insertWatchesFromJSON(omegaJSON);
insertWatchesFromJSON(patekJSON);

insertWatchesFromJSON(tagheuerJSON);
insertWatchesFromJSON(jaegerJSON);
insertWatchesFromJSON(tudorJSON);
insertWatchesFromJSON(cartierJSON);
insertWatchesFromJSON(breitlingJSON);
