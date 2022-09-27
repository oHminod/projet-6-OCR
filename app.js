const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");

const routes = require("./routes");

const app = express();
app.use(express.json());

/**
 * Connexion à la base de données.
 */
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

/**
 * Mise en place des Headers
 */
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

/**
 * Emplacement du dossier images.
 */
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(helmet());
app.use("/", routes);

module.exports = app;
