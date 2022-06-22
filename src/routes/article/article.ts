// article connected routes
const {Router} = require('express');
const {
    getArticles,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle,
    searchArticle
} = require('../../controllers/articles/index');

const {is_auth, validate} = require('../../middlewares/index');

const router = Router();

router.get('/', getArticles); // get all articles

router.get('/:id', getArticleById);

router.post('/add', is_auth, addArticle);

router.patch('/:articleId', is_auth, updateArticle);

router.delete('/:articleId', is_auth, deleteArticle);

router.post('/search/:title', searchArticle);

export default router;