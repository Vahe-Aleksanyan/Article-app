import {model, Schema} from 'mongoose';

const verificationCode = new Schema({
        email: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            expires: '1d',
            default: Date.now()
        },
    },
    {
        collection: 'verification_codes',
    }
);

export default model('verificationCode', verificationCode);

