const ApiError = require("./ApiError");

/**
 * * errorHandler :
 * Fontion de gestion des erreurs de l'API.
 * @param {json} err L'objet err représente l'erreur interceptée.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an
 * Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express
 * router which, when invoked, executes the middleware succeeding the
 * current middleware.
 * @returns
 */
function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json("Erreur interne du serveur");
}

module.exports = errorHandler;