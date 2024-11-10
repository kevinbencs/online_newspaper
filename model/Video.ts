import mongoose from "mongoose";

const { Schema } = mongoose;

const VideoSchema = new Schema({
    url: {
        type: String,
        required: "Url is required",
    },
    title: {
        type: String,
        require: "Title is required",
    },

}, {timestamps: true})

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);