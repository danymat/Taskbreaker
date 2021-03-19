const { createError } = require('../constants/Error')
const { findAllUsers, getInfo, changePasswordDb, findUser } = require('../service/usersService')
const { encryptPassword, verifyPassword } = require('./../middlewares/UsersUtils/PasswordManagement')


/**
 * @typedef {Object} userBody
 * @property {String} username
 * @property {String} email
 * @property {String} password
 *
 * @param {import('express').Request<{}, {}, userBody, {}>} req
 * @param {import('express').Response} res
 */
exports.getAllUsers = async (req, res) => {
    try {
        let users = await findAllUsers()
        res.status(200).json({
            message: "All DB Users",
            users: users
        })
    } catch (error) {
        next(error)
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        let account = await getInfo(res.locals.user.uuid)
        delete account.password;
        delete account.authorities;
        res.status(200).json({
            message: "Account info :",
            account: account
        })
    } catch (error) {
        next(error)
    }
}

exports.changePassword = async (req, res) => {
    try {
        const neededKeys = ['password', 'oldpassword'];
        if (!neededKeys.every(key => Object.keys(req.body).includes(key))) {
            throw new createError(401, "Missing arguments")
        }

        var user = {}
        try {
            user = await getInfo(res.locals.user.uuid)
        } catch (error) {
            throw new createError(403, "User not found")
        }

        var verified = false
        try {
            verified = await verifyPassword(req.body.oldpassword, user.password)
            if (!verified) {
                throw new createError(403, "Wrong password")
            }
        } catch (error) {
            throw new createError(403, "Wrong password")
        }
        
        var encrypted_password = await encryptPassword(req.body.password)
        await changePasswordDb(res.locals.user.uuid, encrypted_password)
        res.status(200).json({
            message: "Password change successful"
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

