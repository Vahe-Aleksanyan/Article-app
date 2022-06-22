import {validationResult} from 'express-validator';
import {NextFunction, Request, Response} from "express";

const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = errors
        .array()
        .map((err) => ({[err.param]: err.msg}));

    res.status(422).json({errors: extractedErrors});

}
export default validate;