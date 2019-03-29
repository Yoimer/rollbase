//If new or modification of a worker's competence occurs, the change in API Personnel Competency
// is notified.

var arr = [];
var currentDate = new Date(rbv_api.getCurrentDate());
// When making a change in the competence of a worker you have the identification of the worker through
// the relationship between Personnel and Personnel Competency

var CompetencyID =  "{!R148251#value}"; 
 
var personnelName = rbv_api.getRelatedFields("R148244","{!id}", "name");

var employeeNo = rbv_api.selectQuery("SELECT id FROM API_Personnel WHERE name#value='" + personnelName[0] + "'", 1);
rbv_api.println(employeeNo.length);
rbv_api.println("prueba");

if (employeeNo.length > 0){
    arr.personnelName       = "{!name#value}";
    arr.Date_Transfer       = "currentDate";
    arr.Expiration_Date     = "{!Expiration_Date}";
    arr.R6738299            = [employeeNo[0][0]]; //API Personnel - APi Personnel Competency relationship
    arr.Operation           = "I";
    arr.Sent                = "True"; 
        
  if (rbv_api.isUpdate()) {
    
    rbv_api.println("update personnel competency");
    
    var PersonnelCompeId = rbv_api.selectQuery("SELECT id FROM  API_Personnel_Competency WHERE Competency_Code  = '" + CompetencyID + "'", 1);
    
    if (PersonnelCompeId.length > 0) {
        arr.Operation           = "U";
        rbv_api.updateRecord("API_Personnel_Competency", PersonnelCompeId[0][0], arr);
    }
  } else {
    
    rbv_api.println("create personnel competency");
    rbv_api.createRecord("API_Personnel_Competency", arr);
  }
  
}