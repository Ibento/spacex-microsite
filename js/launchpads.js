/* LAUNCH PADS JAVASCRIPT FILE */

var launchPadsContainer = document.getElementById('launchPadsContainer');

// Load launch pads from JSON or log error message
loadLaunchPads = function () {
    
    // Get JSOn and populate launches
    getJSON("https://api.spacexdata.com/v3/launchpads").then( function(launchpads) {
        

        for (var i = 0;i < launchpads.length; i++) {
            populateLaunchPad(launchpads[i], launchPadsContainer);        
        }

    }).catch(function(err) {
        console.log("Error getting JSON for launch pads: "+err.message);      
    });

};

// Load JSON data and populate HTML when all JSON is loaded
loadData(loadLaunchPads);

