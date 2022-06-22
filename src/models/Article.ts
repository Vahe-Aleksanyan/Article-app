import {model, Schema} from 'mongoose';

const Article = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    likesNum: {
        type: Number,
        default: 0
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // comments: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Comments'
    //     }
    // ]
}, {
    timestamps: true,
    collection: 'articles'
})

export default model('Article', Article);