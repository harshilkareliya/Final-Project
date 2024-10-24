const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        default : 'employee'
    },
    createdAt : {
        type : String,
        required : true
    }
})

const employeeSchema = mongoose.model('Employee', schema)
module.exports = employeeSchema