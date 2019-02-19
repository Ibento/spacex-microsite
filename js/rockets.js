

var rocketsContainer = document.getElementById('rocketsContainer');

loadRockets = function () {
    
    // Get JSOn and populate launches
    getJSON("https://api.spacexdata.com/v3/rockets").then( function(rockets) {
        

        for (let i = 0;i < rockets.length; i++) {
            populateRockets(rockets[i], rocketsContainer);        
        }



    }).catch(function(err) {
        console.log("Error getting JSON for rockets: "+err.message);      
    });

}




// Load JSON data and populate HTML when all JSON is loaded
loadData(loadRockets);

