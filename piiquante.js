const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const errorHandler = require("./error/error-handler");

const routes = require("./routes");

/**
 * Piiquante : application web dans laquelle les
 * utilisateurs peuvent ajouter leurs sauces préférées et
 * liker ou disliker les sauces ajoutées par les autres.
 */
const piiquante = express();
piiquante.use(express.json());

/**
 * Connexion à la base de données.
 */
const mongoose = require("mongoose");
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@${process.env.DB_URL}/piiquante?retryWrites=true&w=majority`,
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
piiquante.use((req, res, next) => {
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
piiquante.use("/images", express.static(path.join(__dirname, "images")));

piiquante.use(helmet());
piiquante.use("/", routes);

piiquante.use(errorHandler);
module.exports = piiquante;
