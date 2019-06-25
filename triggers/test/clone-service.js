// takes all the fields value from a call out when workflow status is Draft
// create new entry on call out db cloning all the previous fields

var arr = new Array();

// forces values

// adds id to name
arr["name"] = '{!id}';

// Contingency Plan
arr["R148519"] = " ";

// Disruption
arr["R2120119"] = " ";

// Risk
arr["R134107"] = " ";

// Job Service Responsable
arr["R2158045"] = " ";

// Document
arr["R1479526"] = " ";

// Attachment (Se comenta para futuro uso)
// arr["R147544"] = " ";

// clone record 
rbv_api.cloneRecord("Service", {!id}, arr);