var currentDate = new Date(rbv_api.getCurrentDate());

var arr = {};

var CompetencyID =  "{!name#value}";

var CompetencyKey = rbv_api.selectQuery("SELECT id FROM API_Competency WHERE name#value= '"+CompetencyID+"'",1);
  rbv_api.println("CompetencyKey.length" + CompetencyKey.length);

arr.name                = "{!name}";
arr.Description         = "{!Description#value}";
arr.Short_Description   = " ";
arr.Date_Transfer       = currentDate;
arr.Sent                = "True";
arr.Operation           = "U";

rbv_api.log("debug", "update API Competency");
  
if (CompetencyKey.length > 0) {
  
  rbv_api.updateRecord("API_Competency", CompetencyKey[0][0], arr);
}