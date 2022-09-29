const SauceModel = require("../models/sauce");
const updateLike = require("./helpers/updateLike");
const fs = require("fs");

/**
 * * modifierSauce :
 * Fonction pour modifier (update) une sauce,
 * en prenant garde de supprimer l'ancienne
 * image si une nouvelle est importée.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an Express
 * app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express router
 * which, when invoked, executes the middleware succeeding the current middleware.
 */
module.exports = (req, res, next) => {
    const image = req.file;
    let sauce = new SauceModel();
    if (image) {
        const sauceRequete = JSON.parse(req.body.sauce);
        SauceModel.findOne({ _id: req.params.id })
            .then((sauceDb) => {
                if (
                    sauceDb.userId != req.session.userId ||
                    sauceRequete.userId != req.session.userId
                ) {
                    return res.status(401).json({ message: "Accès refusé 1!" });
                }
                const filename = sauceDb.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    sauce = {
                        ...sauceRequete,
                        imageUrl: `${req.protocol}://${req.get(
                            "host"
                        )}/images/${req.file.filename}`,
                    };
                    updateLike(req, res, sauce, "Sauce modifiée !");
                });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    } else {
        SauceModel.findOne({ _id: req.params.id })
            .then((sauceDb) => {
                if (
                    sauceDb.userId != req.session.userId ||
                    req.body.userId != req.session.userId
                ) {
                    return res.status(401).json({ message: "Accès refusé !" });
                }
                sauce = {
                    ...req.body,
                };
                updateLike(req, res, sauce, "Sauce modifiée !");
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }
};
