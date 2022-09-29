const SauceModel = require("../models/sauce");

/**
 * * AjouterSauce :
 * Fonction pour créer (create) une sauce dans le BDD.
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
    const nouvelleSauce = JSON.parse(req.body.sauce);
    const sauce = new SauceModel({
        ...nouvelleSauce,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersdisLiked: [],
    });
    sauce
        .save()
        .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
        .catch((error) => res.status(402).json({ error }));
};
