const express = require("express");
/**
 * Routes vers les contrôleurs pour les utilisateurs et pour les sauces.
 */
const router = express.Router();
const sessionOk = require("./middleware/session");
const multer = require("./middleware/multer-config");
const verifEmail = require("./middleware/verifEmail");
const { xss } = require("express-xss-sanitizer");
// const options = {
//     allowedKeys: ["description"],
// };

const userSignUp = require("./controllers/user/userSignUp");
const userLogin = require("./controllers/user/userLogin");

const getAllSauces = require("./controllers/sauce/getAllSauces");
const getThisSauce = require("./controllers/sauce/getThisSauce");
const ajouterSauce = require("./controllers/sauce/ajouterSauce");
const modifierSauce = require("./controllers/sauce/modifierSauce");
const likerSauce = require("./controllers/sauce/likerSauce");
const supprimerSauce = require("./controllers/sauce/supprimerSauce");

/**
 * * Routes utilisateurs :
 */
router.post("/api/auth/signup", verifEmail, userSignUp);
router.post("/api/auth/login", userLogin);

/**
 * * Routes sauces :
 */
router.get("/api/sauces", sessionOk, getAllSauces);
router.get("/api/sauces/:id", sessionOk, getThisSauce);
router.post("/api/sauces", sessionOk, xss(), multer, ajouterSauce);
router.put("/api/sauces/:id", sessionOk, xss(), multer, modifierSauce);
router.post("/api/sauces/:id/like", sessionOk, likerSauce);
router.delete("/api/sauces/:id", sessionOk, supprimerSauce);

module.exports = router;
