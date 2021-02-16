const { Router } = require('express')
const router = Router()
const UsersController = require('../controllers/UsersController')

router.get('/users', UsersController.getAllUsers)

router.get('/tasks', (req, res) => res.json({message: 'TODO'}))

module.exports = router