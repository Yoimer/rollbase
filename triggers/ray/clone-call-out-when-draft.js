// takes all the fields value from a call out when workflow status is Draft
// create new entry on call out db cloning all the previous fields

var arr = new Array();
// clone record 
rbv_api.cloneRecord("Call_Out", {!id}, arr);