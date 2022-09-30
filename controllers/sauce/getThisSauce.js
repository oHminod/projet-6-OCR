const ApiError = require("../../error/ApiError");
const SauceModel = require("../../models/sauce");

/**
 * * getThisSauce :
 * Fonction récupérant (read) une sauce particulière
 * dans la BDD.
 * @param {json} req The req object represents the HTTP
 * request and has properties for the request query string,
 * parameters, body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP
 * response that an Express app sends when it gets an
 * HTTP request.
 * @param {function} next The next function is a function
 * in the Express router which, when invoked, executes
 * the middleware succeeding the current middleware.
 */
module.exports = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => {
            return next(ApiError.notFound(error));
        });
};
