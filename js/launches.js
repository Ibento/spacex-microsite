/* LAUNCHES JAVASCRIPT FILE */

var upcomingLaunchesContainer = document.getElementById('upcomingLaunchesContainer');
var pastLaunchesContainer = document.getElementById('pastLaunchesContainer');
var searchResultsContainer = document.getElementById('searchResultsContainer');

// index offset for loading more than 5
var futureLaunchesRendered = 0;
var pastLaunchesRendered  = 0;

// container array for all launches for searching through
var allLaunches = [];



// Load next 5 upcoming launches
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

};


// Load next 5 past launches
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

};


// Preload data for launches and add event listener for search function
var loadAllLaunches = function () {
  
    // Get JSON for all launch sites
    getJSON("https://api.spacexdata.com/v3/launches").then(function(launches) {

        // Find the missions launch pad in the mySites array
        allLaunches = launches;
        
        var searchInputElement = document.getElementById('search_input');
      
        searchInputElement.addEventListener('input', function () {
           
            //  get search value from input
            var searchVal = searchInputElement.value;

            searchResultsContainer.innerHTML = "<h2>SEARCH RESULTS</h2>";

            // check if search input is something
            if (searchVal.length > 0) {

                // filter search results from allLauches array
                var searchResults =  allLaunches.filter( function(launch) {
                    return launch.mission_name.toLowerCase().indexOf(searchVal.toLowerCase()) > -1;
                });
                
                // Show results
                if (searchResults.length > 0) {
                    searchResultsContainer.style.display = 'block';
        
                    for (var i = 0; i < searchResults.length; i++) {
                        populateLaunch(searchResults[i], searchResultsContainer);
                    }
                } else {
                    // display if no search results
                    searchResultsContainer.innerHTML = "<h2>NO RESULTS</h2>";
                }
    
            } else {
                // Hide searchResultsContainer if no input
                searchResultsContainer.style.display = 'none';
            }

          
        });
    }).catch(function(err) {
        console.log("Error getting JSON for all launches");      
    });
};



// Load JSON data and populate HTML when all JSON is loaded
loadData(loadUpcoming);
loadData(loadPast);
loadData(loadAllLaunches);