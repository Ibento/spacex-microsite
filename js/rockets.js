/* ROCKETS JAVASCRIPT FILE */

var rocketsContainer = document.getElementById('rocketsContainer');

// Load rockets from JSON or log error message
loadRockets = function () {
    
    // Get JSOn and populate launches
    getJSON("https://api.spacexdata.com/v3/rockets").then( function(rockets) {
        
        for (var i = 0;i < rockets.length; i++) {
            populateRockets(rockets[i], rocketsContainer);        
        }

    }).catch(function(err) {
        console.log("Error getting JSON for rockets: "+err.message);      
    });
};

// Load JSON data and populate HTML when all JSON is loaded
loadData(loadRockets);

