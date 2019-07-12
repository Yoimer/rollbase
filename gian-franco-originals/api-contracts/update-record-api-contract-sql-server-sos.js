var arr = new Array();

var ActualDate = new Date(rbv_api.getCurrentDate());

var contractCode = "{!Contract_ID_No_Hyperlink}";

var contractCode_SQL_Server = rbv_api.selectQuery("SELECT contractcode_ FROM dim_APIContracts_t12 WHERE contractcode_ = '" + contractCode + "'", 999);

//rbv_api.println("contractCode_SQL_Server Length: " + contractCode_SQL_Server.length);

//rbv_api.println("contractCode_SQL_Server: " + contractCode_SQL_Server[0][0]);

// client code
var customerName = "{!Customer_Name}";

var clientCode_SQL_Server = rbv_api.selectQuery("SELECT clientcode_ FROM dim_ApiCustomer_t1 WHERE clientname_='" + customerName + "'", 999);

// if client and contract exists in SQL server db
if ((contractCode_SQL_Server.length > 0) && (clientCode_SQL_Server.length > 0)) {

    arr["name"] = "{!name#value}";
    arr["clientcode_"] = clientCode_SQL_Server[0][0];
    arr["contractcode_"] = "{!Contract_ID_No_Hyperlink}";
    arr["contractdescr_"] = "{!Description}";
    arr["contractname_"] = "{!Contract_Name}";
    arr["datetransfer_"] = ActualDate;
    arr["id_"] = "{!id}";
    arr["sent_"] = "True";
    arr["validfrom_"] = new Date("{!Starting_Date}");
    arr["validto_"] = new Date("{!Expiration_Date}");

    arr["operation_"] = "U";
    rbv_api.updateRecord("dim_APIContracts_t12", contractCode_SQL_Server[0][0], arr);

}