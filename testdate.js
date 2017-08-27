var moment = require('moment');

var mdate = moment.unix(1451960554).utcOffset('+08:00');

console.dir(mdate.toDate());