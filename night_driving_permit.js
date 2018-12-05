<script>
    // every time NIGHT driving permit changes, checks if YES or NO was selected
    $("#Night_driving_permit").on("change", function() {
        let drop_down_value = document.getElementById("Night_driving_permit");
        if((drop_down_value.options[drop_down_value.selectedIndex].text) === "YES") {
            // check when Authorizing person for ND is empty
            if(document.getElementById("Authorizing_person_for_ND").value === "") {
                alert("Authorizing person for ND can not be empty, please press OK and fill this field")
            } else if (document.getElementById("Authorizing_person_for_ND").value === "NO Night Driving") {
                //alert("No driving");
                document.getElementById("Authorizing_person_for_ND").value = "";
            }
        } else if ((drop_down_value.options[drop_down_value.selectedIndex].text) === "NO") {
            //fill Authorizing person for ND field
            document.getElementById("Authorizing_person_for_ND").value = "NO Night Driving";
        }
    });
</script>


