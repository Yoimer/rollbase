<script>
    /* -------------------------------------------------------------------------------------------------- *
    * As soon as user selects a Equipment Location, LongView shows all the information for it.      *
    *                                                                                                    *
    * NOTE: This script uses HTML Components as fictitious fields for Customer and Contracte information.*
    * -------------------------------------------------------------------------------------------------- */
    customOnPageRender(function() {
        
        // Shows related  From Location information.
        function getsFromLocInformation(objName, objId, values)
        {
            var LocationFrom = values["Title"];
            var GpsFrom = values["Gps_coordinates"];
          
            console.log("Entra en la funcion de Location y Nombre de la Location es: " + LocationFrom + " GPS: " + GpsFrom);        
          
            $("#FromLocation").val(values["Title"]);   // Fills fictitious field "FromLocation".
            $("#FromGps").val(values["Gps_coordinates"]);   // Fills fictitious field "GpsFrom".
            console.log("FromLocation es: " + FromLocation + " GPS: " + FromGps);

            //let googlemap = 'https://www.google.com/maps/@' + GpsFrom
            //let googlemap = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + GpsFrom + '&zoom=12'
            //window.open(googlemap, '_blank');
          
            let googlemap = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + GpsFrom + '&zoom=12'
            document.querySelector('#the-link').setAttribute('href', googlemap);

        }

        /* ------------------------------------------------------------ *
         * This function process (triggers) the From Location information. *
         * ------------------------------------------------------------ */
        function processFromLocInfo()
        {
            var id = $("#R4884209").val();    // Location  Relationship Name.


            console.log("Entra en la funcion processFromLocInfo!");


            if (id == null)
            {
                $("#R4884209").val('');
                $("#FromLocation").val('');
                $("#FromGps").val('');
            }
            else
            {
              rbf_getFields("Location_new",id,"name,Title,Gps_coordinates", getsFromLocInformation);
            }
        }
 

    // If there is a change on  From Location then calls processFromLocInfo
        $("#R4884209").change(processFromLocInfo);
        if($("#R4884209").val() !== "") processFromLocInfo();
    });
</script>