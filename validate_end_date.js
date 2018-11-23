var startDate  = new Date('{!Start_Date}');
var endDate  = new Date('{!End_Date}');
var today= new Date();

if(startDate > endDate){
  
  return "Warning: 'Start date' can't be greater than 'End Date'. Please, check the 'Start Date' Field or 'End Field'";
  
}else if( today > endDate) {
  
  return "Warning: 'End date' can't be less or equal to today. Please, check the 'End Field'";
}
  

return null;