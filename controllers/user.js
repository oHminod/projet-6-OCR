const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptojs = require("crypto-js");
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
exports.userSignUp = async (req, res, next) => {
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
        .catch((error) => res.status(400).json({ error }));
};

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
exports.userLogIn = (req, res, next) => {
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
                return res
                    .status(401)
                    .json({ message: "Utilisateur non trouvé!" });
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res
                                .status(401)
                                .json({ message: "Mot de passe incorrect !" });
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
                    .catch((error) => res.status(501).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
