<script>
/* -------------------------------------------------------------------------------------------------- 
As soon as user selects customer, LongView shows all the information for it. 

NOTE: This script uses HTML Components as fictitious fields for Customer information.
-------------------------------------------------------------------------------------------------- */
customOnPageRender(function() {

    // shows information from customer object
    function getsFromCustomerInformation(objName, objId, values)
    { 
        $("#CompanyName").val(values["Customer_Name"]);
        $("#PhoneNumber").val(values["phone"]);
        $("#ContactEmail").val(values["email"]);
        $("#ContactName").val(values["Contact_Name"]);
    }

    function processcustomerInfo()
    {
        console.log("on processcustomerInfo!!! ");
        var id = $("#R122034").val(); // customer Relationship Name.
        if (id == null) {
            $("#R122034").val('');
            $("#CompanyName").val('');
            $("#PhoneNumber").val('');
            $("#ContactEmail").val('');
            $("#ContactName").val('');
        }
        else {
            rbf_getFields("LongviewCustomer",id,"Customer_Name,phone,email,Contact_Name", getsFromCustomerInformation);
        }
    }

    // if there is any change on customer field, and customer field is not empty, go to processcustomerInfo
    $("#R122034").change(processcustomerInfo);

    // this line retrieves what comes from db when editing
    if($("#R122034").val() !== "") processcustomerInfo();
});
</script>