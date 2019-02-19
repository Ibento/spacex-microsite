

var upcomingLaunchesContainer = document.getElementById('upcomingLaunchesContainer');
var pastLaunchesContainer = document.getElementById('pastLaunchesContainer');

var futureLaunchesRendered = 0;
var pastLaunchesRendered  = 0;

loadUpcoming = function () {
    
    // Get JSOn and populate launches
    getJSON("https://api.spacexdata.com/v3/launches/upcoming").then( function(launches) {
        
        var launchOffset = futureLaunchesRendered + 5;

        if (futureLaunchesRendered >= 5) {
            var elem = document.getElementById('loadmorebutton');
            elem.parentNode.removeChild(elem);
        }

        while (futureLaunchesRendered < launchOffset) {
            populateLaunch(launches[futureLaunchesRendered], upcomingLaunchesContainer);
            futureLaunchesRendered = futureLaunchesRendered + 1;
        
        }

        // LOAD MORE BUTTON
        var readMoreContainerDiv = document.createElement('div');
        readMoreContainerDiv.className = "readmore_container";
        readMoreContainerDiv.innerHTML = "<button class='readmore darker' id='loadmorebutton'>LOAD MORE</button>";
        upcomingLaunchesContainer.append(readMoreContainerDiv);

        var loadMoreButton = document.getElementById('loadmorebutton');
        loadMoreButton.addEventListener('click', loadUpcoming);



    }).catch(function(err) {
        console.log("Error getting JSON for upcoming launches: "+err.message);      
    });

}




loadPast = function () {
    
    // Get JSOn and populate launches
    getJSON("https://api.spacexdata.com/v3/launches/past").then(function(launches) {
       
        var reversedLaunches = launches.reverse();

        var launchOffset = pastLaunchesRendered + 5;

        if (pastLaunchesRendered >= 5) {
            var elem = document.getElementById('loadmorebutton_past');
            elem.parentNode.removeChild(elem);
        }

        while (pastLaunchesRendered < launchOffset) {
            populateLaunch(reversedLaunches[pastLaunchesRendered], pastLaunchesContainer);
            pastLaunchesRendered = pastLaunchesRendered + 1;
        
        }


        // LOAD MORE BUTTON
        var readMoreContainerDiv = document.createElement('div');
        readMoreContainerDiv.className = "readmore_container";
        readMoreContainerDiv.innerHTML = "<button class='readmore darker' id='loadmorebutton_past'>LOAD MORE</button>";
        pastLaunchesContainer.append(readMoreContainerDiv);

        var loadMoreButton = document.getElementById('loadmorebutton_past');
        loadMoreButton.addEventListener('click', loadPast);


    }).catch(function(err) {
        console.log("Error getting JSON for upcoming launches: " +err.message);      
    });

}


// Load JSON data and populate HTML when all JSON is loaded
loadData(loadUpcoming);
loadData(loadPast);

