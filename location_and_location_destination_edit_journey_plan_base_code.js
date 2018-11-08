<script src="{!#HOSTED_FILE.kl_XANj6Raip6Kzd-paSrw}">
// Hide left right arrows
</script>

<script>
  //Change New Page icons for Text
  {!#HOSTED_FILE.4BKYthbxSpCCv2vamOCc8g#text} //Notice this has te text tag
  
  //Hide Save and New Button
  {!#HOSTED_FILE.40Bb0fbGS_mLxXbKUZUfDA#text}
</script>

<script src="{!#HOSTED_FILE.qPTNhfHDRFKcFRvedTvToA}">
//Hide ALL View Page Action buttons Except: Tag, Send and Delete
</script>


<script>
  // Show Location names in Journal Plans  
/* ----------------------------------------------------------------------------------------------------------- *
     * As soon as user selects the Location LongView shows his name.      *
     *                                                                                                             *
     * NOTE: This script uses HTML Components as fictitious fields for Location, Contract and Service information. *
     * ----------------------------------------------------------------------------------------------------------- */
    customOnPageRender(function() {

        // Shows related  From Location information.
        function getsFromLocInformation(objName, objId, values)
        {
            var LocationFrom = values["Title"];
          
            console.log("Entra en la funcion de Location y Nombre de la Location es: " + LocationFrom);    
          
            $("#FromLocation").val(values["Title"]);   // Fills fictitious field "FromLocation".
          
          console.log("FromLocation es: " + FromLocation);
        }
  
        // Shows related  To Location information.
        function getsToLocInformation(objName, objId, values)
        {
            var LocationTo = values["Title"];
          
            console.log("Entra en la funcion de To Location y Nombre de la Location es: " + LocationTo);    
          
            $("#ToLocation").val(values["Title"]);   // Fills fictitious field "ToLocation".
          
          console.log("ToLocation es: " + ToLocation);
        }
  
        /* ------------------------------------------------------------ *
         * This function process (triggers) the From Location information. *
         * ------------------------------------------------------------ */
        function processFromLocInfo()
        {
            var id = $("#R3935993").val();    // Location - Journey Plans Relationship Name.


            console.log("Entra en la funcion processFromLocInfo!");


            if (id == null)
            {
                $("#R3935993").val('');
                $("#FromLocation").val('');
            }
            else
            {
              rbf_getFields("Location_new",id,"name,Title", getsFromLocInformation);
            }
        }
  
        /* ------------------------------------------------------------ *
         * This function process (triggers) the To Location information. *
         * ------------------------------------------------------------ */
        function processToLocInfo()
        {
            var id = $("#R4666334").val();    // To Location - Journey Plans Relationship Name.


            console.log("Entra en la funcion processToLocInfo!");


            if (id == null)
            {
                $("#R4666334").val('');
                $("#ToLocation").val('');
            }
            else
            {
              rbf_getFields("Location_new",id,"name,Title", getsToLocInformation);
            }
        }
  
    // If there is a change on  From Location and To Location(related) then calls processFromLocInfo or processToLocInfo .
        $("#R3935993").change(processFromLocInfo); //good

        $("#R4666334").change(processToLocInfo);
        
        if($("#R3935993").val() !== "")    processFromLocInfo();
        
        if($("#R4666334").val() !== "")    processToLocInfo();
  
    });
      

</script>