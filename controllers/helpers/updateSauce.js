const SauceModel = require("../../models/sauce");

/**
 * * updateSauce :
 * Fonction pour mettre à jour (update) une sauce.
 * @param {json} req The req object represents the HTTP request
 * and has properties for the request query string, parameters,
 * body, HTTP headers, and so on.
 * @param {json} res The res object represents the HTTP response
 * that an Express app sends when it gets an HTTP request.
 * @param {json} sauce Les données fournies par cet objet
 * écraseront celles de la BDD.
 * @param {string} message Message de réussite.
 */
module.exports = (req, res, sauce, message) => {
    SauceModel.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: message }))
        .catch((error) => res.status(400).json({ error }));
};
