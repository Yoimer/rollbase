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
font-size :10px;
}
h5
{
font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
font-size :10px;    
}

</style>
</head>
<br>
<body>
<!-- start -->
<table style="border: 0px solid black;" width="100%" bgcolor="#7BD2F6"> 
    <tr> 
    <td width="60%" style="border: 0px solid black;"><img src="http://castillolk.com.ve/ray-oil-gas.png" width=20% ></td>
    <td  style="border: 0px solid black;"><div align=center> <b>Ray International Oil & gas<br>Daily Operational Report <br>
    <font color=red>{!Journey_plan_number_READ_ONLY}</font></b> 
    <!-- <font color=red></font></b> -->
    </div></td>
    </tr>
</table>
<br>
<div style="background:#d5d5d5;" align=center>  
<table  style="border: 0px solid black;"width = "100%"><tr><td align=center> 
<h5>Journey Plan</h5><br> 
</td></tr></table>
</div>

<!-- Journey Plan -->
<table  style="border: 0px solid black;"width = "100%">

    <!-- Departure Date/Time -->
    <tr> <td width="50%"  style="border: 0px solid black;"><table width="100%"> <tr><td width="30%">Departure Date/Time: </td> <td>{!Departure_date}</td></tr></table></td>
    </tr>

</table>
<br>


<style type="text/css">
	table.tableizer-table {
		font-size: 12px;
		border: 1px solid #CCC; 
		font-family: Arial, Helvetica, sans-serif;
	} 
	.tableizer-table td {
		padding: 4px;
		margin: 3px;
		border: 1px solid #CCC;
	}
	.tableizer-table th {
		background-color: #104E8B; 
		color: #FFF;
		font-weight: bold;
	}
</style>

<!-- Journey plan number, Journey manager, Location, From Location, Location Destination, To Location -->
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>Journey plan number</th><th>Journey manager</th><th> Location</th><th>From Location</th><th>Location Destination</th><th>To Location</th></tr></thead><tbody>
 <tr><td>{!Journey_plan_number_READ_ONLY}</td><td>{!R1187419}</td><td>{!R3935993}</td><td>{!R3935993.Description}</td><td>{!R4666334}</td><td>{!R4666334.Description}</td></tr>
</tbody></table>

<br>

<!-- Departure Date/Time, Vehicule Plate, Driver name, Driver Licence Number, Comments of Vehicle Inspection, Driver Mobile -->
<table class="tableizer-table">
<thead><tr class="tableizer-secondrow"><th>Departure Date/Time</th><th>Vehicule Plate</th><th>Driver name</th><th>Driver Licence Number</th><th>Comments of Vehicle Inspection</th><th>Driver Mobile #</th></tr></thead><tbody>
<tr><td>{!Estimated_Arrival_date}</td><td>{!Vehicule_Plate}</td><td>{!Driver_name}</td><td>{!Driver_Licence_Number}</td><td>{!Comments_of_Vehicle_Inspection}</td><td>{!Driver_Mobile__}</td></tr>
</tbody></table>