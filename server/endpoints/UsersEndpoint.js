const { Router } = require('express')
const router = Router()
const UsersMiddleware = require('../middlewares/UsersMiddleware')
const TasksController = require('../controllers/TasksController')
const UsersController = require('../controllers/UsersController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const { createToken } = require('../controllers/AuthController')

/**
 * @summary Sign-up/Login
 */
router.post('/sign-up',  UsersMiddleware.createUser, createToken)
router.post('/login', UsersMiddleware.verifyLogin, createToken)

/**
 * @summary Change user password
 */
router.post('/changepassword', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, UsersController.changePassword)

/**
 * @summary Get user informations
 */
router.get('/account', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, UsersController.getUserInfo)

/**
 * @summary Create a new context
 */
router.post('/context', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.createContext)

/**
 * @summary Create a new project
 */
router.post('/project', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.createProject)

/**
 * @summary Get all tasks with contexts and projects
 */
router.get('/tasks', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.getAllUserTasks)

/**
 * @summary Create a new task
 */
router.post('/task', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.createTask)

/**
 * @summary Delete a task
 */
router.post('/deletetask', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.deleteTask)

/**
 * @summary Complete a task
 */
router.post('/completetask', AuthMiddleware.verifyJwt, UsersMiddleware.getUserFromDecoded, TasksController.completeTask)



module.exports = router