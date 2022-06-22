import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import {options, PORT} from './config/configs';
import {articleRoutes, userRoutes} from './routes/exportRoutes';
import {connectDB} from './utils/index';

const app = express();

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRoutes);
app.use('/article', articleRoutes);


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})