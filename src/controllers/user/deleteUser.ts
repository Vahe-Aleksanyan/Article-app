import {Article, Comment, User} from '../../models';
import {checkPass, getErrorMessage} from '../../utils';
import {Request, Response} from "express";

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {password} = req.body;

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({errors: [{message: 'user not found'}]});
            return;
        }

        const confirmPass = checkPass(password, user.password); // true if matched passwords

        if (!confirmPass) {
            res.status(403).json({errors: [{message: "Wrong password"}]});
            return;
        }

        await User.findOneAndDelete({_id: id});
        await Article.deleteMany({creator: id});
        await Comment.deleteMany({belongsUser: id});
        res.status(200).json({message: "UserT deleted successfully"});
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(500).json({errors: [{message}]});
    }
}

export default deleteUser;