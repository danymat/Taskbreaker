const { Router } = require('express')
const router = Router()
const UsersController = require('../controllers/UsersController')

router.get('/users', UsersController.getAllUsers)

router.get('/tasks', (req, res) => res.send('TODO'))

module.exports = router