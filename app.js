const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");

const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@${process.env.DB_URL}/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", routes);

module.exports = app;
