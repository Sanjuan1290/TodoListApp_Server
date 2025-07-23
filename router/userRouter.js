const express = require('express')
const router = express.Router()
const { register, login, verify } = require('../controller/userController')
const { auth } = require('../util')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/verify').get(auth, verify)

module.exports = router