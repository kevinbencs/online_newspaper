import mongoose from "mongoose";

const { Schema } = mongoose

const CareerSchema = new Schema({
    title:{
        type: String,
        required: 'Title is required'
    },
    text: {
        type: String,
        required: 'Text is required'
    }

})


export default mongoose.models.Career || mongoose.model("Career", CareerSchema);