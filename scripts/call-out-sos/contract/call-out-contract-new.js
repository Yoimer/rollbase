<script>
/*-------------------------------------------------------------------------------------------------- 
As soon as user selects contract, LongView shows all the information for it. 

NOTE: This script uses HTML Components as fictitious fields for contract information.
-------------------------------------------------------------------------------------------------- */
customOnPageRender(function() {

    // shows related from contract information.
    function getsFromContractInformation(objName, objId, values)
    {
        
        $("#ContractName").val(values["Contract_Name"]);
        $("#ContractType").val(values["Contract_Type_READ_ONLY"]);
        $("#StartingDate").val(values["Starting_Date"]);
        $("#ExpirationDate").val(values["Expiration_Date"]);
        $("#ShortDescription").val(values["Short_Description"]);
    }

    function processcontractInfo()
    {
        var id = $("#R122614").val(); // contract Relationship Name.
        if (id == null) {
            $("#R122614").val('');
            $("#ContractName").val('');
            $("#ContractType").val('');
            $("#StartingDate").val('');
            $("#ExpirationDate").val('');
            $("#ShortDescription").val('');
        }
        else {
            rbf_getFields("Contract",id,"Contract_Name,Contract_Type_READ_ONLY,Starting_Date,Expiration_Date,Short_Description", getsFromContractInformation);
        }
    }

    $("#R122614").change(processcontractInfo);
    if($("#R122614").val() !== "") processcontractInfo();
});
</script>