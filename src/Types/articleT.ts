import {Types} from 'mongoose';

interface ArticleT {
    title: string,
    content: string,
    imageUrl: string
    likesNum: number
    creator: Types.ObjectId,
};

export default ArticleT;