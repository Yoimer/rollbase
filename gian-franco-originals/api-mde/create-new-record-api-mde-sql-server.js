var arr = new Array();
var mdeName = "{!name#value}";
var mdeId = rbv_api.selectQuery("SELECT mdecode_ FROM dim_ApiMde_t WHERE mdecode_= '" + mdeName + "'", 1);
//var mdeId = 1;
arr["mdedescr_"] = "{!Description}";
arr["name"] = "{!name#value}";
var ActualDate = new Date(rbv_api.getCurrentDate());
arr["datetransfer_"] = ActualDate;
arr["sent_"] = "True";
arr["nextcalibdate_"] = "{!Expiration_Date}";
arr["mdecode_"]=mdeName;

// if updates record
if (rbv_api.isUpdate()) {
    if (mdeId.length > 0) {
        arr["operation_"] = "U";
        rbv_api.updateRecord("dim_ApiMde_t", mdeId[0][0], arr);
    }

// if creates record
} else if (rbv_api.isCreate()){
    arr["operation_"] = "I";
    rbv_api.createRecord("dim_ApiMde_t", arr);
}