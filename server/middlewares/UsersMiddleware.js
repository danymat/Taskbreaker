const { User, AUTHORITIES } = require('../model/User')
const usersService = require('../service/usersService')
const { encryptPassword, verifyPassword } = require('./UsersUtils/PasswordManagement')
const { createError } = require('../constants/Error')
/**
 * @typedef {Object} userBody
 * @property {String} username
 * @property {String} email
 * @property {String} password
 * @property {String} passwordconf
 * 
 * @param {import('express').Request<{}, {}, userBody, {}>} req
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.createUser = async (req, res, next) => {
    try {
        const neededKeys = ['username', 'email', 'password', 'passwordconf'];
        if (! neededKeys.every(key => Object.keys(req.body).includes(key)) ) {
            throw new createError(401, "Missing arguments")
        }
        if (req.body.password != req.body.passwordconf) {
            throw new createError(401, "Password confirmation does not match password")
        }
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            authorities: AUTHORITIES.USER
        })
        await usersService.isUserAlreadyTaken(user)
        user.password = await encryptPassword(user.password)
        await usersService.addUser(user)
        next()
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

/**
 * @typedef {Object} userBody
 * @property {String} email
 * @property {String} password
 *
 * @param {import('express').Request<{}, {}, userBody, {}>} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.verifyLogin = async (req, res, next) => {
    try {
        const neededKeys = ['password', 'email'];
        if (! neededKeys.every(key => Object.keys(req.body).includes(key)) ) {
            throw new createError(401, "Missing arguments")
        }
        let user = await usersService.findUser(req.body.email)
        if (!user) {
            throw new createError(403, "Wrong email or password")
        }
        let verified = await verifyPassword(req.body.password, user.password)
        if (!verified) {
            throw new createError(403, "Wrong email or password")
        }
        next()
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}