var arr = new Array();

arr["Start_Date"] = new Date("{!Start_Date}");

// delivery date
arr["Estimated_Delivery_Date"] = new Date("{!Estimated_Delivery_Date#text}");

//customer Contact
arr["Customer_Contact"] = "{!Customer_Contact#text}";

// call out description
arr["Call_Out_Description"] = "{!Call_Out_Description#text}";

// contact details
arr["Contact_Details"] = "{!Contact_Details}";

// well type
arr["Well_Type"] = "{!Well_Type#text}";

// work description
arr["Work_Description"] = "{!Work_Description#text}";

// project title
arr["Project_title"] = "{!Project_title#text}";

// approver
arr["Approver"] = "{!Approver_no_hyperlink}";

// afe number
arr["AFE_Number"] = "{!AFE_Number#text}";

// po number
arr["PO_Number"] = "{!PO_Number#text}";

// field
arr["Field"] = "{!Field#text}";

//RIG_Hoist_Unit
arr["RIG_Hoist_Unit"] = "{!RIG_Hoist_Unit#text}";

// approve
arr["Approve"] ="True";

// create record
rbv_api.createRecord("Call_Out", arr);