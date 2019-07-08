// this trigger is on MDE calibration, updates expiration date on MDE
// check snapshot on triggers/test/mde

var startDate = new Date("{!Start_Date}");
var validityTime = parseInt("{!Validity_Time}", 10);
var validityUnit = "{!Validity_Time_Unit#code}";

var getProductFromUnit = function(unit){
  var seg = 1000,
    min = seg*60,
    hr = min*60,
    day = hr*24,
    month = day*30,
    year = day*365;
  switch(unit){
    case "D":
      return day;
    case "M":
      return month;
    case "Y":
      return year;
    default:
      return 1;
  }
};


var expirationDate = new Date(startDate.getTime()+(validityTime*getProductFromUnit(validityUnit)));

expirationDate;