const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

async function scraper(url, fileName) {
    const result = [];

    try {
        const response = await axios(url);
        const html_data = response.data;
        const $ = cheerio.load(html_data);

        const keys = ["image", "brand_name", "model_name", "price", "datetime"];
        const selectedElem = ".rcard-body";

        $(selectedElem).each((parentIndex, parentElem) => {
            const data = {};

            // Extract image URL
            const imageUrlDataOriginal = $(parentElem).find(".content .img-responsive").attr("data-original");
            const imageUrlSrc = $(parentElem).find(".content .img-responsive").attr("src");
            data[keys[0]] = imageUrlDataOriginal;

            // Extract brand name and model name
            const brandName = $(parentElem).find(".p-x-3.text-left .d-block").text().trim();
            const modelName = $(parentElem).find(".p-x-3.text-left strong").text().trim();
            data[keys[1]] = brandName;
            data[keys[2]] = modelName;

            // Extract price
            const priceText = $(parentElem).find(".text-on-surface-highlight").text().trim();
            const numericValue = priceText.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)/);
            const numericString = numericValue ? numericValue[1].replace(/,/g, '') : null;
            data[keys[3]] = numericString;

            // Extract timestamp
            const timestamp = new Date().toLocaleDateString();
            data[keys[4]] = timestamp;

            if (modelName.length === 0 && brandName.length === 0) {
                console.log("Current data is empty, not pushed");
            } else {
                result.push(data);
            }
        });

        // Write data to JSON file
        fs.writeFileSync(fileName, JSON.stringify(result, null, 2), 'utf-8');
        console.log(`Scrapped data saved to ${fileName}`);

    } catch (error) {
        console.error("Error:", error);
    }

    return result;
}

scraper("https://www.chrono24.com/rolex/index.htm", "rolex_data.json");
scraper("https://www.chrono24.com/patekphilippe/index.htm", "patek_data.json");
scraper("https://www.chrono24.com/audemarspiguet/index.htm", "audemars_data.json");
scraper("https://www.chrono24.com/omega/index.htm", "omega_data.json");
scraper("https://www.chrono24.com/seiko/index.htm", "seiko_data.json");

module.exports = scraper;

