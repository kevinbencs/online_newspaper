import mongoose from "mongoose";

const { Schema } = mongoose;

const VideoSchema = new Schema({
    name: {
        type: String,
        require: "Name is require",
    },
    url: {
        type: String,
        required: "Url is required",
    },
    detail: {
        type: String,
        require: "Role is required",
    },

}, {timestamps: true})

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);