// check if the master exists in any Equipment, Service or Manteneince Plan. If it exists, then it can not be deleted and it gives the corresponding error
var MasterName = "{!name#text}";

var existsEquipment = rbv_api.selectQuery("SELECT id FROM Equipment1 WHERE Master_Equipment_Code_RF='" + MasterName + "'", 999);

var existsMPEquipment = rbv_api.selectQuery("SELECT status#value FROM Maintenance_Plan1 WHERE (status#value != 'Created - Need Review' AND Master_Equipment_Read_Only='" + MasterName + "')",999);

rbv_api.println("existsMPEquipment.length " + existsMPEquipment.length);

// Validate Equipment
rbv_api.println("existsEquipment.length: " + existsEquipment.length);
if (existsEquipment.length > 0) return MasterName + " has " + existsEquipment.length + " Equipments attached";


//Validate Service

//gets how many services exists in DB
var existsMasterEquipmentFromService = rbv_api.getRelatedIds("R2157839", '{!id}');
rbv_api.println("existsMasterEquipmentFromService  "+ existsMasterEquipmentFromService.length);

// if there are any services, gets its Master Equipment from it and parses it
for (var i = 0; i < existsMasterEquipmentFromService.length; ++i) {

    rbv_api.println("ID: " + existsMasterEquipmentFromService[i]);

    // gets Master Equipment from Service
    MasterEquipmentFromService = rbv_api.selectQuery("SELECT Master_Equipment_No_Hyperlink FROM Service where id=" + existsMasterEquipmentFromService[i],999);

    // prints Master Equipment from Service Length
    rbv_api.println("MasterEquipmentFromService Length: "+ MasterEquipmentFromService.length);

    for (var j = 0; j < MasterEquipmentFromService.length; ++j) {

        // prints Master Equipment from Service
        rbv_api.println("Master Equipment from Service: " + MasterEquipmentFromService[i][j]);

        // saves each master Equipment from service in a 1x1 array, it comes in a comma separated format
        var EachMasterEquipmentFromService = MasterEquipmentFromService[i][j].split(", ");

        // this prints all each master Equipment from service individually

        // for(var w = 0; w < EachMasterEquipmentFromService.length; ++w) {
        //    rbv_api.println("EachMasterEquipmentFromService: " + EachMasterEquipmentFromService[w]);
        // }

        // checks if any of the master Equipment from service matches with MasterName
        // if it does, returns: MasterName+" has "+ existsMasterEquipmentFromService.length +  " Services attached";

        for(var w = 0; w < EachMasterEquipmentFromService.length; ++w) {
            if(EachMasterEquipmentFromService[w] == MasterName) {
                return MasterName + " has "+ existsMasterEquipmentFromService.length + " Services attached";
            }
        }
    }
}

// Validate Maintenance Plan
if ( existsMPEquipment.length > 0 ) return MasterName+" has "+ existsMPEquipment.length +  " Maintenance Plan attached";