const express = require('express')
const routes = express.Router()
const controller = require('../controller/employeeCtl')
const {employeeAuth} = require('../middlewares/authantication')

routes.get('/profile', employeeAuth,controller.profile)

routes.post('/login', controller.login)
routes.post('/changePassword',employeeAuth, controller.changePassword)
routes.post('/forgotPassword',employeeAuth, controller.forgotPassword)
routes.post('/otpVerification',employeeAuth, controller.otpVerification)

module.exports = routes