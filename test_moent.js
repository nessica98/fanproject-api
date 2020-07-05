const moment = require('moment')

//var x = new moment()
//var y = new moment()
/*
console.log(x.toDateString())
console.log(y.toDateString())*/


var x = new moment('8 7 2020',"D M Y")
var y = new moment()
var y_kr = new moment().utcOffset(540)

// Show Date/Time in KST
console.log(y_kr.format("dddd, MMMM Do YYYY, h:mm:ss a"))

var duration = moment.duration(y.diff(x))
console.log(Math.floor(duration.asDays()))

const d_day = function(date_str) {
    if(typeof date_str !== 'string') return;

    
    var now = new moment();
    var day = new moment(date_str,"D M Y")
    var duration = moment.duration(y.diff(x))
    
    var duration = moment.duration(now.diff(day))
    console.log(Math.floor(duration.asDays()))
    return (Math.floor(duration.asDays()))
}
d_day('13 7 2020')
d_day('15 7 2019')
d_day('6 11 2020')
//d_day('6 11')
