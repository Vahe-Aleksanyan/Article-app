import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";


const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const user = req.user;

        if (String(user?._id) !== id) {
            res.status(422).json({errors: [{message: "UserT id or token is invalid"}]});
            return;
        }

        // const updatedUser = await User.findOneAndUpdate(
        //     // {email: user.email},
        //     {$set: {name}},
        //     {returnOriginal: false}
        // );

        // res.status(200).json(updatedUser);
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message}]});
    }
};

export default updateUser;
