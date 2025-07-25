const express = require('express')
const router = express.Router()
const { register, login, verify, addTask, editTask, removeTask, toggleTask, getUserProfile, updateUserProfile } = require('../controller/userController')
const { auth } = require('../util')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/verify').get(auth, verify)

router.route('/addTask').post(addTask)
router.route('/editTask').patch(editTask)
router.route('/deleteOneTask').delete(removeTask)

router.route('/toggleTask').patch(toggleTask)
router.route('/getProfile').get(getUserProfile)
router.route('/updateProfile').patch(updateUserProfile)

module.exports = router