const express = require('express')
const routes = express.Router()
const controller = require('../controller/controller') 

routes.get('/', controller.home)
routes.post('/addAppointment', controller.addAppointment)
routes.get('/deleteAppointment',controller.deleteAppointment)
routes.post('/editAppointment', controller.editAppointment)

module.exports = routes