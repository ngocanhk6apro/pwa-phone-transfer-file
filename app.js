const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

/*
*
*  Config middleware
*
* */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons/font/")));

/*
*
*  Config routes
*
* */
const homeRoutes = require("./routes/home");
app.use("/", homeRoutes);

const uploadRoutes = require("./routes/upload");
app.use("/api/upload", uploadRoutes);

/*
*
*
*  Hook into exit process to clean resources
*
* */
process.on("uncaughtException", () => {
    console.log("CLEAN RESOURCE....")
});

/*
*
*  Start server
*
* */
const PORT = process.env.PORT || 2023;
app.listen(PORT, (err) => {
    err ? console.log(err): console.log("Server started...");
});