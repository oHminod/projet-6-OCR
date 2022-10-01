const express = require("express");
/**
 * Routes vers les contrôleurs pour les sauces.
 */
const sauce = express.Router();
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
sauce.get("/", getAllSauces);
sauce.get("/:id", getThisSauce);
sauce.post("/", xss(), multer, ajouterSauce);
sauce.put("/:id", xss(), multer, modifierSauce);
sauce.post("/:id/like", likerSauce);
sauce.delete("/:id", supprimerSauce);

module.exports = sauce;
