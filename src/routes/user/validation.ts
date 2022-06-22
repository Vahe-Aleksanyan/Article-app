import {body, query} from 'express-validator';

const bodyNameRule = body('name')
    .isLength({min: 1, max: 25})
    .withMessage("must contain 1-25 charecters");

// exports.loginRules = [
//     bodyNameRule,
//     body('email')
//         .isEmail()
//         .withMessage("invalid email"),
//     body('password')
//         .isLength({min: 5, max:16})
//         .withMessage("Password must contain 8-16 characters"),
//     body('passwordConfirmation').custom((value, {req})  => {
//         return value === req.body.password
//     }).withMessage("Passwords do not match"),
// ]
exports.loginRules = [
    body("email")
        .isEmail()
        .withMessage("Email address does not exist or is not valid"),
    body("password").isString().withMessage("Password is required"),
];


exports.signupRules = [
    body("email")
        .isEmail()
        .withMessage("Email address does not exist or is not valid"),
    body("password").isString().withMessage("Password is required"),
];

exports.verifyUserRules = [
    query("code").exists().withMessage("Code is required."),
    query("email").exists().withMessage("Email is required."),
];

exports.changePasswordRules = [
    body("newPassword")
        .isLength({min: 8, max: 16})
        .withMessage("Password must contain 8-16 characters"),
];

exports.sendEmailRules = [
    body("email").isEmail().withMessage("Email is required"),
];

exports.resetPasswordRules = [
    body("newPassword")
        .isLength({min: 8, max: 16})
        .withMessage("Password must contain 8-16 characters"),
    body("passwordConfirmation")
        .custom((value, {req}) => value === req.body.newPassword)
        .withMessage("Passwords do not match"),
];

exports.deleteRules = [
    body("password").isString().withMessage("Password is required"),
];

exports.patchRules = [bodyNameRule];