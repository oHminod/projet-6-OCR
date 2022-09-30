const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptojs = require("crypto-js");
const ApiError = require("../../error/ApiError");
require("dotenv").config();

/**
 * * userLogin :
 * Fonction pour connecter un utilisateur au site.
 * Une fois connecté, le browser de l'utilisateur
 * possède un token contenant son ID de manière
 * chiffrée.
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
    const emailChiffre = cryptojs
        .SHA256(req.body.email, process.env.TOKEN)
        .toString();
    const emailChiffre3 = cryptojs
        .SHA3(req.body.email, process.env.TOKEN)
        .toString();
    UserModel.findOne({
        $or: [{ email: emailChiffre }, { email: emailChiffre3 }],
    })
        .then((user) => {
            if (!user) {
                return next(ApiError.unauthorized("Utilisateur non trouvé!"));
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return next(
                                ApiError.unauthorized(
                                    "Mot de passe incorrect !"
                                )
                            );
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.TOKEN,
                                    {
                                        expiresIn: "24h",
                                    }
                                ),
                            });
                        }
                    })
                    .catch((error) => {
                        return next(ApiError.internal(error));
                    });
            }
        })
        .catch((error) => {
            return next(ApiError.internal(error));
        });
};
