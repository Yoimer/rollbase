// #HOSTED_FILE.T8u5psk2RLOpmooT6eBOOg

// <script src="{!#HOSTED_FILE.T8u5psk2RLOpmooT6eBOOg}">
// // Hide edit Button
// </script>


var hideEditButton = function () {
    console.log('Hidding edit button manually with dangerous function runWhenReady');
    $(".rbs-marker-button-edit").remove();
};

var hiddingOptions = {
    timesFound: 2,
    timesNotFound: 20
};

runWhenReady(".rbs-marker-button-edit", 100, hideEditButton, hiddingOptions);h