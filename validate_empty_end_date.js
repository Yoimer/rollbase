/* validates when changing*/
<script>
    document.getElementsByName("End_Date")[0].addEventListener("change", function() {
        if(document.getElementsByName("End_Date")[0].value == "") {
            //alert("on script"); for debugging
            document.getElementsByName("End_Date")[0].value = "12/31/2049";
            document.getElementsByClassName('end_date')[0].style.display = "block";
        } else {
            document.getElementsByClassName('end_date')[0].style.display = "none";
        }
    });
</script>

/* validates when page loading*/
<script>
    if(document.getElementsByName("End_Date")[0].value == "12/31/2049") {
        document.getElementsByClassName('end_date')[0].style.display = "block";
    } else {
        document.getElementsByClassName('end_date')[0].style.display = "none";
    }
</script>