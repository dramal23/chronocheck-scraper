const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');

const DB_FILE = 'watch_database.db';

// Create new db using sqlite
const db = new sqlite3.Database(DB_FILE);

// Create table to populate watches
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS watches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand_name TEXT,
        model_name TEXT,
        price INTEGER,
        image TEXT,
        datetime TEXT,
        CONSTRAINT unique_model_date UNIQUE (model_name, datetime)
    )`);
});

// function for inserting datas
async function insertWatchesFromJSON(jsonFile) {
    try {
        const watchesData = await fs.readJSON(jsonFile);
        const insertStmt = db.prepare(`INSERT INTO watches (brand_name, model_name, price, image, datetime)
            VALUES (?, ?, ?, ?, ?)`);

        watchesData.forEach(watch => {
            insertStmt.run(watch.brand_name, watch.model_name, watch.price, watch.image, watch.datetime);
        });

        insertStmt.finalize();
        console.log(`Data from ${jsonFile} inserted into database.`);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

module.exports = { insertWatchesFromJSON };

