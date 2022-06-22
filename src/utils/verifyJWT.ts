import jwt, {JwtPayload} from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config/configs';
import {Response} from "express";
import {getErrorMessage} from "./index";

interface IVerifyJWT extends JwtPayload {
    email?: string
}

const verifyJWT = (token: string, res: Response): IVerifyJWT => {
    try {
        const decodedToken: string | JwtPayload = jwt.verify(token, TOKEN_SECRET);

        if (!decodedToken) {
            res.status(401).json({errors: [{message: "Not decoded"}]});
            throw new Error("")
        }
        return decodedToken as IVerifyJWT
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message}]});
        throw new Error("");
    }
}

export default verifyJWT;