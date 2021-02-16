const { Router } = require('express')
const router = Router()
const UsersMiddleware = require('../middlewares/UsersMiddleware')
const UsersController = require('../controllers/UsersController')
const { verifyJwt } = require('../middlewares/AuthMiddleware')
const { createToken } = require('../controllers/AuthController')


router.get('/', UsersController.getAllUsers)

router.post('/sign-up',  UsersMiddleware.createUser, createToken)

router.post('/login', UsersMiddleware.verifyLogin, createToken)


module.exports = router