const jwt = require('jsonwebtoken')
const Auth = require('../constants/Auth');
const { createError } = require('../constants/Error');



/**
 * @typedef {Object} userBody
 * @property {String} email
 * @property {String} password
 *
 * @param {import('express').Request<{}, {}, userBody, {}>} req
 * @param {import('express').Response} res
 */
exports.createToken = (req, res, next) => {
    try {
        let login = { email: req.body.email, password: req.body.password }
        let jwtToken = jwt.sign(login, Auth.jwtSecret, { expiresIn: Auth.jwtExpiration });
        res.status(200).json({
            message: `New token, expiration: ${Auth.jwtExpiration / 60} minutes`,
            token: jwtToken,
            email: req.body.email
        })
    } catch (error) {
        next(new createError(401, error.message))
    }
}


