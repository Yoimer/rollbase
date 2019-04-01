var arr = new Array();


arr["name"] = "{!Employee_Number}";
arr["firstName"] = "{!firstName#value}";
arr["lastName"] = "{!lastName#value}";
arr["mobilePhone"] = "{!mobilePhone#value}";
//arr["Personnel_Email"] = "{!email#text}";
arr["title"] = "{!title#value}";
arr["Employee_Qualification"] = "{!Employee_Number#value}";
arr["isLocked"] = "{!isLocked#value}";
arr["middleName"] = "{!middleName#value}";


rbv_api.log("debug", "create API Personnel");

rbv_api.createRecord("API_Personnel", arr);
