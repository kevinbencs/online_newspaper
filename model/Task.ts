import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema({
    task: {
        type: String,
        require: 'Task is require'
    },
    name: {
        type: String
    }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);