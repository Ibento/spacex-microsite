/* HOME JAVASCRIPT FILE */

var launchContainer = document.getElementById('launchContainer');

// Load next upcoming launch
loadNext = function () {
    // Get JSOn and populate launches

    getJSON("https://api.spacexdata.com/v3/launches/next").then(function(launch) {

      
        populateLaunch(launch, launchContainer);

        // Go to all launches button
        var readMoreContainerDiv = document.createElement('div');
        readMoreContainerDiv.className = "readmore_container";
        readMoreContainerDiv.innerHTML = "<a href='launches.html'><span class='readmore darker'>GO TO ALL LAUNCHES</span></a>";
        launchContainer.append(readMoreContainerDiv);

        
    }).catch(function(err) {
        console.log("Error getting JSON for next launch: "+err.message);      
    });
};

// Load JSON data and populate HTML when all JSON is loaded
loadData(loadNext);
