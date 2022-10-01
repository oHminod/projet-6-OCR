const express = require("express");
const sessionOk = require("./middleware/session");
/**
 * Routes générales.
 * Pour les routes vers les contrôleurs,
 * regarder dans le dossier /routes.
 */
const router = express.Router();
const user = require("./routes/user");
const sauce = require("./routes/sauce");

router.use("/api/auth/", user);
router.use("/api/sauces/", sessionOk, sauce);

module.exports = router;
