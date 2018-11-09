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
<!-- tablesiezer -->
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
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>Departure Date</th><th>Vehicle Number</th></tr></thead><tbody>
 <tr><td>{!Departure_date}</td><td>{!Vehicule_Plate}</td></tr>
</tbody></table>
