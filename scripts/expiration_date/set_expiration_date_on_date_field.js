//var personnel={!R148244#id}, trnRequired="{!Training_Required_RF}", uniqueTrn=[],expDates=[];

var personnel = {!R148244#id},
    trnRequired = "{!Training_Required_RF}",
    uniqueTrn = [],
    expDates = [];

if (trnRequired !== "") {
    var trnPersonnel = rbv_api.selectQuery("SELECT R112474,Expiration_Date FROM Personnel_Training WHERE R112459=? AND R112474 in (" + trnRequired + ")", 999, "{!R148244#id}");

    if (trnPersonnel.length === 0) {
        return null;
    }
    for (var i = 0; i < trnPersonnel.length; i++) {

        var index = uniqueTrn.indexOf(parseInt(trnPersonnel[i][0], 10));

        if (index !== -1 && rbv_api.formatDate(trnPersonnel[i][1], 'MM/dd/yyyy') > expDates[index]) {
            expDates[index] = rbv_api.formatDate(trnPersonnel[i][1], 'MM/dd/yyyy');
        } else if (index === -1) {
            uniqueTrn.push(parseInt(trnPersonnel[i][0], 10));
            expDates.push(rbv_api.formatDate(trnPersonnel[i][1], 'MM/dd/yyyy'));
        }

    }

    rbv_api.println(uniqueTrn);
    rbv_api.println(expDates);
    var finalDate = expDates[0];
    for (var j = 0; j < expDates.length; j++) {

        if (new Date(finalDate) > new Date(expDates[j])) {

            finalDate = expDates[j];

        }
    }
    rbv_api.println("this is final day" + finalDate);

    return new Date(finalDate);
} else {
    return null;
}