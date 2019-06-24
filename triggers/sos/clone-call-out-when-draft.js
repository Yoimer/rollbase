// takes all the fields value from a call out when workflow status is Draft
// create new entry on call out db cloning all the previous fields

var arr = new Array();

// forces date of request value
// this avoids error on date of request validation
arr["Date_of_Request"] = new Date("{!Start_Date}");

// clone record 
rbv_api.cloneRecord("Call_Out", {!id}, arr);