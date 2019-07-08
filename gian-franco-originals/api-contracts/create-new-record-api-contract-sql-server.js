var arr = new Array();

var ActualDate = new Date(rbv_api.getCurrentDate());

var customerName = "{!Customer_Name}";

// Moster INC = Customer Name

// checks customer name in dim_ApiCustomer_t as clientname_
// if length is > 0 , records exists in db
var customerName_validated = rbv_api.selectQuery("SELECT clientcode_ FROM dim_ApiCustomer_t WHERE clientname_#value='" + customerName + "'", 1);

if (customerName_validated.length > 0) {
    rbv_api.println("----- " + customerName_validated.length)
}