import ArticleT from "./articleT";

interface UserT {
    _id: string,
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    articles: ArticleT [],
    comments: Comment [],
    createdAt: Date;
    updatedAt: Date;
};

export default UserT;