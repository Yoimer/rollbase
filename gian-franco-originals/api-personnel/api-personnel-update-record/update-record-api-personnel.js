var arr = new Array();

var personnelName = "{!Employee_Number}";

var personnelId = rbv_api.selectQuery("SELECT id FROM API_Personnel1 WHERE name#value= '" + personnelName + "'", 1);
rbv_api.println ("personnelId Length " + personnelId.length);
var ActualDate = new Date(rbv_api.getCurrentDate());

arr["name"] = "{!Employee_Number}";
arr["firstName"] = "{!firstName#value}";
arr["lastName"] = "{!lastName#value}";
arr["mobilePhone"] = "{!mobilePhone#value}";
//arr["Personnel_Email"] = "{!email#text}";
//arr["title"] = "{!title#value}"; no se usa
arr["Employee_Qualification"] = "{!Employee_Number#value}";
arr["isLocked"] = "{!isLocked#value}";
arr["middleName"] = "{!middleName#value}";
arr["Date_Transfer"]     = ActualDate;
arr["Sent"] = "True";
arr["Operation"] = "U";
arr["Is_Inspector"] = "{!Is_Inspector#value}";
var Is_Inspector = "{!Is_Inspector#value}";

rbv_api.println ("arr[Is_Inspector] " + arr["Is_Inspector"]);
rbv_api.println ("Is_Inspector " + Is_Inspector);

rbv_api.log("debug", "update API Personnel");

// if exists on API_Personnel and it is an inspector
if ((personnelId.length > 0) && Is_Inspector === 'true'){
    rbv_api.println ("update record");
    rbv_api.updateRecord("API_Personnel1", personnelId[0][0], arr);
}