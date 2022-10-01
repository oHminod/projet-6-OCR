const express = require("express");
/**
 * Routes vers les contrôleurs pour les sauces.
 */
const sauce = express.Router();
const sessionOk = require("../middleware/session");
const multer = require("../middleware/multer-config");
const { xss } = require("express-xss-sanitizer");
// const options = {
//     allowedKeys: ["description"],
// };

const getAllSauces = require("../controllers/sauce/getAllSauces");
const getThisSauce = require("../controllers/sauce/getThisSauce");
const ajouterSauce = require("../controllers/sauce/ajouterSauce");
const modifierSauce = require("../controllers/sauce/modifierSauce");
const likerSauce = require("../controllers/sauce/likerSauce");
const supprimerSauce = require("../controllers/sauce/supprimerSauce");

/**
 * * Routes sauces :
 */
sauce.get("/", sessionOk, getAllSauces);
sauce.get("/:id", sessionOk, getThisSauce);
sauce.post("/", sessionOk, xss(), multer, ajouterSauce);
sauce.put("/:id", sessionOk, xss(), multer, modifierSauce);
sauce.post("/:id/like", sessionOk, likerSauce);
sauce.delete("/:id", sessionOk, supprimerSauce);

module.exports = sauce;
