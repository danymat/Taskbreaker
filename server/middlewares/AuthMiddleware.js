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
            if (req.get('authorization') && req.get('authorization').split(' ')[0] === 'Bearer')
                return req.headers.authorization.split(' ')[1];
            return null;
        }

        let token = getToken(req)
        let decoded = jwt.verify(token, jwtSecret)
        res.locals.decoded = decoded
        next()
    } catch (error) {
        res.status(403).send('Forbidden')
    }
}


