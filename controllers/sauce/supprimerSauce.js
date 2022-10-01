const SauceModel = require("../../models/sauce");
const fs = require("fs");
const ApiError = require("../../error/ApiError");

/**
 * * supprimerSauce :
 * Fonction pour supprimer (delete) une sauce de la BDD,
 * supprime également son image dans le file system.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an
 * Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express
 * router which, when invoked, executes the middleware succeeding the
 * current middleware.
 */
module.exports = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.session.userId) {
                return next(ApiError.unauthorized("Accès refusé"));
            } else {
                const filename = sauce.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    SauceModel.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({
                                message: "Sauce supprimée !",
                            });
                        })
                        .catch((error) => {
                            return next(ApiError.internal(error.message));
                        });
                });
            }
        })
        .catch((error) => {
            return next(ApiError.notFound(error.message));
        });
};
