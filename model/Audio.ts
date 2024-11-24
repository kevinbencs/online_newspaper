import mongoose from "mongoose";

const { Schema } = mongoose;

const AudioSchema = new Schema({
    url: {
        type: String,
        required: "Url is required",
    },
    title: {
        type: String,
        require: "Title is required",
    },
    date: {
        type: String,
        require: "Date is required",
    },

}, {timestamps: true})

export default mongoose.models.Audio || mongoose.model("Audio", AudioSchema);