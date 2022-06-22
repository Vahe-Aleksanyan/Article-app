// sending the recovery mail, get user email via req.body
import {User} from '../../models';
import {sendRecoveryEmail} from '../../utils/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const sendRecovery = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json({errors: [{message: "No such user with given email address"}]});
            return;
        }
        console.log(user);
        if (!user.isVerified) {
            res.status(401).json({errors: [{message: "UserT is not Verified"}]});
            return;
        }

        await sendRecoveryEmail(user, res);

        res.status(200).json({message: "successfully sent email"});
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(500).json({errors: [{message: message}]});
    }
}

export default sendRecovery;