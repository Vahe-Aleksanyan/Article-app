export const PORT = process.env.port || 3300;
export const DB_CONNECTION = 'mongodb+srv://VVahe:vahe01@cluster0.kbjas.mongodb.net/vercel';
export const TOKEN_EXPIRY = 7 * 24 * 3600;
export const TOKEN_SECRET = 'mySecret';
export const SENDER_EMAIL = "vahe052001@mail.ru";
export const CLIENT_URL = 'localhost:3300/user';

export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Recipe app",
            version: "1.0.0",
            description: "Recipe API"
        },
        servers: [
            {
                url: "localhost:3300",
                description: "Developement server"
            }
        ]
    },
    // specify where to take apis
    apis: [
        // "../routes/user/*.js"
        "./src/routes/user/*.js"
    ]
};