const express = require("express");
/**
 * Routes vers les contrôleurs pour les utilisateurs.
 */
const user = express.Router();
const verifEmail = require("../middleware/verifEmail");

const userSignUp = require("../controllers/user/userSignUp");
const userLogin = require("../controllers/user/userLogin");

/**
 * * Routes utilisateurs :
 */
user.post("/signup", verifEmail, userSignUp);
user.post("/login", userLogin);

module.exports = user;
