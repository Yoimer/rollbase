// check if the master exists in any MDE, Service or Manteneince Plan. If it exists, then it can not be deleted and it gives the corresponding error

var MasterName = "{!name#text}";

var existsMDE       = rbv_api.selectQuery("SELECT id  FROM   MDE  WHERE Master_MDE_No_Hyperlink = '"+MasterName+"'",999);
//var existsServMDE = rbv_api.selectQuery("SELECT id, Master_MDE_No_Hyperlink FROM Service",999);
var existsMPMDE     = rbv_api.selectQuery("SELECT id  FROM  Maintenance_Plan WHERE Master_MDE_No_Hyperlink = '"+MasterName+"'",999);

// Validate MDE
////if ( existsMDE.length > 0 ) return MasterName+" has "+ existsMDE.length +  " MDEs attached";


//Validate Service

var existsServMDE = rbv_api.getRelatedIds("R2157847", '{!id}');               
rbv_api.println("existsServMDE  "+ existsServMDE.length);
for (var i = 0; i < arr.length; ++i) {

    ServMDE=rbv_api.selectQuery("SELECT Master_MDE_No_Hyperlink FROM Service where id=" + existsServMDE[i],999);
                                
    for (var j = 0; j < ServMDE.length; ++j) {
      

                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
for (var i=0; i<existsServMDE.length; i++) { 
  rbv_api.println("existsServMDE[i]" + existsServMDE[i]);
      
      existsServMDE = rbv_api.selectQuery("SELECT id, Master_MDE_No_Hyperlink FROM Service",999);
        for (var i=0; i<existsServMDE.length; i++) { 
} 


/*if (existsServMDE.length >0) { 
  
   for (var i = 0; i < existsServMDE.length; i++){
     
    rbv_api.println("existsServMDE  "+ existsServMDE[0][1]);     
        var servMDE = existsServMDE[i][1].split(", ");
     
     
        for (var j = 0; j < servMDE.length; j++){ 
          
        if ( servMDE[j] == MasterName ) { 
            return MasterName+" has "+ existsServMDE.length +  " Services attached";
            } 
        }
   }
}*/




// Validate Maintenance Plan
if ( existsMPMDE.length > 0 ) return MasterName+" has "+ existsMPMDE.length +  " Maintenance Plan attached";