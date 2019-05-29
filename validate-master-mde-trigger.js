// check if the master exists in any MDE, Service or Manteneince Plan. If it exists, then it can not be deleted and it gives the corresponding error

var MasterName = "{!name#text}";

var existsMDE       = rbv_api.selectQuery("SELECT id  FROM   MDE  WHERE Master_MDE_No_Hyperlink = '"+MasterName+"'",999);
//var existsMasterMDEFromService = rbv_api.selectQuery("SELECT id, Master_MDE_No_Hyperlink FROM Service",999);
var existsMPMDE     = rbv_api.selectQuery("SELECT id  FROM  Maintenance_Plan WHERE Master_MDE_No_Hyperlink = '"+MasterName+"'",999);

// Validate MDE
////if ( existsMDE.length > 0 ) return MasterName+" has "+ existsMDE.length +  " MDEs attached";


//Validate Service

//gets how many services it has
var existsMasterMDEFromService = rbv_api.getRelatedIds("R2157847", '{!id}');
rbv_api.println("existsMasterMDEFromService  "+ existsMasterMDEFromService.length);

// if there are any services, gets its Master MDE from it and parses it
for (var i = 0; i < existsMasterMDEFromService.length; ++i) {

    // prints services ids
    rbv_api.println("ID: " + existsMasterMDEFromService[i]);

    // gets Master MDE from Service
    MasterMDEFromService = rbv_api.selectQuery("SELECT Master_MDE_No_Hyperlink FROM Service where id=" + existsMasterMDEFromService[i],999);

    // prints Master MDE from Service Length
    rbv_api.println("MasterMDEFromService Length: "+ MasterMDEFromService.length);

    for (var j = 0; j < MasterMDEFromService.length; ++j) {

        // prints Master MDE from Service
        rbv_api.println("Master MDE from Service: " + MasterMDEFromService[i][j]);

        // saves each master mde from service in a 1x1 array, it comes in a comma separated format
        var EachMasterMDEFromService = MasterMDEFromService[i][j].split(", ");

        // this prints all each master mde from service individually

        // for(var w = 0; w < EachMasterMDEFromService.length; ++w) {
        //    rbv_api.println("EachMasterMDEFromService: " + EachMasterMDEFromService[w]);
        // }

        // checks if any of the master mde from service matches with MasterName
        // if it does, returns: MasterName+" has "+ existsMasterMDEFromService.length +  " Services attached";

        for(var w = 0; w < EachMasterMDEFromService.length; ++w) {
            if(EachMasterMDEFromService[w] == MasterName) {
                return MasterName + " has "+ existsMasterMDEFromService.length + " Services attached";
            }
        }

    }

}


/*for (var i=0; i<existsMasterMDEFromService.length; i++) { 
  rbv_api.println("existsMasterMDEFromService[i]" + existsMasterMDEFromService[i]);
      
      existsMasterMDEFromService = rbv_api.selectQuery("SELECT id, Master_MDE_No_Hyperlink FROM Service",999);
        for (var i=0; i<existsMasterMDEFromService.length; i++) { 
} */


/*if (existsMasterMDEFromService.length >0) { 
  
   for (var i = 0; i < existsMasterMDEFromService.length; i++){
     
    rbv_api.println("existsMasterMDEFromService  "+ existsMasterMDEFromService[0][1]);     
        var MasterMDEFromService = existsMasterMDEFromService[i][1].split(", ");
     
     
        for (var j = 0; j < MasterMDEFromService.length; j++){ 
          
        if ( MasterMDEFromService[j] == MasterName ) { 
            return MasterName+" has "+ existsMasterMDEFromService.length +  " Services attached";
            } 
        }
   }
}*/




// Validate Maintenance Plan
////if ( existsMPMDE.length > 0 ) return MasterName+" has "+ existsMPMDE.length +  " Maintenance Plan attached"; Service",999);
        for (var i=0; i<existsMasterMDEFromService.length; i++) { 
} 


/*if (existsMasterMDEFromService.length >0) { 
  
   for (var i = 0; i < existsMasterMDEFromService.length; i++){
     
    rbv_api.println("existsMasterMDEFromService  "+ existsMasterMDEFromService[0][1]);     
        var MasterMDEFromService = existsMasterMDEFromService[i][1].split(", ");
     
     
        for (var j = 0; j < MasterMDEFromService.length; j++){ 
          
        if ( MasterMDEFromService[j] == MasterName ) { 
            return MasterName+" has "+ existsMasterMDEFromService.length +  " Services attached";
            } 
        }
   }
}*/




// Validate Maintenance Plan
if ( existsMPMDE.length > 0 ) return MasterName+" has "+ existsMPMDE.length +  " Maintenance Plan attached";