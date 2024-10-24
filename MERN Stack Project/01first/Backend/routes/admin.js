const express = require('express');
const routes = express.Router()
const controller = require('../controller/adminCtl')
const { adminAuth} = require('../middlewares/authantication');
const { route } = require('./manager');

routes.get('/',adminAuth, controller.Home)
routes.get('/profile',adminAuth,controller.profile)
routes.get('/viewManagers',adminAuth, controller.viewManagers)
routes.get('/viewEmployee',adminAuth,controller.viewEmployee)
routes.get('/showTask', adminAuth,controller.showMyTask)


routes.post('/add', controller.addAdmin)
routes.post('/login', controller.login)
routes.post('/changePassword', adminAuth,controller.changePassword)
routes.post('/forgotPassword',controller.forgotPassword)
routes.post('/otpVerification',controller.otpVerification)
routes.post('/addManager',adminAuth,controller.addManager)
routes.post('/addEmployee',adminAuth,controller.addEmployee)

routes.delete('/delete', adminAuth,controller.deleteAdmin)
routes.delete('/deleteManager', adminAuth,controller.deleteManager)
routes.delete('/deleteEmployee',adminAuth,controller.deleteEmployee)

routes.put('/editManager', adminAuth,controller.editManager)
routes.put('/editEmployee', adminAuth,controller.editEmployee)
routes.put('/addTask', adminAuth,controller.addMyTask)


module.exports = routes