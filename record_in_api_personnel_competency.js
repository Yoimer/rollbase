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

if (employeeID.length > 0){
    // arr.Competency_Code     = CompetencyID;
    arr["Competency_Code"]                  = CompetencyID;
    // arr.name        = "{!name#value}";
    arr["name"]                             = "{!name#value}";
    // arr.Date_Transfer       = ActualDate;
    arr["Date_Transfer"]                    = ActualDate;
    // arr.Expiration_Date     = "{!Expiration_Date_Expression}";
    arr["Expiration_Date "]                 = "{!Expiration_Date_Expression}";
    // arr.R6739733 = [employeeID[0][0]]; //API Personnel - APi Personnel Competency relationship
    arr["R6739733"]                         = [employeeID[0][0]];
    // arr.Operation           = "I";
    arr["Operation"]                        = "I";
    // arr.Sent                = "1"; 
    arr["Sent"]                             = 1;
    arr["Checkbox_Prueba"]                             = "False";
  
  
  
    //rbv_api.println ("arr.Competency_Code " + arr.Competency_Code);
    rbv_api.println ("Competency_Code " + arr["Competency_Code"]);
    //rbv_api.println ("arr.name " + arr.name);
    rbv_api.println ("name " + arr["name"]);
    //rbv_api.println ("arr.Date_Transfer " + arr.Date_Transfer);
    rbv_api.println ("Date_Transfer " + arr["Date_Transfer"]);
    // rbv_api.println ("arr.Expiration_Date " + arr.Expiration_Date);
    rbv_api.println ("Expiration_Date " + arr["Expiration_Date "]);
    //rbv_api.println ("arr.R6739733 " + arr.R6739733);
    rbv_api.println ("R6739733 " + arr["R6739733"]);
    //rbv_api.println ("arr.Operation " + arr.Operation);
    rbv_api.println ("Operation " + arr["Operation"]);
    //rbv_api.println ("arr.Sent " + arr.Sent);
    rbv_api.println ("Sent " + arr["Sent"]);
    rbv_api.println ("Checkbox_Prueba " + arr["Checkbox_Prueba"]);

    var newId = rbv_api.createRecord("API_Personnel_Competency", arr);

    rbv_api.print("Created record with id: "+newId);

    rbv_api.println ("create personnel competency ");
  }