class ApplicationDAO {
    #db;
    constructor() {
        this.#db = require("./db");
    }

    runAsync(sql, params) {
        return new Promise((resolve, reject) => {
            this.#db.run(sql, params, function (err){
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        id: this.lastID
                    });
                }
            });
        });
    }

    getAsync(sql, params=[]) {
        return this.runAsync(sql, params);
    }

    getAllAsync(sql, params=[]) {
        return new Promise((resolve, reject) => {
            this.#db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = ApplicationDAO;