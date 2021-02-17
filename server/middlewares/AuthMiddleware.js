const { jwtSecret } = require('../constants/Auth')
const jwt = require('jsonwebtoken')

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.verifyJwt = (req, res, next) => {

    try {
        function getToken(req) {
            if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
                return req.headers.authorization.split(' ')[1];
            throw Error('Header Malformed')
        }
        let token = getToken(req)
        try {
            let decoded = jwt.verify(token, jwtSecret)
            res.locals.decoded = decoded
            next()
        } catch (error) {
            throw Error('Forbidden')
        }
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }
}


