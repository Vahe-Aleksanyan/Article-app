import {User, verificationCode} from '../../models/index';
import {checkPass} from '../../utils/';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const verifyUser = async (req: Request, res: Response) => {
    try {
        const {code, email} = req.query;
        const foundVerificationCode = await verificationCode.findOne({email});

        if (!foundVerificationCode) {
            return res.status(404).json({errors: [{message: "Verification code not found"}]});
        }

        if (typeof code !== 'string') {
            throw new Error("code is not string ");
        }

        const codeIsCorrect = await checkPass(code, foundVerificationCode.code);

        if (!codeIsCorrect) {
            return res.status(401).json({errors: [{message: "failed to verify account. Please try again"}]});
        }

        // deleting the code from db after verification done
        await verificationCode.findOneAndDelete({email});

        await User.findOneAndUpdate({email}, {$set: {isVerified: true}});

        res.status(200).json({message: "Successfully verified"});
    } catch (err) {
        console.log(err);
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message: message}]})
    }
}
export default verifyUser;