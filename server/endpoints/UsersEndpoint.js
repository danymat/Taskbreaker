const { Router } = require('express')
const router = Router()
const UsersMiddleware = require('../middlewares/UsersMiddleware')
const UsersController = require('../controllers/UsersController')

// router.get('/', UsersMiddleware.testMiddleware, UsersController.testController)

module.exports = router