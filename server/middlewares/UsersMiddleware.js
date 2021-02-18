const { User, AUTHORITIES } = require('../model/User')
const usersService = require('../service/usersService')
const { encryptPassword, verifyPassword } = require('./UsersUtils/PasswordManagement')

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
exports.createUser = async (req, res, next) => {
    try {
        const neededKeys = ['username', 'email', 'password'];
        if (! neededKeys.every(key => Object.keys(req.body).includes(key)) ) {
            throw Error('Missing arguments')
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
        next(error)
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
            throw Error('Missing arguments')
        }
        let user = await usersService.findUser(req.body.email)
        if (!user) {
            throw Error('This user does not exist')
        }
        console.log(user)
        let verified = await verifyPassword(req.body.password, user.password)
        if (!verified) {
            throw Error('Wrong Password')
        }
        next()
    } catch (error) {
        next(error)
    }
}