//If new of a worker's competence occurs, the change in API Personnel Competency
// is notified.

var arr = [];
var ActualDate = new Date(rbv_api.getCurrentDate());
// When making a change in the competence of a worker you have the identification of the worker through
// the relationship between Personnel and Personnel Competency

var CompetencyID =  "{!R148251#value}"; 


var employeeNo = rbv_api.getRelatedFields("R148244","{!id}", "Employee_Number");

rbv_api.println ("employeeNo " + employeeNo[0]);
// Seleccionar el ID del API Personnel para asignarle el valor a la relación R6739733 y asi establecer
// la relación entre API Personnel y API Personnel Competency

var employeeID = rbv_api.selectQuery("SELECT id FROM API_Personnel WHERE name#value='" + employeeNo[0] + "'", 1);
rbv_api.println ("longitud " + employeeID.length);
//var fecha = new Date("{!Expe_Completa}");
if (employeeID.length > 0){
  
  arr["Competency_Code"]= CompetencyID;
  arr["name"] = "{!name#value}";
  arr["Date_Transfer"]= ActualDate;
  arr["Competency_Start_Date"] =  new Date("{!Start_Date}");
  arr["Expiration_Date"]= new Date("{!Expiration_Date_F}");
  arr["R6739733"] = [employeeID[0][0]];//API Personnel - APi Personnel Competency relationship
  arr["Operation"] = "I";
  arr["Sent"] = "True";
  rbv_api.createRecord("API_Personnel_Competency", arr);
}