import {User} from '../../models/index';
import {hashPass, sendVerificationEmail} from '../../utils/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        // getting user data
        const {name, email, password} = req.body;

        // checking if such user already exists
        const user = await User.findOne({email});

        if (user) {
            res.status(422).json({
                errors: [{message: "user with such email already exists"}]
            })
            return;
        }

        const hashedPassword = await hashPass(password);

        const newUser = await new User({ // need await here
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        await sendVerificationEmail(newUser, req)

        res.status(200).json(newUser);
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(500).json({errors: [{message}]});
    }
}
export default signup;