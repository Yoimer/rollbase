var currentDate = new Date(rbv_api.getCurrentDate());

var arr = {};
var CompetencyID =  "{!name#value}";


arr.name                = "{!name#value}";

arr.Description         = "{!Description#value}";
arr.Short_Description   = " ";
arr.Date_Transfer       = currentDate;
arr.Sent                = "True";
arr.Operation           = "I";


  
  rbv_api.createRecord("API_Competency", arr);