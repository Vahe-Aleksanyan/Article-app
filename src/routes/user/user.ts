// user connected routes
/**
 * @swagger
 * components:
 *   schemas:
 *     serverError:
 *       type: object
 *       properties:
 *         errors:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *     newUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserT:
 *       type: object
 *       properties:
 *         isVerified:
 *           type: boolean
 *         _id:
 *           type: ObjectId
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: hashedString
 *         articles:
 *           type: array
 *         comments:
 *           type: array
 *         createdAt:
 *           type: stringDate
 *         updatedAt:
 *           type: stringDate
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: UserT
 *   description: The user managing API
 */

const {Router} = require('express');
const {is_auth, validate} = require('../../middlewares/index');
const {
    signup,
    login,
    verifyUser,
    changePassword,
    sendRecovery,
    forgotPass,
    getUsers,
    deleteUser,
    updateUser,
    searchUser
} = require('../../controllers/user/index');
const {
    loginRules,
    patchRules,
    deleteRules,
    signupRules,
    sendEmailRules,
    verifyUserRules,
    resetPasswordRules,
    changePasswordRules,
} = require("./validation");

const router = Router();

// test with postman and send appropirate data with swagger

/**
 * @swagger
 * /user:
 *     get:
 *       summary: Retrieve an array of all users
 *       tags: [UserT]
 *       produces:
 *         - application/json
 *       consumes:
 *         - application/json
 *       responses:
 *         500:
 *           description: Server connected error
 *         200:
 *           description: A list of users.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/UserT'
 */
router.get('/', getUsers);

/**
 * @swagger
 * /user/signup:
 *     post:
 *       summary: register a new user with given name, email, password in request body
 *       description: register a new user with given name, email, password in request body. sends verification email
 *       tags: [UserT]
 *       produces:
 *         - application/json
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *            $ref: "#/components/schemas/newUser"
 *       responses:
 *         200:
 *           description: user created
 *           content:
 *             object:
 *               schema:
 *                 $ref: '#/components/schemas/UserT'
 *         422:
 *           description: user with such email already exists
 *           content:
 *             object:
 *               schema:
 *                 $ref: '#/components/schemas/serverError'
 */
router.post('/signup', signupRules, validate, signup);

/**
 * @swagger
 * /user/verify{email, code}:
 *     get:
 *       summary: verifying user by email
 *       description: verifying user by sending special code to email, user submits the code and email via req.query.
 *       tags: [UserT]
 *       produces:
 *         - application/json
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: code
 *           required: true
 *           schema:
 *             type:
 *               string
 *         - in: path
 *           name: email
 *           required: true
 *           schema:
 *             type:
 *               string
 *       responses:
 *         404:
 *           description: verification code not found
 *         401:
 *           description: failed to verify account
 *         200:
 *          description: verified
 *
 *
 */
router.get('/verify', verifyUserRules, validate, verifyUser);

/**
 * @swagger
 * /user/login:
 *     post:
 *       summary: login user
 *       description: user sends its email and password via req.body . recieves newly created user object and token
 *       tags: [UserT]
 *       produces:
 *         - application/json
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: email
 *           required: true
 *           schema:
 *            type:
 *              string
 *         - in: body
 *           name: password
 *           required: true
 *           schema:
 *             type:
 *               string
 *       responses:
 *         200:
 *           description: logged in
 *           content:
 *             object:
 *               schema:
 *                 $ref: '#/components/schemas/UserT'
 *         403:
 *           description: Wrong password
 *           content:
 *             object:
 *               schema:
 *                 $ref: '#/components/schemas/serverError'
 *         422:
 *           description: wrong email
 *           content:
 *             object:
 *               schema:
 *                 $ref: '#/components/schemas/serverError'
 */

router.post('/login', loginRules, validate, login);

/**
 * @swagger
 * /user/changePassword/:_id:
 *   post:
 *     summary: change password
 *     description: changing password when user is logged in, provides id via req.params, and token code with header for authorization
 *     tags: [UserT]
 */
router.patch('/changePassword/:_id', is_auth, changePasswordRules, validate, changePassword);

/**
 * @swagger
 * /user/send-recovery:
 *   post:
 *     summary: forgot password recovery
 *     description: works when user is logged out, reseting password by email, user provides email via req.body
 *     tags: [UserT]
 */
router.post('/send-recovery', sendEmailRules, validate, sendRecovery);

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: reseting password
 *     description: works when user is logged out, clicks link from email message, user provides email and token code via req.params and new password via req.body
 *     tags: [UserT]
 */
router.patch('/reset-password', resetPasswordRules, validate, forgotPass);

/**
 * @swagger
 * /user/:id:
 *   patch:
 *     summary: uodating user data
 *     description: user provides user id via req.params and data to be changes via req.body. Also token code with header for authorization
 *     tags: [UserT]
 */
router.patch('/:id', is_auth, patchRules, validate, updateUser);

/**
 * @swagger
 * /user/:id:
 *   delete:
 *     summary: delete user
 *     description: user provides id via req.params and password via req.body. Also token code with header for authorization
 *     tags: [UserT]
 */
router.delete('/:id', is_auth, deleteRules, validate, deleteUser);

/**
 * @swagger
 * /user/search/:name:
 *   post:
 *     summary: search user
 *     description: user provides text (email) to search for user via req.params, recieves all matched users array of objects
 *     tags: [UserT]
 */
router.post('/search/:name', searchUser);

export default router;