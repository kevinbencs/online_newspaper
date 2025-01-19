const mongoose = require("mongoose");

const { Schema } = mongoose;

const TokenSchema = new Schema({
    token:{
        type: String,
        require: true,
        ref: "User",
    }
},{timestamps: true});

module.exports = mongoose.models.Token || mongoose.model("Token", TokenSchema);