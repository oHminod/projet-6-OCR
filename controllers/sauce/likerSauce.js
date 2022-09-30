const ApiError = require("../../error/ApiError");
const SauceModel = require("../../models/sauce");
const updateSauce = require("../helpers/updateSauce");

/**
 * * likerSauce :
 * Fonction pour mettre à jour (update) les like d'une sauce.
 * @param {json} req The req object represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers,
 * and so on.
 * @param {json} res The res object represents the HTTP response that an
 * Express app sends when it gets an HTTP request.
 * @param {function} next The next function is a function in the Express
 * router which, when invoked, executes the middleware succeeding the current
 * middleware.
 */
module.exports = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
        .then((sauce) => {
            let userLike = sauce.usersLiked.indexOf(req.body.userId);
            let userDislike = sauce.usersDisliked.indexOf(req.body.userId);

            if (req.body.like == "1" && userLike == -1 && userDislike == -1) {
                sauce.usersLiked.push(req.body.userId);
                sauce.likes = sauce.usersLiked.length;
                updateSauce(req, res, sauce, "Sauce likée !");
            } else if (req.body.like == "0") {
                if (userLike == -1 && userDislike != -1) {
                    sauce.usersDisliked.splice(userDislike, 1);
                    sauce.dislikes = sauce.usersDisliked.length;
                    updateSauce(req, res, sauce, "Pas d'avis sur la sauce !");
                } else if (userLike != -1 && userDislike == -1) {
                    sauce.usersLiked.splice(userLike, 1);
                    sauce.likes = sauce.usersLiked.length;
                    updateSauce(req, res, sauce, "Pas d'avis sur la sauce !");
                }
            } else if (
                req.body.like == "-1" &&
                userLike == -1 &&
                userDislike == -1
            ) {
                sauce.usersDisliked.push(req.body.userId);
                sauce.dislikes = sauce.usersDisliked.length;
                updateSauce(req, res, sauce, "Sauce dislikée !");
            } else {
                return next(ApiError.badRequest("Bad request"));
            }
        })
        .catch((error) => {
            return next(ApiError.internal(error));
        });
};
