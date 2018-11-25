<!--Validación si es SOP-->
<script>
  
/*  Deshabilitada 04 de Diciembre de 2017 en reunion con Luis Castillo, resultado de reunion con Javier, Rosendo, WIlliam
  
customOnPageRender(function () {
  
  var Type=$("#rbi_F_Type").children("span").children(".k-dropdown-wrap").children(".k-input").text();
    
  
  function changedInput(){
  
  var Type=$("#rbi_F_Type").children("span").children(".k-dropdown-wrap").children(".k-input").text();
   
    if (Type == "SOP"){
      rbf_setFieldDisabled("R1479504", true);//costumer
       rbf_setFieldDisabled("R1479515", true);//contract
      rbf_setFieldDisabled("R1479526", true);//service
      
    }else{
      rbf_setFieldDisabled("R1479504", false);
      rbf_setFieldDisabled("R1479515", false);
      rbf_setFieldDisabled("R1479526", false);
      
    }
 
    
} 
  
  $("#rbi_F_Type").change(changedInput);
  
  

  });
*/


    /* ----------------------------------------------------------------------------------------------------------- *
     * As soon as user selects the Customer, Contract and Service, LongView shows all the information for it.      *
     *                                                                                                             *
     * NOTE: This script uses HTML Components as fictitious fields for Customer, Contract and Service information. *
     * ----------------------------------------------------------------------------------------------------------- */
    customOnPageRender(function() {

        // Shows related Customer information.
        function getsCustInformation(objName, objId, values)
        {
            $("#CustComp").val(values["Customer_Name"]);   // Fills fictitious field "Cust. Company".
        }


        // Contract's selectQuery Service function.
        function getsContractInformation(values)
        {
            var contName = values[0][0];
            var contType = values[0][1];


            // Fills fictitious field "contrName" with the Contract Name's value.
            $("#contrName").val(contName);

            // Fills fictitious field "contrType" with the Contract Type's value.
            $("#contrType").val(contType);
        }


        // Service's selectQuery Service function.
        function getsServiceInformation(values)
        {
            var servDescr = values[0][0];


            // Fills fictitious field "servDesc" with the Service description's value.
            $("#servDesc").val(servDescr);
        }


        /* ------------------------------------------------------------ *
         * This function process (triggers) the Customer's information. *
         * ------------------------------------------------------------ */
        function processCustInfo()
        {
            var id = $("#R1479504").val();    // Document - Customer Relationship Name.


            if (id == null)
            {
                $("#R1479504").val('');
                $("#CustComp").val('');
            }
            else
            {
                rbf_getFields("LongviewCustomer",id,"Customer_Name", getsCustInformation);
            }
        }


        /* ------------------------------------------------------------ *
         * This function process (triggers) the Contract's information. *
         * ------------------------------------------------------------ */
        function processContInfo()
        {
            var id2 = $("#R1479515").val();   // Document - Contract Relationship Name.


            if(id2 == null)
            {
                $("#R1479515").val('');
                $("#contrName").val('');
                $("#contrType").val('');
            }
            else
            {
                rbf_selectQuery("SELECT Contract_Name#value, Contract_Type_READ_ONLY#value FROM Contract WHERE ID ="+id2, 99, getsContractInformation);
            }
        }


        /* ----------------------------------------------------------- *
         * This function process (triggers) the Service's information. *
         * ----------------------------------------------------------- */
        function processServInfo()
        {
            var id3 = $("#R1479526").val();   // Document - Service Relationship Name.


            if(id3 == null)
            {
                $("#R1479526").val('');
                $("#servDesc").val('');
            }
            else
            {
                rbf_selectQuery("SELECT Description#value FROM Service WHERE ID ="+id3, 99, getsServiceInformation);
            }
        }


        // If there is a change on field Customer (related) then calls processCustInfo.
        $("#R1479504").change(processCustInfo);

        // If change on field Contract (related) then calls processContInfo.
        $("#R1479515").change(processContInfo);

        // If change on field Service (related) then calls processServInfo.
        $("#R1479526").change(processServInfo);


        if($("#R1479504").val() !== "") processCustInfo();

        if($("#R1479515").val() !== "") processContInfo();

        if($("#R1479526").val() !== "") processServInfo();
    });
</script>