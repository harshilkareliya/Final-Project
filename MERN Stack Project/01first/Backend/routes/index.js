const express = require('express');
const routes = express.Router()

routes.get('/', (req,res)=>{
    res.status(200).json({message : "You Are In Home Page"})
})

routes.use('/admin', require('./admin'))
routes.use('/manager', require('./manager'))
routes.use('/employee', require('./employee'))

module.exports = routes