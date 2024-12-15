import mongoose from "mongoose";

const { Schema } = mongoose;

const ImageSchema = new Schema({
    url: {
        type: String,
        required: "Url is required",
    },
    detail: {
        type: String,
        require: "Role is required",
    },

}, {timestamps: true})

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);