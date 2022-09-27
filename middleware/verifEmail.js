/**
 * * verifEmail :
 * Middleware pour vérifier la validité de l'email.
 * @param {string} string
 */
module.exports = (req, res, next) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!re.test(req.body.email)) {
        return res.status(400).json({ message: "Bad email string" });
    }
    next();
};
