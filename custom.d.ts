import IUser from './src/Types/userT'

declare global {
    namespace Express {
        interface Request {
            user: IUser | null;
        }
    }
}
