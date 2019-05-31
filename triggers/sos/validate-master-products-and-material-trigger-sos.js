// check if the master exists in any Product and Material or Service. If it exists, then it can not be deleted and it gives the corresponding error
var MasterName = "{!name#text}";

var existsMProdMat = rbv_api.selectQuery("SELECT id FROM Service_Related_Product WHERE Master_Product_and_Material_No_Hyperlink = '" + MasterName + "'", 999);


// Validate Product and Material
if (existsMProdMat.length > 0) return MasterName + " has " + existsMProdMat.length + " Master Products and Materials attached";


// //Validate Service

// //gets how many services exists in DB
var existsMProdMatFromService = rbv_api.getRelatedIds("R2157860", '{!id}');
rbv_api.println("existsMProdMatFromService " + existsMProdMatFromService.length);

// if there are any services, gets its Master MDE from it and parses it
    for (var i = 0; i < existsMProdMatFromService.length; ++i) {

    rbv_api.println("ID: " + existsMProdMatFromService[i]);

    // gets Master Product and Material from Service
    MasterProdMatFromService = rbv_api.selectQuery("SELECT Master_Product_and_Material_No_Hyperlink FROM Service where id=" + existsMProdMatFromService[i], 999);

    // prints Master Master Product and Material from Service Length
    rbv_api.println("MasterProdMatFromService Length: " + MasterProdMatFromService.length);

    for (var j = 0; j < MasterProdMatFromService.length; ++j) {

        // prints Master Master Product and Material from Service
        rbv_api.println("Master Master Product and Material from Service: " + MasterProdMatFromService[i][j]);

        // saves each master Product and Material from service in a 1x1 array, it comes in a comma separated format
        var EachMasterProdMatFromService = MasterProdMatFromService[i][j].split(", ");

        // this prints all each master Product and Material from service individually

        // for(var w = 0; w < EachMasterMDEFromService.length; ++w) {
        // rbv_api.println("EachMasterMDEFromService: " + EachMasterMDEFromService[w]);
        // }

        // checks if any of the master mde from service matches with MasterName
        // if it does, returns: MasterName+" has "+ existsMasterMDEFromService.length + " Services attached";

        for (var w = 0; w < EachMasterProdMatFromService.length; ++w) {
            if (EachMasterProdMatFromService[w] == MasterName) {
                return MasterName + " has " + existsMProdMatFromService.length + " Services attached";
            }
        }
    }
}