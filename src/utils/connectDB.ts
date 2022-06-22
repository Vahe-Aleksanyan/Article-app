import {connect} from 'mongoose'

import {DB_CONNECTION} from '../config/configs';

const connectDb = (): void => {
    connect(DB_CONNECTION).then(() => {
        console.log('connected to DB')
    }).catch(err => {
        console.log(err.message);
    });
}

export default connectDb;

