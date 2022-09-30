const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const ApiError = require("../../error/ApiError");
require("dotenv").config();

/**
 * * userSignup :
 * Fonction pour ajouter un nouvel utilisateur à la BDD.
 * @param {json} req The req object represents the HTTP request and
 * has properties for the request query string, parameters, body,
 * HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the
 * Express router which, when invoked, executes the middleware
 * succeeding the current middleware.
 */
module.exports = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    req.body.email = cryptojs
        .SHA3(req.body.email, process.env.TOKEN)
        .toString();
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = new UserModel({
        ...req.body,
    });
    user.save()
        .then(() =>
            res.status(201).json({ message: "Utilisateur enregistré !" })
        )
        .catch((error) => {
            return next(ApiError.badRequest(error.message));
        });
};
