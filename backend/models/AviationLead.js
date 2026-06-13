import mongoose from 'mongoose';

const AviationLeadSchema = new mongoose.Schema({
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
    state: {
        type: String
    },
    city: {
        type: String
    },
    program: {
        type: String
    },
    course: {
        type: String
    },
    marketingConsent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('AviationLead', AviationLeadSchema);
