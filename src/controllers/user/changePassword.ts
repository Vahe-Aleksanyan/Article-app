// changing password. user provides id via req.params, old password and new password via req.body, and user object in req
// user knows its old password
import {User} from '../../models/index';
import {checkPass, getErrorMessage, hashPass} from '../../utils/index';
import {Request, Response} from "express";

const changePassword = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params;
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById({_id});

        if (String(user._id) !== String(_id)) {
            return res.status(422).json({errors: [{message: "wrong id for user"}]});
        }

        const isOldPassCorrect = await checkPass(oldPassword, user.password);

        if (!isOldPassCorrect) {
            return res.status(422).json({errors: [{message: "old password is incorrect"}]});
        }

        const hashedNewPass = await hashPass(newPassword);

        const updatedUser = await User.findOneAndUpdate({email: user.email}, {$set: {password: hashedNewPass}});

        return res.status(200).json({updatedUser, message: "Updated Password successfully"});
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message: message}]});
    }
}

export default changePassword;