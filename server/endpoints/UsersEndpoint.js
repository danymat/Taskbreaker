const { Router } = require('express')
const router = Router()
const UsersMiddleware = require('../middlewares/UsersMiddleware')
const TasksController = require('../controllers/TasksController')
const UsersController = require('../controllers/UsersController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const { createToken } = require('../controllers/AuthController')

router.post('/sign-up',  UsersMiddleware.createUser, createToken)

router.post('/login', UsersMiddleware.verifyLogin, createToken)


router.post('/changepassword', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, UsersController.changePassword)

router.get('/account', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, UsersController.getUserInfo)

router.get('/contexts', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.getContexts)

router.post('/contexts', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.createContext)

router.get('/tasks', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.getAllUserTasks)

router.post('/task', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.createTask)

router.post('/deletetask', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.deleteTask)

router.post('/completetask', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.completeTask)

module.exports = router