const SauceModel = require("../models/sauce");
const fs = require("fs");

/**
 * * getAllSauces
 * Fonction récupérant (read) toutes les sauces dans la BDD.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllSauces = (req, res, next) => {
    SauceModel.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

/**
 * * getThisSauce
 * Fonction récupérant (read) une sauce particulière dans la BDD.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getThisSauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

/**
 * * AjouterSauce
 * Fonction pour créer (create) une sauce dans le BDD.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.ajouterSauce = (req, res, next) => {
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

/**
 * * modifierSauce
 * Fonction pour modifier (update) une sauce,
 * en prenant garde de supprimer l'ancienne
 * image si une nouvelle est importée.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.modifierSauce = (req, res, next) => {
    const image = req.file;
    let sauce = new SauceModel();
    if (image) {
        const sauceRequete = JSON.parse(req.body.sauce);
        if (sauceRequete.userId != req.session.userId) {
            return res.status(401).json({ message: "Accès refusé !" });
        }
        SauceModel.findOne({ _id: req.params.id })
            .then((sauceModifiee) => {
                const filename = sauceModifiee.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    sauce = {
                        ...sauceRequete,
                        imageUrl: `${req.protocol}://${req.get(
                            "host"
                        )}/images/${req.file.filename}`,
                    };
                    updateLike(res, req, sauce, "Sauce modifiée !");
                });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    } else {
        if (req.body.userId != req.session.userId) {
            return res.status(401).json({ message: "Accès refusé !" });
        }
        sauce = {
            ...req.body,
        };
        updateLike(res, req, sauce, "Sauce modifiée !");
    }
};

/**
 * * supprimerSauce
 * Fonction pour supprimer (delete) une sauce de la BDD,
 * supprime également son image dans le file system.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.supprimerSauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.session.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                const filename = sauce.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    SauceModel.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({
                                message: "Objet supprimé !",
                            });
                        })
                        .catch((error) => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

/**
 * * likerSauce
 * Fonction pour mettre à jour (update) les like d'une sauce.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.likerSauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
        .then((sauce) => {
            let userLike = sauce.usersLiked.indexOf(req.body.userId);
            let userDislike = sauce.usersDisliked.indexOf(req.body.userId);
            if (req.body.like == "1" && userLike == -1 && userDislike == -1) {
                sauce.usersLiked.push(req.body.userId);
                sauce.likes = sauce.usersLiked.length;
                updateLike(res, req, sauce, "Sauce likée !");
            } else if (req.body.like == "0") {
                if (userLike == -1 && userDislike != -1) {
                    sauce.usersDisliked.splice(userDislike, 1);
                    sauce.dislikes = sauce.usersDisliked.length;
                    updateLike(res, req, sauce, "Pas d'avis sur la sauce !");
                } else if (userLike != -1 && userDislike == -1) {
                    sauce.usersLiked.splice(userLike, 1);
                    sauce.likes = sauce.usersLiked.length;
                    updateLike(res, req, sauce, "Pas d'avis sur la sauce !");
                } else {
                    return res.status(400).json({ message: "Bad request" });
                }
            } else if (
                req.body.like == "-1" &&
                userLike == -1 &&
                userDislike == -1
            ) {
                sauce.usersDisliked.push(req.body.userId);
                sauce.dislikes = sauce.usersDisliked.length;
                updateLike(res, req, sauce, "Sauce dislikée !");
            } else {
                return res.status(400).json({ message: "Bad request" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

/**
 * * updateLike
 * Fonction pour mettre à jour (update) une sauce.
 * @param {*} res
 * @param {*} req
 * @param {json} sauce Les données fournies par cet objet écraseront celles de la BDD
 * @param {string} message Message de réussite
 */
function updateLike(res, req, sauce, message) {
    SauceModel.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: message }))
        .catch((error) => res.status(400).json({ error }));
}
