const {Article} = require('../../models/index');
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const getArticleById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({errors: [{message: 'article not found'}]});
        }
        res.status(200).json(article)
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(500).json({errors: [{message}]});
    }
}

export default getArticleById;