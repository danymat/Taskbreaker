const { Router } = require('express')
const router = Router()
const UsersController = require('../controllers/UsersController')
const { verifyJwt } = require('../middlewares/AuthMiddleware')

router.get('/users', UsersController.getAllUsers)

router.get('/tasks', (req, res) => res.json({message: 'TODO'}))

router.post('/verify-token', verifyJwt, (req, res) => res.json({message: 'verified'}))

module.exports = router