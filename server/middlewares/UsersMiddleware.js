const { User, AUTHORITIES } = require('../model/User')
const usersService = require('../service/usersService')
const usersController = require('../controllers/UsersController')

/**
 * @typedef {Object} userBody
 * @property {String} username
 * @property {String} email
 * @property {String} password
 *
 * @param {import('express').Request<{}, {}, userBody, {}>} req
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.createUser = async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            throw Error('Missing arguments')
        }
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            authorities: AUTHORITIES.USER
        })
        await usersService.isUserAlreadyTaken(user)
        await usersService.addUser(user)

        next()
    } catch (error) {
        next(error)
    }
}