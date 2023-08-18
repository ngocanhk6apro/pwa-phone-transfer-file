const ApplicationDAO = require("./app-dao");

class UploadRepository {
    #appDAO;

    constructor() {
        this.#appDAO = new ApplicationDAO();
    }

    createTableAsync() {
        return this.#appDAO.runAsync(`CREATE TABLE IF NOT EXISTS tblUpload(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fileName TEXT,
            fileSize INTEGER,
            fileType TEXT,
            status VARCHAR(10)
        )`);
    }

    insertAsync(fileName, fileSize, fileType) {
        return this.#appDAO.runAsync(`INSERT INTO tblUpload(fileName, fileSize, fileType) VALUES(?, ?, ?)`, [fileName, fileSize, fileType]);
    }

    deleteAsync(uploadId) {
        return this.#appDAO.runAsync("DELETE FROM tblUpload WHERE id = ?", [uploadId]);
    }

    getByIdAsync(id) {
        return this.#appDAO.getAsync("SELECT * FROM tblUpload WHERE id=?", [id]);
    }

    async findByNameAsync(fileName) {
        return await this.#appDAO.getAllAsync("SELECT * FROM tblUpload WHERE fileName LIKE ?", [fileName]);

    }

    getAllAsync() {
        return this.#appDAO.getAllAsync("SELECT * FROM tblUpload");
    }
}

module.exports = UploadRepository