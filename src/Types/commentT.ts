import {Types} from 'mongoose';

interface CommentT {
    content: string,
    belongsArticle: Types.ObjectId
};

export default CommentT;