import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  name: string;
  description?: string;
  date: Date;
  status: 'ongoing' | 'completed';
  userId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

const commonFields = ['name', 'description', 'date', 'status'];
const TaskProperties = {
  listProperties: commonFields,
  filterProperties: commonFields,
  showProperties: [...commonFields, 'userId'],
  editProperties: [...commonFields, 'userId'],
};

export { Task as default, TaskProperties };
