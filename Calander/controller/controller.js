const appointmentSchema = require('../model/Appointment')
function createMonth(year, month) {
    const thisMonth = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Date 1 which day ?
    // console.log('First Day :',firstDayOfMonth)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
    // console.log('Total Days :',daysInMonth)
    const prevMonth = new Date(year, month, 0).getDate();
    // console.log(prevMonth)

    let week = new Array(7); // Create an aray
    let day = 1;

    for(let i = 0; i < firstDayOfMonth;i++){
        week[i] = (prevMonth - firstDayOfMonth)+i+1
    }
    // first week
    for (let i = firstDayOfMonth; i <= 6; i++) {
        week[i] = day++;
    }
    thisMonth.push(week); // Add thisMonth to first week

    // remain week
    let endMonth = false;

    while (day <= daysInMonth) {
        week = new Array(7);
        nextMonth = 1;
        for (let i = 0; i <= 6 && endMonth !== true; i++) {
            if(day <= daysInMonth){
                week[i] = day;
            }
            if(day > daysInMonth){
                week[i] = nextMonth++
                i === 6 ? endMonth = true : endMonth = false;
            }
            day++;
        }
        thisMonth.push(week);
    }

    // console.log(thisMonth)
    return thisMonth;
}

module.exports.home = async (req, res) => {
    let year = parseInt(req.query.year) || new Date().getFullYear();
    let month = parseInt(req.query.month) || new Date().getMonth(); 

    const monthsName = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
    const thisMonth = createMonth(year, month);    
    const today = new Date().toISOString().slice(0,10); 

    const appointments = await appointmentSchema.find({
        $expr: {
            $and: [
                { $eq: [{ $substr: ["$date", 0, 4] }, year.toString()] }, // Match the year
                { $eq: [{ $substr: ["$date", 5, 2] }, (month + 1).toString().padStart(2, '0')] } // Match the month (01 for Jan, etc.)
            ]
        }
    });    

    const showappointments = appointments.map((e) => {
        return {
            year: parseInt(e.date.substring(0, 4)),
            month: parseInt(e.date.substring(5, 7)),
            day: parseInt(e.date.substring(8, 10)),
            date: e.date,
            title: e.title,
            startTime: e.startTime,
            endTime: e.endTime,
            id: e.id
        };
    });

    res.render('month', { 
        thisMonth, 
        year, 
        month: monthsName[month], 
        monthNumber: (month < 9 ? '0' : '') + (month + 1), 
        showappointments, 
        today 
    });
};

module.exports.addAppointment = async (req, res)=>{
    try{
        let dateParts = req.body.date.split('/');
        let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
 
        req.body.date = formattedDate;
        const isAdd = await appointmentSchema.create(req.body)
        isAdd ? res.redirect('/') : console.log('Data Not Add Properly');
    } catch(err){
        console.log(err);
    }
} 

module.exports.deleteAppointment = async (req, res)=>{
    try{
        const isdelete = await appointmentSchema.findByIdAndDelete(req.query.id);
        isdelete ? res.redirect('/') : console.log('Data Not Deleted'); 
    }  catch(err){
        console.log(err);
    }
}

module.exports.editAppointment = async (req, res)=>{
    try{
        console.log(req.body)
        console.log("Edit id :- "+req.query.id)
        const isedit = await appointmentSchema.findByIdAndUpdate(req.query.id,req.body)
        isedit ? res.redirect('/') : console.log('Data Not Edit')
    } catch(err){
        console.log(err);
    }
}