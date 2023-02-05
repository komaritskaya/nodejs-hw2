import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const userSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('(?=.*?[0-9])(?=.*?[A-Za-z]).+')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
});

function errorResponse(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        let { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};

export function validateSchema(schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if(error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    }
}
