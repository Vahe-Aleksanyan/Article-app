import {User} from '../../models/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const searchUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const perPage = 5;

        const {name, currentPage} = req.params;

        if (typeof currentPage != 'number') {
            throw new Error("Current page is not number");
        }
        const currPage = currentPage || 1;


        const users = await User
            .find({name: {$regex: name, $options: 'i'}})
            .skip((currPage - 1) * perPage)
            .limit(perPage);

        res.status(200).json({users: users});
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message}]});
    }
}
export default searchUser;
