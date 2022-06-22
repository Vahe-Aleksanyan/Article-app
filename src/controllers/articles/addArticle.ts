import {Article, User} from '../../models/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const addArticle = async (req: Request, res: Response): Promise<void> => {
    try {
        // then will change image url to file uploads
        const {title, content, imageUrl} = req.body;

        const article = await new Article({
            title,
            content,
            creator: req.user?._id
        });

        await article.save();

        const user = await User.findById(req.user?._id);
        user.articles.push(article);
        await user.save();


        // need sockets ??


        res.status(201).json({
            message: "article created successfully",
            article,
            creator: {_id: user._id, name: user.name},
        });

    } catch (err) {
        const message = getErrorMessage(err);
        res.status(500).json({errors: [{message}]});
    }
}

export default addArticle;