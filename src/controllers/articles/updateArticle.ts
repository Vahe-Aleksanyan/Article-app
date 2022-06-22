import {Article} from '../../models/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const updateArticle = async (req: Request, res: Response) => {
    try {
        const {articleId} = req.params;
        const {title, content} = req.body;

        const user = req.user;

        const article = await Article.findById(articleId).populate('creator');
        if (!article) {
            return res.status(404).json({errors: [{message: "Article not found"}]});
        }

        if (user?._id.toString() !== article.creator._id.toString()) {
            return res.status(403).json({errors: [{message: "Article not found"}]});
        }
        article.title = title;
        article.content = content;

        const updatedArticle = await article.save();

        res.status(200).json(updatedArticle);

    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message}]});
    }
}

export default updateArticle;