import mongoose from "mongoose";

const { Schema } = mongoose;

const AdminSchema = new Schema({
    email: {
        type: String,
        require: "Email is require",
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        require: "Name is require",
        max: 25,
    },
    password: {
        type: String,
        required: "Your password is required",
    },
    role: {
        type: String,
        require: "Role is required",
    },

})

export default mongoose.models.Admin || mongoose.model("admin", AdminSchema);