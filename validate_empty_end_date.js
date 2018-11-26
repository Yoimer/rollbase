/* ------------------------------------------------------- */
/* using pure javascript, it updates immediately */
<script>
    document.getElementsByName("End_Date")[0].addEventListener("change", function() {
        if(document.getElementsByName("End_Date")[0].value == "") {
            //alert("on script"); for debugging
            document.getElementsByName("End_Date")[0].value = "01/01/2022";
        }
    });
</script>
/* ------------------------------------------------------- */


/* ------------------------------------------------------- */
//using rbf_setField with hardcoded id
//user has to load page in order to update
/* ------------------------------------------------------- */
// <script>
//     document.getElementsByName("End_Date")[0].addEventListener("change", function() {
//         if(document.getElementsByName("End_Date")[0].value == "") {
//             //alert("on script"); for debugging
//             rbf_setField("Location_Control", 4665029, "End_Date", "01/01/2023", false);
//         }
//     });
// </script>
/* ------------------------------------------------------- */


/* ------------------------------------------------------- */
//using rbf_updateRecord with hardcoded id
//user has to load page in order to update
/* ------------------------------------------------------- */
// <script>
//     document.getElementsByName("End_Date")[0].addEventListener("change", function() {
//         if(document.getElementsByName("End_Date")[0].value == "") {
//             //alert("on script"); for debugging
//             rbf_updateRecord("Location_Control", 4665029, {"End_Date":"01/01/2024"}, false);
//         }
//     });
// </script>
/* ------------------------------------------------------- */