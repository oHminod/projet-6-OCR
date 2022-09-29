const express = require("express");
const router = express.Router();
const sessionOk = require("./middleware/session");
const multer = require("./middleware/multer-config");
const verifEmail = require("./middleware/verifEmail");
const { xss } = require("express-xss-sanitizer");
// const options = {
//     allowedKeys: ["description"],
// };

const userSignUp = require("./controllers/userSignUp");
const userLogin = require("./controllers/userLogin");

const getAllSauces = require("./controllers/getAllSauces");
const getThisSauce = require("./controllers/getThisSauce");
const ajouterSauce = require("./controllers/ajouterSauce");
const modifierSauce = require("./controllers/modifierSauce");
const likerSauce = require("./controllers/likerSauce");
const supprimerSauce = require("./controllers/supprimerSauce");

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
