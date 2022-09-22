const mongoose = require("mongoose");
const uniqueInDB = require("mongoose-unique-validator");

/**
 * Modèle de données d'un utilisateur.
 */
const userModel = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
userModel.plugin(uniqueInDB);

module.exports = mongoose.model("UserModel", userModel);
