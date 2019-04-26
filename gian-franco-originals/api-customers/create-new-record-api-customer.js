var arr = new Array();

var customerName =  "{!name#value}";

var ActualDate = new Date(rbv_api.getCurrentDate());

var customerId = rbv_api.selectQuery("SELECT id FROM API_Customer1 WHERE name#value= '"+customerName+"'",1);

arr["Client_Address"]    = "{!streetAddr1#value}";
arr["Client_Address1"]   = "{!streetAddr2#value}";
arr["Client_Email"]      = "{!email}";
arr["Client_Name"]       = "{!Customer_Name#value}";
arr["name"]              = "{!name}";
arr["Date_Transfer"]     = ActualDate;
arr["Sent"]              = "True";

// if updates record
if (rbv_api.isUpdate()) {

    arr["Operation"] = "U";
    rbv_api.println("Customer Update");

    if (customerId.length > 0){
        rbv_api.updateRecord("API_Customer1",customerId[0][0], arr);
    }

//if creates records
} else if(rbv_api.isCreate()) {
    arr["Operation"] = "I";
    rbv_api.println("Customer Create");
    rbv_api.createRecord("API_Customer1", arr);
}