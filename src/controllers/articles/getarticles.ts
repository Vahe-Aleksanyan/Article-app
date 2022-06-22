import {Article} from '../../models/index';
import {Request, Response} from "express";
import {getErrorMessage} from "../../utils";

const getArticles = async (req: Request, res: Response) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 3;
        if (typeof currentPage != 'number') {
            throw new Error("Current page is not number");
        }
        const articles = await Article
            .find()
            .populate('creator')
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        res.status(200).json({
            message: "Fetched posts successfully",
            articles,
        });
    } catch (err) {
        const message = getErrorMessage(err)
        res.status(500).json({errors: [{message}]})
    }
}

export default getArticles;