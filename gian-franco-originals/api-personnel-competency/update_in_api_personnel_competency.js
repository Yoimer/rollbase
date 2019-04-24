//If new of a worker's competence occurs, the change in API Personnel Competency
// is notified.

var arr = [];
var ActualDate = new Date(rbv_api.getCurrentDate());
// When making a change in the competence of a worker you have the identification of the worker through
// the relationship between Personnel and Personnel Competency

// gets personnel compentency (Competency (R148251) Many Personnel Competencys to One Competency relationship)
var CompetencyID =  "{!R148251#value}"; 

//gets employee number (Personnel (R148244) Many Personnel Competencys to One Personnel)
var employeeNo = rbv_api.getRelatedFields("R148244","{!id}", "Employee_Number");

rbv_api.println ("employeeNo " + employeeNo[0]);

// gets Employee Code from API_Personnel
var employeeID = rbv_api.selectQuery("SELECT id FROM API_Personnel WHERE name#value='" + employeeNo[0] + "'", 1);

rbv_api.println ("longitud " + employeeID.length);

if (employeeID.length > 0){
    arr["Competency_Code"]                          = CompetencyID;
    arr["name"]                                     = "{!name#value}";
    arr["Date_Transfer"]                            = ActualDate;
    arr["Expiration_Date"]                          = new Date("{!Expiration_Date_F}");
    arr["Operation"]                                = "U";
    arr["Sent"]                                     = "True";
    arr["Competency_Start_Date"] =  new Date("{!Start_Date}");

    rbv_api.println ("arr[Competency_Code] " + arr["Competency_Code"]);
    rbv_api.println ("arr[name] " + arr["name"]);
    rbv_api.println ("arr[Date_Transfer] " + arr["Date_Transfer"]);
    rbv_api.println ("arr[Expiration_Date] " + arr["Expiration_Date"]);
    rbv_api.println ("arr[Competency_Start_Date] " + arr["Competency_Start_Date"]);
    rbv_api.println ("arr[Operation]" + arr["Operation"]);
    rbv_api.println ("arr[Sent] " + arr["Sent"]);

    //Employee Code  is Lookup (API Personnel) R6739733 in API_Personnel_Competency 
    // checks if it matches
    var api_personnel_competency_id = rbv_api.selectQuery("SELECT id FROM API_Personnel_Competency WHERE Employee_Code_EXP= '" + employeeNo[0] + "'", 1);
    rbv_api.println ("api_personnel_competency_id " + api_personnel_competency_id.length);
    rbv_api.println ("----- " + api_personnel_competency_id[0][0]);
    rbv_api.println ("..... " + arr["Operation"]);

    if(api_personnel_competency_id.length > 0) {
        rbv_api.updateRecord("API_Personnel_Competency", api_personnel_competency_id[0][0], arr);
        rbv_api.println ("update personnel competency ");
    }

  }