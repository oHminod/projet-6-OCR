const ApiError = require("../../error/ApiError");
const SauceModel = require("../../models/sauce");

/**
 * * getAllSauces :
 * Fonction récupérant (read) toutes les sauces dans la BDD.
 * @param {json} req The req object represents the HTTP
 * request and has properties for the request query string,
 * parameters, body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP
 * response that an Express app sends when it gets an
 * HTTP request.
 * @param {function} next The next function is a function
 * in the Express router which, when invoked, executes the
 * middleware succeeding the current middleware.
 */
module.exports = (req, res, next) => {
    SauceModel.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => {
            return next(ApiError.badRequest(error.message));
        });
};
