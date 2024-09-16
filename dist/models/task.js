import mongoose, { Schema } from 'mongoose';
const TaskSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
const Task = mongoose.model('Task', TaskSchema);
const commonFields = ['name', 'description', 'date', 'status'];
const TaskProperties = {
    listProperties: commonFields,
    filterProperties: commonFields,
    showProperties: [...commonFields, 'userId'],
    editProperties: [...commonFields, 'userId'],
};
export { Task as default, TaskProperties };
