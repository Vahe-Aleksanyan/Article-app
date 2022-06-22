import {Article} from '../../models/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const searchArticle = async (req: Request, res: Response) => {
    try {
        const perPage = 5;
        const {title, currentPage} = req.params;
        const currPage = currentPage || 1;
        if (typeof currPage != 'number') {
            throw new Error("Current page is not number");
        }
        const articles = await Article.find({title: {$regex: title, $options: 'i'}})
            .skip((currPage - 1) * perPage)
            .limit(perPage);
        res.status(200).json({articles: articles});
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(500).json({errors: [{message}]});
    }
};

export default searchArticle;