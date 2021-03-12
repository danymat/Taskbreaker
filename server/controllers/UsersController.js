const { createError } = require('../constants/Error')
const { findAllUsers } = require('../service/usersService')


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

