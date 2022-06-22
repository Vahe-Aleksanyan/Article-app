import {model, Schema} from 'mongoose';
// UserT model with One-to-Many relation
const User = new Schema({
    isVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
}, {
    timestamps: true,
    collection: 'users'
});

export default model('User', User);