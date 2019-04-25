var arr = new Array();

var ActualDate = new Date(rbv_api.getCurrentDate());

arr["name"] = "{!Employee_Number}";
arr["firstName"] = "{!firstName#value}";
arr["lastName"] = "{!lastName#value}";
arr["mobilePhone"] = "{!mobilePhone#value}";
//arr["Personnel_Email"] = "{!email#text}";
arr["title"] = "{!title#value}";
arr["Employee_Qualification"] = "{!Employee_Number#value}";
arr["isLocked"] = "{!isLocked#value}";
arr["middleName"] = "{!middleName#value}";
arr["Date_Transfer"]     = ActualDate;
arr["Sent"] = "True";
arr["Operation"] = "I";
arr["Is_Inspector"] = "{!Is_Inspector#value}";
var Is_Inspector = "{!Is_Inspector#value}";

rbv_api.println ("arr[Is_Inspector] " + arr["Is_Inspector"]);
rbv_api.println ("Is_Inspector " + Is_Inspector);

//if it is an inspector, then creates
if(Is_Inspector === 'true') {
    rbv_api.println ("create record");
    rbv_api.createRecord("API_Personnel", arr);
}