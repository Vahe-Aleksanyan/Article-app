import {verificationCode} from '../models/index';
import {SENDER_EMAIL} from '../config/configs';
import {hashPass, mailTransporter} from './index';
import {Request} from "express";
import {UserT} from "../Types";

const sendVerificationEmail = async (user: UserT, req: Request): Promise<void> => {
    const {email} = user;

    // if already has code - delete it
    // const existingCode = await verificationCode.findOne({ email });
    // if (existingCode) {
    //     await verificationCode.findOneAndDelete({ email });
    // }

    // generate some hashed code and save in verifedcodes
    const code = String(Math.floor(Math.random() * 1000000));
    const hashedCode = await hashPass(code);

    await new verificationCode({
        email,
        code: hashedCode
    }).save();

    // send the email
    const mailSubject = "Verify account";
    const mailHTML = `
      <h1>Read - Verify your account</h1>
      <p>Your verification code is: <strong>${code}</strong></p>
    `;

    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: mailSubject,
        html: mailHTML
    }

    await mailTransporter.sendMail(mailOptions);
};

export default sendVerificationEmail;