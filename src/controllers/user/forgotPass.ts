// when user forgot password and sets new one via email verification,
// we are getting user email and special code generated when clicked email lnk, and new password
import {User, verificationCode} from '../../models/index';
import {Request, Response} from "express";
import {checkPass, getErrorMessage, hashPass} from '../../utils';


const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, code} = req.query;
        const {newPassword} = req.body;

        if (typeof code !== "string") {
            throw new Error("Query param 'url' has to be of type string");
        }

        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({errors: [{message: "No such user found"}]});
            return;
        }

        const verifCode = await verificationCode.findOne({email});
        if (!verifCode) {
            res.status(401).json({errors: [{message: "Failed to verify user"}]});
            return;
        }


        const codeIsaMatching = checkPass(code, verifCode.code);

        if (!codeIsaMatching) {
            res.status(401).json({errors: [{message: "Access denied: cannot reset password"}]});
            return;
        }
        // delete code after verifying
        await verificationCode.findOneAndDelete({email});

        const hashedPass = await hashPass(newPassword);

        const updateUser = User.findOneAndUpdate({email: user.email}, {set: {password: hashedPass}});

        res.status(200).json({message: "Password reset successfully"});
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(200).json({errors: [{message: message}]});
    }
}

export default resetPassword;