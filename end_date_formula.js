// This formula updates eveytime an user create or updates an entry on OPM Personnel
// 12/31/2049 is a hardcoded value, when user sets an empty date when creating
// or udating, the End Date formula shows a bolded red message
// with Open until 12/31/2049

if ('{!End_Date#text}' === '12/31/2049') {
    return '<div><p style="color:red"><strong>Open until' +  ' 12/31/2049 ' + '</strong></p></div>'; 
  }else { 
        return '{!End_Date#text}';
    
  }