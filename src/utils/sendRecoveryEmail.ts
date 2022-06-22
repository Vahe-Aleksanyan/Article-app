// code responsible for sending email and generating, storing special code in db
import {verificationCode} from '../models/index';
import {getErrorMessage, hashPass, mailTransporter} from './index';
import {CLIENT_URL, SENDER_EMAIL} from '../config/configs';
import {Response} from "express";
import {UserT} from "../Types";

const {nanoid} = require('nanoid');

const sendRecoveryMail = async (user: UserT, res: Response): Promise<void> => {
    try {
        const {email} = user;

        // first check if verification code exists in db
        const existingToken = await verificationCode.findOne({email});

        if (existingToken) {
            await verificationCode.findOneAndDelete({email});
        }
        const code = nanoid();

        const hashedCode = await hashPass(code);

        const newCode = await new verificationCode({email, code: hashedCode});

        await newCode.save();

        const link = `https://${CLIENT_URL}/reset-password/${email}/${code}`;

        const mailSubject = 'Reset Password';

        const mailHTML = `
        <h1> Reset Password </h1>
        <p> Click <a href="${link}"> here </a> to reset your password.</p>
    `;
        const mailOptions = {
            from: SENDER_EMAIL,
            to: email,
            subject: mailSubject,
            html: mailHTML
        }

        await mailTransporter.sendMail(mailOptions);
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message: message}]});
    }
}
export default sendRecoveryMail;