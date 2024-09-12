const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  date : {
    type : String,
    required : true
  },
  startTime : {
    type : String,
    required : true
  },
  endTime : {
    type : String,
    required : true
  }
});

const appointmentSchema =  mongoose.model('Appointment Data', schema);

module.exports = appointmentSchema;