const moment = require('moment');

const d_day = function(date_str) {
    if(typeof date_str !== 'string') return;

    
    var now = new moment();
    var day = new moment(date_str,"D M Y")
    //var duration = moment.duration(y.diff(x))
    
    var duration = moment.duration(now.diff(day))
    //console.log(Math.floor(duration.asDays()))
    return (Math.floor(duration.asDays()))
}

module.exports = d_day