const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Calander')

const db = mongoose.connection

db.on('open', (err)=>{
    console.log(err ? err : 'MongoDB Connected Successfully');
})

