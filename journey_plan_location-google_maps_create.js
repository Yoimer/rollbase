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
            var GpsFrom = values["Gps_coordinates"];
          
            console.log("Entra en la funcion de Location y Nombre de la Location es: " + LocationFrom + " GPS: " + GpsFrom);        
          
            $("#FromLocation").val(values["Title"]);   // Fills fictitious field "FromLocation".
            $("#FromGps").val(values["Gps_coordinates"]);   // Fills fictitious field "GpsFrom".
            console.log("FromLocation es: " + FromLocation + " GPS: " + FromGps);
          
           document.getElementsByClassName('google-from-location')[0].style.display = "block";
           // builds google map string with gps coordinates
           let googlemap = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + GpsFrom + '&zoom=12'
          // sets link as href
           document.querySelector('#the-link-from-location').setAttribute('href', googlemap);

        }
  
        // Shows related  To Location information.
        function getsToLocInformation(objName, objId, values)
        {
            var LocationTo = values["Title"];
            var GpsTo = values["Gps_coordinates"];
        
            console.log("Entra en la funcion de Location y Nombre de la Location es: " + LocationTo + " GPS: " + GpsTo);
          
            $("#ToLocation").val(values["Title"]);   // Fills fictitious field "ToLocation".
            $("#ToGps").val(values["Gps_coordinates"]);   // Fills fictitious field "GpsFrom

            document.getElementsByClassName('google-to-location')[0].style.display = "block";
             // builds google map string with gps coordinates
            let googlemap = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + GpsTo + '&zoom=12'
          // sets link as href
           document.querySelector('#the-link-to-location').setAttribute('href', googlemap); 
          
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
                $("#FromGps").val('');
              
                // hides google class
                document.getElementsByClassName('google-from-location')[0].style.display = "none";
            }
            else
            {
              rbf_getFields("Location_new",id,"name,Title,Gps_coordinates", getsFromLocInformation);
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
                $("#ToGps").val('');
              
                 // hides google class to location
                document.getElementsByClassName('google-to-location')[0].style.display = "none";
            }
            else
            {
              rbf_getFields("Location_new",id,"name,Title,Gps_coordinates", getsToLocInformation);
            }
        }
  
    // If there is a change on  From Location and To Location(related) then calls processFromLocInfo or processToLocInfo .
        $("#R3935993").change(processFromLocInfo);
        $("#R4666334").change(processToLocInfo);  

          // hides google class from location
        document.getElementsByClassName('google-from-location')[0].style.display = "none";
         // hides google class to location
        document.getElementsByClassName('google-to-location')[0].style.display = "none";

    });
</script>