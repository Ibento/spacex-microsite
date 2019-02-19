

var launchPadsContainer = document.getElementById('launchPadsContainer');

loadLaunchPads = function () {
    
    // Get JSOn and populate launches
    getJSON("https://api.spacexdata.com/v3/launchpads").then( function(launchpads) {
        

        for (let i = 0;i < launchpads.length; i++) {
            populateLaunchPad(launchpads[i], launchPadsContainer);        
        }



    }).catch(function(err) {
        console.log("Error getting JSON for launch pads: "+err.message);      
    });

}




// Load JSON data and populate HTML when all JSON is loaded
loadData(loadLaunchPads);

