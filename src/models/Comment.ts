import {model, Schema} from 'mongoose';

const Comment = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        required: true
    },
    belongsArticle: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    belongsUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    collection: 'articles'
});

export default model('Comment', Comment);