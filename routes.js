const express = require("express");
const router = express.Router();
const sessionOk = require("./middleware/session");
const multer = require("./middleware/multer-config");
const verifEmail = require("./middleware/verifEmail");

const user = require("./controllers/user");
const sauce = require("./controllers/sauce");

/**
 * * Routes utilisateurs :
 */
router.post("/api/auth/signup", verifEmail, user.userSignUp);
router.post("/api/auth/login", user.userLogIn);

/**
 * * Routes sauces :
 */
router.get("/api/sauces", sessionOk, sauce.getAllSauces);
router.get("/api/sauces/:id", sessionOk, sauce.getThisSauce);
router.post("/api/sauces", sessionOk, multer, sauce.ajouterSauce);
router.post("/api/sauces/:id/like", sessionOk, sauce.likerSauce);
router.put("/api/sauces/:id", sessionOk, multer, sauce.modifierSauce);
router.delete("/api/sauces/:id", sessionOk, sauce.supprimerSauce);

module.exports = router;
