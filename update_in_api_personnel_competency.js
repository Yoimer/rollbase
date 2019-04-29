//If new of a worker's competence occurs, the change in API Personnel Competency
// is notified.

var arr = [];
var ActualDate = new Date(rbv_api.getCurrentDate());
// When making a change in the competence of a worker you have the identification of the worker through
// the relationship between Personnel and Personnel Competency

// gets personnel compentency (1 Competency (R148251) to Many Personnel Competencys relationship)
var CompetencyID =  "{!R148251#value}";

//gets employee number (1 Personnel (R148244) Many Personnel Competencys relationship)
var employeeNo = rbv_api.getRelatedFields("R148244","{!id}", "Employee_Number");

rbv_api.println ("employeeNo " + employeeNo[0]);

// gets Employee Code from API_Personnel
var employeeID = rbv_api.selectQuery("SELECT id FROM API_Personnel1 WHERE name#value='" + employeeNo[0] + "'", 1);
rbv_api.println ("longitud " + employeeID.length);

if (employeeID.length > 0) {

    arr["Competency_Code"]= CompetencyID;
    arr["name"] = "{!name#value}";
    arr["Date_Transfer"]= ActualDate;
    arr["Competency_Start_Date"] =  new Date("{!Start_Date}");
    arr["Expiration_Date"]= new Date("{!Expiration_Date}");
    arr["Sent"] = "True";

    // if updates record
    if (rbv_api.isUpdate()) {

        arr["Operation"] = "U";
        //Employee Code  is Lookup 1 API Personnel (R6895181) to Many API Personnel Competency 
        // checks if it matches
        var api_personnel_competency_id = rbv_api.selectQuery("SELECT id FROM API_Personnel_Competency1 WHERE Employee_Code_EXP= '" + employeeNo[0] + "'", 1);
        rbv_api.println ("api_personnel_competency_id " + api_personnel_competency_id.length);
        rbv_api.println ("----- " + api_personnel_competency_id[0][0]);
        rbv_api.println ("..... " + arr["Operation"]);
        if(api_personnel_competency_id.length > 0){
            rbv_api.updateRecord("API_Personnel_Competency1", api_personnel_competency_id[0][0], arr);
            rbv_api.println ("update personnel competency ");
        }
    // if creates records
    } else if(rbv_api.isCreate()){
            arr["R6895181"] = [employeeID[0][0]];//API Personnel - APi Personnel Competency relationship
            arr["Operation"] = "I";
            rbv_api.createRecord("API_Personnel_Competency1", arr);
            rbv_api.println ("create personnel competency ");
    }
}