const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware de validation de session (Auth)
 * ajoute l'id de l'utilisateur à la requête
 * à partir du token créé à la connexion
 * de l'utilisateur.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        const userId = decodedToken.userId;
        req.session = {
            userId: userId,
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
