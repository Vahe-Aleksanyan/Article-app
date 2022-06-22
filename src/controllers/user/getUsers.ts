import {User} from '../../models/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();

        const response = users.map(user => ({
            name: user.name,
            email: user.email,
        }));
        res.status(200).json(response);
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message: message}]});
    }
};

export default getUsers;
