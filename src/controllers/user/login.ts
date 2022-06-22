import {getErrorMessage} from "../../utils";
import {Request, Response} from "express";

const {User} = require('../../models/index');
const {TOKEN_EXPIRY} = require('../../config/configs');
const {checkPass, createJWt} = require('../../utils/index');

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if (!user) {
            res.status(404).json({errors: [{message: "Wrong email"}]});
            return;
        }

        const confirmPass = checkPass(password, user.password); // true if matched passwords

        if (!confirmPass) {
            res.status(403).json({errors: [{message: "Wrong password"}]});
            return;
        }

        const token = await createJWt(user._id, email, TOKEN_EXPIRY, res);
        res.status(200).json({
            user,
            token
        })
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message: message}]});
    }
}

export default login;