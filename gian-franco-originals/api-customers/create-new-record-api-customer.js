var arr = new Array();

var customerName =  "{!name#value}";

var customerId = rbv_api.selectQuery("SELECT id FROM API_Customer WHERE name#value= '"+customerName+"'",1);

arr["Client_Address"]    = "{!streetAddr1#value}";
arr["Client_Address1"]   = "{!streetAddr2#value}";
arr["Client_Email"]      = "{!email}";
arr["Client_Name"]       = "{!Customer_Name#value}";
arr["name"]              = "{!name}";

if (rbv_api.isUpdate()){
  
  rbv_api.println("Customer Update");
  
  if (customerId.length > 0){
    
    rbv_api.updateRecord("API_Customer",customerId[0][0], arr);
  }
    
}else{
  
  rbv_api.println("Customer Create");
  
  rbv_api.createRecord("API_Customer", arr);
  
}