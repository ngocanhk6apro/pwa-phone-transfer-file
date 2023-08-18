const UploadRepository = require("../database/upload-repository");
const uploadRoutes = require("express").Router();
const uploadRepository = new UploadRepository();

uploadRepository.createTableAsync();
uploadRoutes.get("/", async (req, resp) => {
    const uploads = await uploadRepository.getAllAsync();
    resp.json(uploads);
});

uploadRoutes.get("/:uploadFileName", async (req, resp) => {
    const fileName = req.params.uploadFileName;
    const uploads = await uploadRepository.findByNameAsync(fileName)
    resp.json({
        fileName,
        searchResult: uploads
    });
});

uploadRoutes.post("/", async (req, resp) => {
    const {
        fileName,
        fileSize,
        fileType
    } = req.body;

    await uploadRepository.insertAsync(fileName, fileSize, fileType);
    resp.json({
        message: "Upload file"
    });
});

uploadRoutes.delete("/id/:uploadId", async (req, resp) => {
    const uploadId = req.params.uploadId;
    const result = await uploadRepository.deleteAsync(uploadId);
    resp.json({
        result
    });
});
module.exports = uploadRoutes;