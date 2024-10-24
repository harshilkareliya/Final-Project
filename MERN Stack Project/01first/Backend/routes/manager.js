const express = require('express')
const routes = express.Router()
const controller = require('../controller/managerCtl')
const {managerAuth} = require('../middlewares/authantication')

routes.get('/profile', managerAuth,controller.profile)
routes.get('/viewEmployee', managerAuth,controller.viewEmployee)

routes.post('/login', controller.login)
routes.post('/changePassword',managerAuth, controller.changePassword)
routes.post('/forgotPassword',managerAuth, controller.forgotPassword)
routes.post('/otpVerification',managerAuth, controller.otpVerification)
routes.post('/addEmployee',managerAuth, controller.addEmployee)

routes.delete('/deleteEmployee', managerAuth,controller.deleteEmployee)

routes.put('/editEmployee', managerAuth, controller.editEmployee)

module.exports = routes