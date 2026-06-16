import Joi from 'joi';

// Safe character allow-lists
const namePattern = /^[a-zA-Z\s,'.-]+$/;
const phonePattern = /^[0-9+\-()\s]*$/;
const textPattern = /^[a-zA-Z0-9\s,'.-]*$/;
const usernamePattern = /^[a-zA-Z0-9_-]+$/;

export const schemas = {
    admission: Joi.object({
        name: Joi.string().trim().pattern(namePattern).min(2).max(100).required()
            .messages({ 'string.pattern.base': 'Name contains invalid characters' }),
        email: Joi.string().trim().email().max(150).required(),
        phone: Joi.string().trim().pattern(phonePattern).min(10).max(20).optional().allow(''),
        mobile: Joi.string().trim().pattern(phonePattern).min(10).max(20).optional().allow(''),
        state: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        city: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        centre: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        center: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        program: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        course: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        referred: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        marketingConsent: Joi.boolean().optional(),
        readyToStart: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        industry: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        qualification: Joi.string().trim().pattern(textPattern).max(100).optional().allow('')
    }).unknown(true),

    contact: Joi.object({
        name: Joi.string().trim().pattern(namePattern).min(2).max(100).required()
            .messages({ 'string.pattern.base': 'Name contains invalid characters' }),
        email: Joi.string().trim().email().max(150).required(),
        phone: Joi.string().trim().pattern(phonePattern).min(10).max(20).required()
            .messages({ 'string.pattern.base': 'Phone contains invalid characters' }),
        subject: Joi.string().trim().pattern(textPattern).max(200).optional().allow(''),
        message: Joi.string().trim().max(5000).required()
    }).unknown(true),

    stepLead: Joi.object({
        name: Joi.string().trim().pattern(namePattern).min(2).max(100).required()
            .messages({ 'string.pattern.base': 'Name contains invalid characters' }),
        email: Joi.string().trim().email().max(150).required(),
        mobile: Joi.string().trim().pattern(phonePattern).min(10).max(20).optional()
            .messages({ 'string.pattern.base': 'Mobile contains invalid characters' }),
        phone: Joi.string().trim().pattern(phonePattern).min(10).max(20).optional()
            .messages({ 'string.pattern.base': 'Phone contains invalid characters' }),
        city: Joi.string().trim().pattern(textPattern).max(100).required(),
        readyToStart: Joi.string().trim().pattern(textPattern).max(100).required(),
        inquiryType: Joi.string().trim().pattern(textPattern).max(100).required(),
        marketingConsent: Joi.boolean().optional()
    }).unknown(true),

    paris: Joi.object({
        name: Joi.string().trim().pattern(namePattern).min(2).max(100).required()
            .messages({ 'string.pattern.base': 'Name contains invalid characters' }),
        email: Joi.string().trim().email().max(150).required(),
        phone: Joi.string().trim().pattern(phonePattern).min(10).max(20).required()
            .messages({ 'string.pattern.base': 'Phone contains invalid characters' })
    }).unknown(true),

    partner: Joi.object({
        name: Joi.string().trim().pattern(namePattern).min(2).max(100).required()
            .messages({ 'string.pattern.base': 'Name contains invalid characters' }),
        email: Joi.string().trim().email().max(150).required(),
        mobile: Joi.string().trim().pattern(phonePattern).min(10).max(20).optional().allow(''),
        phone: Joi.string().trim().pattern(phonePattern).min(10).max(20).optional().allow(''),
        contact: Joi.string().trim().pattern(phonePattern).min(10).max(20).optional().allow(''),
        investment: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        preference: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        state: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        city: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        referred: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        company: Joi.string().trim().pattern(textPattern).max(150).optional().allow(''),
        industry: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        potential: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        message: Joi.string().trim().max(5000).optional().allow(''),
        address: Joi.string().trim().max(500).optional().allow('')
    }).unknown(true),

    register: Joi.object({
        username: Joi.string().trim().pattern(usernamePattern).min(3).max(50).required()
            .messages({ 'string.pattern.base': 'Username must contain only letters, numbers, underscores, or hyphens' }),
        email: Joi.string().trim().email().max(150).required(),
        password: Joi.string().min(6).max(128).required(),
        firstName: Joi.string().trim().pattern(namePattern).min(2).max(50).required(),
        lastName: Joi.string().trim().pattern(namePattern).min(2).max(50).required(),
        phone: Joi.string().trim().pattern(phonePattern).min(10).max(20).required(),
        dob: Joi.string().trim().max(50).optional().allow(''),
        country: Joi.string().trim().pattern(namePattern).max(100).optional().allow(''),
        street1: Joi.string().trim().max(150).optional().allow(''),
        street2: Joi.string().trim().max(150).optional().allow(''),
        city: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        state: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        pinCode: Joi.string().trim().alphanum().max(15).optional().allow(''),
        centre: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        level: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        stream: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        scholarship: Joi.string().trim().pattern(textPattern).max(100).optional().allow(''),
        comments: Joi.string().trim().max(1000).optional().allow(''),
        communications: Joi.object().optional()
    }).unknown(true),

    login: Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().max(128).required()
    }).unknown(true),

    resetPassword: Joi.object({
        email: Joi.string().trim().email().required(),
        code: Joi.string().trim().required(),
        newPassword: Joi.string().min(6).max(128).required()
    }).unknown(true)
};

/**
 * Validates request body using standard Joi schema
 * Sends 400 response and returns false on failure, returns true on success
 */
export const validateRequest = (schema, req, res) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: `Validation Error: ${error.details[0].message}`
        });
        return false;
    }
    req.body = value;
    return true;
};
