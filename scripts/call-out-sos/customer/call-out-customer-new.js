<script>
/ -------------------------------------------------------------------------------------------------- 
As soon as user selects customer, LongView shows all the information for it. 

NOTE: This script uses HTML Components as fictitious fields for Customer information.
-------------------------------------------------------------------------------------------------- /
customOnPageRender(function() {

    // Shows related From customer information.
    function getsFromCustomerInformation(objName, objId, values)
    { 
        $("#customercontact").val(values["Contact_Name"]); 
        $("#companyname").val(values["Customer_Name"]); 
    }

    function processcustomerInfo()
    {
        var id = $("#R122034").val(); // customer Relationship Name.
        if (id == null) {
            $("#R122034").val('');
        }
        else {
            rbf_getFields("LongviewCustomer",id,"Contact_Name,Customer_Name", getsFromCustomerInformation);
        }
    }

    $("#R122034").change(processcustomerInfo);
    if($("#R122034").val() !== "") processcustomerInfo();
});
</script>