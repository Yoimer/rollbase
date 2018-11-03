<script>
    customOnPageRender(function() {

        function processFromGpsInfo()
        {

            console.log("On processFromGpsInfo!!!");
            // if Gps_coordinates text input field is NOT empty
            // if($("#Gps_coordinates").val() !== "") {
                if(document.getElementById("Gps_coordinates").value !== "") {
                //shows google class
                document.getElementsByClassName('google')[0].style.display = "block";
                // var GpsFrom = $("#Gps_coordinates").val();
                var GpsFrom = document.getElementById("Gps_coordinates").value;
                let googlemap = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + GpsFrom + '&zoom=12'
                // sets link as href
                document.querySelector('#the-link').setAttribute('href', googlemap);
            // if Gps_coordinates text input field is empty
            }else {
                // hides google class
                document.getElementsByClassName('google')[0].style.display = "none";
            }

        }

        // go to processFromGpsInfo when any change in Gps_coordinates text input field
        document.getElementById("Gps_coordinates").addEventListener("change",processFromGpsInfo);
        document.getElementById("Gps_coordinates").addEventListener("keyup",processFromGpsInfo);

        // show coordinates on link when loading page
        // var GpsFrom = $("#Gps_coordinates").val();
        var GpsFrom = document.getElementById("Gps_coordinates").value;
        //shows google class
        document.getElementsByClassName('google')[0].style.display = "block";
        // builds google map string with gps coordinates
        let googlemap = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + GpsFrom + '&zoom=12'
        // sets link as href
        document.querySelector('#the-link').setAttribute('href', googlemap);
    });
</script>