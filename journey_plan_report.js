<!-- ==================================================        -->
<!-- Page Name..: Job's information Report                     -->
<!-- Application: LongView Plus                                -->
<!-- Object.....: LongView/Journey Plan                        -->
<!-- Purpose....: Template for Journey Plan information report -->
<!-- Date.......: 08/07/2018                                   -->
<!-- Programmer.: Nextwells delevopment team                   -->
<!-- ==================================================        -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Journey Plan Report {!R1671927#text} </title>
        <style>

/****************************************td and input***************************************************/
            td,input
            {
            border: 1px solid black;
            font-size :15px;
            text-align: center;
            }
/****************************************h5*************************************************************/
            h5
            {
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
            font-size :20px;
            }
/****************************************columns*************************************************************/
            .columns {
                table-layout: fixed; 
                text-align: center;
                overflow: hidden;
            }
/****************************************make_bold*************************************************************/
            .make_bold {
                font-weight:bold;
            }
/****************************************Close Journe Plan Style*************************************************************/
            table.tableizer-table {
                font-size: 12px;
                /* border: 1px solid;  */
                font-family: Arial, Helvetica, sans-serif;
            } 
            .tableizer-table td {
                padding: 4px;
                margin: 3px;
                border: 1px solid;
            }
            .tableizer-table th {
                /* background-color: #104E8B;  */
                background-color: white;
                /* color: #FFF; */
                color:black;
                font-weight: bold;
            }
            .example {
                text-align: left;                
            }
        </style>
    </head>
    <br>
    <body>
<!------------------------------------------------------------ start -------------------------------------------->
        <table style="border: 0px solid black;" width="100%" bgcolor="#7BD2F6">
            <tr>
                <td width="60%" style="border: 0px solid black;"><img src="http://castillolk.com.ve/ray-oil-gas.png" width=20% ></td>
                <td  style="border: 0px solid black;">
                    <div align=center>
                        <b>Ray International Oil & gas<br>Daily Operational Report <br>
                        <font color=red>{!Journey_plan_number_READ_ONLY}</font></b> 
                        <!-- <font color=red></font></b> -->
                    </div>
                </td>
            </tr>
        </table>
        <br>
        <div style="background:#d5d5d5;" align=center>
            <table  style="border: 0px solid black;"width = "100%">
                <tr>
                    <td align=center>
                        <h5>Journey Plan</h5>
                        <br> 
                    </td>
                </tr>
            </table>
        </div>
        <br>
<!--------------------------------------- Block 1 Table with columns class ----------------------------------->
        <!(Journey Manager - Departure Date/Time - Estimated Arrival Date/Time - Estimated Km) -->
        <table width="100%" cellspacing="0" cellpadding="0">
            <div class="columns">
                <tr class="make_bold">
                    <td>Journey Manager</td>
                    <td>Departure Date/Time</td>
                    <td>Estimated Arrival Date/Time</td>
                    <td>Estimated Km</th>
                </tr>
                <tr>
                    <td>{!R1187419}</td>
                    <td>{!Departure_date}</td>
                    <td>{!Estimated_Arrival_date}</td>
                    <td>{!Estimated_Km}</td>
                </tr>
            </div>
        </table>
        <br>
<!------------------------------------Block 2 Table with columns class ------------------------------------>
        <!(From Location - To Location - No of Passengers) -->
        <table width="100%" cellspacing="0" cellpadding="0">
            <div class="columns">
                <tr class="make_bold">
                    <td>From Location</td>
                    <td>To Location</td>
                    <td>No of Passengers</td>
                </tr>
                <tr>
                    <td>{!R3935993.Title}</td>
                    <td>{!R4666334.Title}</td>
                    <td>{!No__of_passengers}</td>
                </tr>
            </div>
        </table>
        <br>
<!-- ----------------------------------------Block 3 Table with columns class ------------------------------->
        <!(Vehicle Plate - Driver Name - Driver License Number - Driver Mobile - Company Number) -->
        <table width="100%" cellspacing="0" cellpadding="0">
            <div class="columns">
                <tr class="make_bold">
                    <td>Vehicle Plate</td>
                    <td>Driver Name</td>
                    <td>Driver License Number</td>
                    <td>Driver Mobile</td>
                    <td>Company Number</td>
                </tr>
                <tr>
                    <td>{!Vehicule_Plate}</td>
                    <td>{!Driver_name}</td>
                    <td>{!Driver_Licence_Number}</td>
                    <td>{!Driver_Mobile__}</td>
                    <td>{!Company_Number}</td>
                </tr>
            </div>
        </table>
        <br>
<!-- ----------------------------------------Block 4 Passenger ----------------------------------------------->
        Passengers
        <textarea style="overflow:hidden" rows="11" cols="73">
{!Passenger}
        </textarea>
        <br>
        <br>
<!-- ----------------------------------------Block 5 Route Description ----------------------------------------------->
        Route Description
        <textarea style="overflow:hidden" rows="11" cols="73">
{!Route_place_names}
        </textarea>
        <pd4ml:page.break>
        <br>
<!-- ----------------------------------------Close Journey Plan ------------------------------------------------------->

<!-- ----------------------------------------Journey Manager Remarks---------->
        <table class="tableizer-table">
            <thead>
                <tr class="tableizer-firstrow">
                    <th style="text-align: left;">Journey Manager Remarks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Driver Complaint: {!Driver_Complaint}</td>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Vehicle Compliant: {!Vehicle_Complaint}</td>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Other Complain: {!Other_Complaint}</td>
                <tr>
            </tbody>
        </table>
        <br>
<!-- ----------------------------------------Comment for Driver ----------------------------------------------->
        Comment for Driver
        <textarea style="overflow:hidden" rows="11" cols="73">
{!Comment_for_Driver}
        </textarea>
        <br>
<!-- ----------------------------------------Journey Plan Close -------------></br></br>
        <table class="tableizer-table">
            <thead>
                <tr class="tableizer-firstrow">
                    <th style="text-align: left;">Journey Plan - Closed</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Date/Time: {!Journey_plan_close_date}</td>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Name: {!R1671927}</td>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Signature:</td>
            </tbody>
        </table>
        <br>
<!-- ----------------------------------------Journey Manager's Detail ------------->
        <table class="tableizer-table">
            <thead>
                <tr class="tableizer-firstrow">
                    <th style="text-align: left;">Journey Manager's Detail </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Name: {!R1187419}</td>
                <tr>
                    <td style="overflow: auto; width: 650px; text-align: left;">Signature:</td>
                <tr>
            </tbody>
        </table>
    </body>
</html>