var arr = new Array();

var personnelName = "{!Employee_Number}";

var personnelId = rbv_api.selectQuery("SELECT id FROM API_Personnel WHERE name#value= '" + personnelName + "'", 1);


arr["name"] = "{!Employee_Number}";
arr["firstName"] = "{!firstName#value}";
arr["lastName"] = "{!lastName#value}";
arr["mobilePhone"] = "{!mobilePhone#value}";
//arr["Personnel_Email"] = "{!email#text}";
arr["title"] = "{!title#value}";
arr["Employee_Qualification"] = "{!Employee_Number#value}";
arr["isLocked"] = "{!isLocked#value}";
arr["middleName"] = "{!middleName#value}";

rbv_api.log("debug", "update API Personnel");
  
if (personnelId.length > 0) {
  
  rbv_api.updateRecord("API_Personnel", personnelId[0][0], arr);
}