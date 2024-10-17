import mongoose from "mongoose";

const { Schema } = mongoose;

const TokenSchema = new Schema({
    token:{
        type: String,
        require: true,
        ref: "User",
    }
},{timestamps: true});

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);