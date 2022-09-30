const SauceModel = require("../../models/sauce");
const updateSauce = require("../helpers/updateSauce");
const fs = require("fs");
const ApiError = require("../../error/ApiError");

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
                    return next(ApiError.unauthorized("Accès refusé"));
                }
                const filename = sauceDb.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    sauce = {
                        ...sauceRequete,
                        imageUrl: `${req.protocol}://${req.get(
                            "host"
                        )}/images/${req.file.filename}`,
                    };
                    updateSauce(req, res, sauce, "Sauce modifiée !");
                });
            })
            .catch((error) => {
                return next(ApiError.internal(error.message));
            });
    } else {
        SauceModel.findOne({ _id: req.params.id })
            .then((sauceDb) => {
                if (
                    sauceDb.userId != req.session.userId ||
                    req.body.userId != req.session.userId
                ) {
                    return next(ApiError.unauthorized("Accès refusé"));
                }
                sauce = {
                    ...req.body,
                };
                updateSauce(req, res, sauce, "Sauce modifiée !");
            })
            .catch((error) => {
                return next(ApiError.internal(error.message));
            });
    }
};
