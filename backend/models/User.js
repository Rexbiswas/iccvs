import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String },
    country: { type: String },

    address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        pinCode: String
    },

    academic: {
        centre: String,
        level: String,
        stream: String,
        scholarship: String
    },

    comments: String,

    communications: {
        email: { type: Boolean, default: false },
        post: { type: Boolean, default: false },
        sms: { type: Boolean, default: false }
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
