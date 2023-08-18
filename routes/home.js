const homeRoutes = require("express").Router();
homeRoutes.get("/", (req, resp) => {
    resp.sendFile("index.html");
});
module.exports = homeRoutes;