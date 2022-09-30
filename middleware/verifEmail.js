const ApiError = require("../error/ApiError");

/**
 * * verifEmail :
 * Middleware pour vérifier la validité de l'email.
 * @param {string} string
 */
module.exports = (req, res, next) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!re.test(req.body.email)) {
        return next(ApiError.badRequest("Bad email string"));
    }
    next();
};
