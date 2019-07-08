var arr = new Array();

var ActualDate = new Date(rbv_api.getCurrentDate());

var customerName = "{!Customer_Name}";

// Moster INC = Customer Name

// checks customer name in dim_ApiCustomer_t as clientname_
// if length is > 0 , records exists in db
var customerName_validated = rbv_api.selectQuery("SELECT clientcode_ FROM dim_ApiCustomer_t WHERE clientname_#value='" + customerName + "'", 1);

if (customerName_validated.length > 0) {
    rbv_api.println("----- " + customerName_validated.length);

    arr["name"] = "{!name#value}";
    arr["clientcode_"] = customerName_validated[0][0];
    rbv_api.println("clientcode_: " + arr["clientcode_"]);
    arr["contractcode_"] = "{!Contract_ID_No_Hyperlink}";
    arr["contractdescr_"] = "{!Description}";
    arr["contractname_"] = "{!Contract_Name}";
    arr["datetransfer_"] = ActualDate;
    arr["id_"] = "{!id}";
    arr["operation_"] = "I";
    arr["sent_"] = "True";
    arr["validfrom_"] = new Date("{!Starting_Date}");
    arr["validto_"] = new Date("{!Expiration_Date}");
    rbv_api.println("create contract");
    rbv_api.createRecord("dim_APIContracts_t", arr);

} else {
    return "Customer does not exist in SQL server DB. Please add it first";
}