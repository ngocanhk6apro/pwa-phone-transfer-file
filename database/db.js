const sqlite = require("sqlite3");
const dbName = process.env.DATABASE_NAME;
const db = new sqlite.Database(dbName, (err) => {
    if (err) {
        throw err;
    }
});
module.exports = db;