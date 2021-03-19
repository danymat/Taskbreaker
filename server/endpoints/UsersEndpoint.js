const { Router } = require('express')
const router = Router()
const UsersMiddleware = require('../middlewares/UsersMiddleware')
const TasksController = require('../controllers/TasksController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const { createToken } = require('../controllers/AuthController')

router.post('/sign-up',  UsersMiddleware.createUser, createToken)

router.post('/login', UsersMiddleware.verifyLogin, createToken)

router.get('/tasks', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.getAllUserTasks)

router.post('/task', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.createTask)

router.post('/deletetask', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.deleteTask)

router.post('/completetask', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.completeTask)

module.exports = router