<script>
    customOnPageRender(function() {

        function processFromGpsInfo()
        {

            console.log("On processFromGpsInfo!!!");
            // if Gps_coordinates text input field is NOT empty
            if($("#Gps_coordinates").val() !== "") {
                //shows google class
                document.getElementsByClassName('google')[0].style.display = "block";
            // if Gps_coordinates text input field is empty
            }else {
                // hides google class
                document.getElementsByClassName('google')[0].style.display = "none";
            }

        }
 
        // when there is any change on Gps_coordinates text input field, go to processFromGpsInfo
        $("#Gps_coordinates").keyup(processFromGpsInfo);
    });
</script>
