import { NextFunction, Request, Response } from 'express';

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
