import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config/configs';
import {Response} from "express";
import {getErrorMessage} from "./index";

const createJWT = (userId: string, email: string, duration: string, res: Response): string => { // check
    try {
        const base = {
            userId: userId.toString(),
            email: email
        }

        return jwt.sign(base, TOKEN_SECRET, {
            expiresIn: duration
        })
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(500).json({errors: [{message}]});
        return "null";
    }
}

export default createJWT;