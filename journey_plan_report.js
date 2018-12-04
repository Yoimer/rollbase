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
            td 
            {
            border: 1px solid black;
            font-size :15px;
            text-align: center;
            }
            h5
            {
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
            font-size :20px;
            }
            .columns {
                table-layout: fixed; 
                text-align: center;
                overflow: hidden;
            }
        </style>
    </head>
    <br>
    <body>
        <!-- start -->
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
        <!-- Block 1 Table with columns class -->
        <!(Journey Manager - Departure Date/Time - Estimated Arrival Date/Time - Estimated Km) -->
        <table width="100%" cellspacing="0" cellpadding="0">
            <div class="columns">
                <tr style="font-weight:bold">
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
        <!-- Block 2 Table with columns class -->
        <!(From Location - To Location - No of Passengers) -->
        <table width="100%" cellspacing="0" cellpadding="0">
            <div class="columns">
                <tr style="font-weight:bold">
                    <td>From Location</td>
                    <td>To Location/Time</td>
                    <td>No of Passengers</td>
                </tr>
                <tr>
                    <td>{!R3935993.Title}</td>
                    <td>{!R4666334.Title}</td>
                    <td>{!No__of_passengers}</td>
                </tr>
            </div>
        </table>
    </body>
</html>