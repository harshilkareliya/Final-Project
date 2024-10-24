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
    role : {
        type : String,
        default : 'admin'
    },
    tasks : [
        {
            title : {
                type : String,
                required : true,
            },
            isDone : {
                type : Boolean,
                default : false
            },
            description : {
                type : String,
                required : true,
            },
            createdAt : {
                type : String,
                required : true
            },
            dueDate : {
                type : String,
                required : true
            }
        }
    ]
})

const adminSchema = mongoose.model('Admins', schema)
module.exports = adminSchema