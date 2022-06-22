import {verifyJWT} from '../utils/index';
import {User} from '../models/index';
import {NextFunction, Request, Response} from "express";

const verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //const authHeader = req.get('Authorization');
    const authHeader = String(req.headers.token);

    if (!authHeader) {
        res.status(401).json({errors: [{auth: "Not authorized"}]});
    }

    try {
        const data = verifyJWT(authHeader.split(" ")[1], res);

        if (data?.hasOwnProperty('email')) {
            const user = await User.findOne({email: data.email}); // check

            let {password, ...secureUser} = user._doc;

            req.user = secureUser; // now we added user in our request, so we do not need to fetch from db in each controller
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({errors: [{message: "not authorized"}]});
    }
    //req.userId = token.userId;
    //next();
}

export default verify;