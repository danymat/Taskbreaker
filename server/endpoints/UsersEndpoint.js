const { Router } = require('express')
const router = Router()
const UsersMiddleware = require('../middlewares/UsersMiddleware')
const { createToken } = require('../controllers/AuthController')

router.post('/sign-up',  UsersMiddleware.createUser, createToken)

router.post('/login', UsersMiddleware.verifyLogin, createToken)


module.exports = router