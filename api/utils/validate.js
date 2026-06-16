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
