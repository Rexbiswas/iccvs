import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'general'
    },
    course: {
        type: String
    },
    program: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    centre: {
        type: String
    },
    readyToStart: {
        type: String
    },
    inquiryType: {
        type: String
    },
    investment: {
        type: String
    },
    preference: {
        type: String
    },
    company: {
        type: String
    },
    industry: {
        type: String
    },
    qualification: {
        type: String
    },
    message: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    additionalInfo: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

export default mongoose.model('Enquiry', EnquirySchema);
