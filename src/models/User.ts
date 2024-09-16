import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>('User', UserSchema);

const commonFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'isBlocked'];
const UserProperties = {
  listProperties: commonFields,
  showProperties: commonFields,
  editProperties: [...commonFields, 'password'],
  filterProperties: ['firstName', 'lastName', 'email', 'isBlocked'],
};

export { User as default, UserProperties };
