import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
});
const User = mongoose.model('User', UserSchema);
const commonFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'isBlocked'];
const UserProperties = {
    listProperties: commonFields,
    showProperties: commonFields,
    editProperties: [...commonFields, 'password'],
    filterProperties: ['firstName', 'lastName', 'email', 'isBlocked'],
};
export { User as default, UserProperties };
