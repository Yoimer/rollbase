var arr = new Array();

var mdeName = "{!name#value}";

var ActualDate = new Date(rbv_api.getCurrentDate());

var mdeId = rbv_api.selectQuery("SELECT id FROM API_MDE1 WHERE name#value= '" + mdeName + "'", 1);

arr["name"] = "{!name#value}";
arr["Short_Description"] = "{!Short_Description_Text}";
arr["Date_Transfer"] = ActualDate;
arr["Sent"] = "True";

// if updates record
if (rbv_api.isUpdate()) {

    if (mdeId.length > 0) {
        arr["Operation"] = "U";
        rbv_api.updateRecord("API_MDE1", mdeId[0][0], arr);
    }

// if creates record
} else if (rbv_api.isCreate()){

    arr["Operation"] = "I";
    rbv_api.createRecord("API_MDE1", arr);
}