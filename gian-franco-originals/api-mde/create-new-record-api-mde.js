var arr = new Array();

var mdeName = "{!name#value}";

var mdeId = rbv_api.selectQuery("SELECT id FROM API_MDE WHERE name#value= '" + mdeName + "'", 1);

arr["name"] = "{!name#value}";
arr["Short_Description"] = "{!Description}";

if (rbv_api.isUpdate()) {

    if (mdeId.length > 0) {
        rbv_api.updateRecord("API_MDE", mdeId[0][0], arr);
    }

} else {

    rbv_api.createRecord("API_MDE", arr);
}