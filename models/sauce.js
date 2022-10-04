const mongoose = require("mongoose");

const sauceModel = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: Array, default: [] },
    usersDisliked: { type: Array, default: [] },
});

/**
 * * sauceModel :
 * Modèle de données d'une sauce.
 */
module.exports = mongoose.model("SauceModel", sauceModel);
