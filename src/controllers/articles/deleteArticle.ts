import {Article, Comment} from '../../models/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";


const deleteArticle = async (req: Request, res: Response) => {
    try {
        const {articleId} = req.params;

        const article = await Article.findById(articleId).populate('creator');
        if (!article) {
            return res.status(404).json({errors: [{message: "Article not found"}]});
        }

        if (req.user?._id.toString() !== article.creator._id.toString()) {
            return res.status(403).json({errors: [{message: "Article not found"}]});
        }

        await Article.findByIdAndRemove(articleId);

        // const user = await User.findById(req.user._id);
        // user.articles.pull(articleId);
        await Comment.deleteMany({belongsArticle: articleId});

        // need web socket?
        res.status(200).json({message: "deleted article"});
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message}]});
    }
}
export default deleteArticle;