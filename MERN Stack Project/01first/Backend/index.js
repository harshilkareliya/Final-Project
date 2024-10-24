const express = require('express');
const app = express();
const db = require('./config/db')
const cookie = require('cookie-parser');
const cors = require('cors')

app.use(express.urlencoded())
app.use(cors({origin : 'http://localhost:5173',credentials:true}));
app.use(cookie())
app.use(express.json())

app.use('/', require('./routes'))

app.listen(1008,(err)=>{
    console.log(err? err : "Server is running on port 1008");
})