var arr = new Array();

var customerName =  "{!name#value}";

var ActualDate = new Date(rbv_api.getCurrentDate());

var customerId = rbv_api.selectQuery("SELECT clientcode_ FROM dim_ApiCustomer_t1 WHERE clientcode_ = '"+customerName+"'",1);
//var customerId = rbv_api.selectQuery("SELECT id_ FROM dim_customers_t1 WHERE custcode_= '"+customerName+"'",1);
//arr["id_"]                = "11";
arr["address1_"]          = "{!streetAddr1#value}";
arr["address2_"]          = "{!streetAddr2#value}";
arr["contactemail_"]      = "{!email}";
arr["clientname_"]        = "{!Customer_Name#value}";
arr["clientcode_"]          = customerName;
arr["datetransfer_"]     = ActualDate;
arr["sent_"]              = "True";

// if updates record
if (rbv_api.isUpdate()) {

    arr["operation_"] = "U";
    rbv_api.println("Customer Update");

    if (customerId.length > 0){
        rbv_api.updateRecord("dim_ApiCustomer_t1",customerId[0][0], arr);
    }

//if creates records
} else if(rbv_api.isCreate()) {
    arr["operation_"] = "I";
    rbv_api.println("Customer Create");
    rbv_api.createRecord("dim_ApiCustomer_t1", arr);
}