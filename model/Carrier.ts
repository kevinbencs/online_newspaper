import mongoose from "mongoose";

const { Schema } = mongoose

const CarrierSchema = new Schema({
    title:{
        type: String,
        required: 'Title is required'
    },
    text: {
        type: String,
        required: 'Text is required'
    }

})


export default mongoose.models.Carrier || mongoose.model("Carrier", CarrierSchema);