const { User } = require('../model/User')
const usersService = require('../service/usersService')


exports.testMiddleware = async function (req, res, next) {
    try {
        next()
    } catch (error) {
        next(error)
    }
}