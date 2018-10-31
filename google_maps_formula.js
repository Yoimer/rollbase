var GpsFrom = '{!Gps_Coordinate#text}'; //takes values from Gps_Coordinate in data base
var googlemap = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + GpsFrom + '&zoom=12';
//return '<div><a  href="'+ googlemap +'" target="_blank">Here</a></div>';

//return '<font style="color:#00f;"<div><a href="'+ googlemap +'" target="_blank">Here</a></font></div>';

return 'Click <font style="color:#00f;"<div><a href="'+ googlemap +'" target="_blank">Here</a></font></div>';