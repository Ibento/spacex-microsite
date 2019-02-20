/* MAIN JAVASCRIPT FILE */

// Holder arrays for rockets, launch pads and historical events
var allRockets = [];
var allLaunchPads = [];
var allHistory = [];


// General function for gettin JSON from an URL
var get = function(url) {
  // Return a new promise
  return new Promise(function(resolve, reject) {
    // Set a XHR object and open a connection
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called on 404 error
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with status text
        reject(req.statusText);
      }
    };
  
    // Handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    };

    req.send();
  }); 
};

// Get the JSON from the SpaceX API
var getJSON = function (url) {
  return get(url).then(JSON.parse);
  
};

// Preload data with callback
var loadData = function (callback) {
  // Get JSON for all rockets
  getJSON("https://api.spacexdata.com/v3/rockets").then( function(rockets) {

    // Find the missions rocket in the rocket array
    allRockets = rockets;
    getLaunchPads(callback);

  }).catch(function(err) {

    console.log("Error getting JSON for all rockets");      
  });
};


// Preload data for historical events
var getHistory = function (callback) {
    // Get JSON for all launch sites
    getJSON("https://api.spacexdata.com/v3/history").then(function(history) {

      // Find the missions launch pad in the mySites array
      allHistory = history;

      callback();
  
    }).catch(function(err) {
      console.log("Error getting JSON for all historical events");      
    });
};

// Preload data for launch pads
var getLaunchPads = function (callback) {
  
  // Get JSON for all launch sites
  getJSON("https://api.spacexdata.com/v3/launchpads").then(function(sites) {

    // Find the missions launch pad in the mySites array
    allLaunchPads = sites;
    callback();

  }).catch(function(err) {
    console.log("Error getting JSON for all launch pads");      
  });
};

// Get history JSON and show a new historical event every 7 seconds
getHistory(function() {
  showHistoricalEvent();
  var t = setInterval(showHistoricalEvent, 7000);

});
  
// Show historical event in top bar
var showHistoricalEvent = function () {

  var randomHistoricalEvent = Math.floor(Math.random() * allHistory.length); 

  var historicalDate = new Date(allHistory[randomHistoricalEvent].event_date_utc);
  historicalDate = formatDatePanel(historicalDate);


  // Sorten long strings to max 200 chars
  var historicalDetails = allHistory[randomHistoricalEvent].details.substr(0, 200);


  var historicalEvent = document.getElementById('historicalEvent');
  var historicalEventTime = document.getElementById('time');

  historicalEvent.innerHTML = "<div><a href='" + allHistory[randomHistoricalEvent].links.article + "' target='_blank'>" + allHistory[randomHistoricalEvent].title + "</a>" + historicalDate + "</div><div>" +  historicalDetails + "</div>";

};

// Populates HTML and dynamic data in myLaunchContainer for one myLaunch
var populateLaunch = function (myLaunch, myLaunchContainer) {

  // Find rocket and launch pad for current launch with ES6 syntax
  var myRocket = allRockets.find(x => x.rocket_id === myLaunch.rocket.rocket_id);
  var myLaunchPad = allLaunchPads.find(x => x.site_id === myLaunch.launch_site.site_id);

  
  /* Create and append elements for a launch */

  // inner_block
  var contentBlockDiv = document.createElement('div');
  contentBlockDiv.className = "content_block inner_block";
  myLaunchContainer.append(contentBlockDiv);

  /* MISSION INFO BLOCK */
  
  // mission_info
  var missionInfoDiv = document.createElement('div');
  missionInfoDiv.className = "mission_info";
  contentBlockDiv.append(missionInfoDiv);

  // launch_image
  var launchImageDiv = document.createElement('div');
  launchImageDiv.className = "launch_image";
  missionInfoDiv.append(launchImageDiv);

  // image 
  var launchImage = document.createElement('img');
  launchImage.src = myLaunch.links.flickr_images[0] ? myLaunch.links.flickr_images[0]: myRocket.flickr_images[1];
  launchImage.alt = "Mission illustration image";
  launchImage.className = "launch_image";
  launchImageDiv.append(launchImage);

  // info_button
  var infoButtonDiv = document.createElement('div');
  infoButtonDiv.className = "info_button";
  launchImageDiv.append(infoButtonDiv);


  // plus button
  var plusButton = document.createElement('img');
  plusButton.src = "img/plusbutton.svg";
  plusButton.alt = "Expand / Collapse";
  plusButton.className = "plus_button";
  plusButton.id = myLaunch.flight_number;
  plusButton.addEventListener('click', toggleInfo(plusButton));
  infoButtonDiv.append(plusButton);

  // more_information 
  var moreInformationDiv = document.createElement('div');
  moreInformationDiv.innerHTML = "MORE<br> INFORMATION";
  moreInformationDiv.className = "more_information"
  infoButtonDiv.append(moreInformationDiv);
  
  // detailed_info
  var detailedInfoDiv = document.createElement('div');
  detailedInfoDiv.className = "detailed_info clearfix";
  missionInfoDiv.append(detailedInfoDiv);

  // mission_info_wrapper
  var missionInfoWrapperDiv = document.createElement('div');
  missionInfoWrapperDiv.className = "mission_info_wrapper";
  detailedInfoDiv.append(missionInfoWrapperDiv);

  // mission_name
  var missionNameDiv = document.createElement('div');
  missionNameDiv.className = "mission_name";
  missionNameDiv.innerHTML = "<div>Mission #" + myLaunch.flight_number + "</div> <div>" + myLaunch.mission_name + "</div>";
  missionInfoWrapperDiv.append(missionNameDiv);


  // Create Date object
  var launchDate = new Date(myLaunch.launch_date_utc);
  // Format Date to a nicer format
  launchDate = formatDate(launchDate);

  // mission_date
  var missionDateDiv = document.createElement('div');
  missionDateDiv.className = "mission_date";
  missionDateDiv.innerHTML = "<div>Launch Date</div>" + launchDate;
  missionInfoWrapperDiv.append(missionDateDiv);

  // details
  var detailsDiv = document.createElement('div');
  detailsDiv.className = "details";
  detailsDiv.innerHTML = myLaunch.details;
  if (myLaunch.details != null) {
    detailedInfoDiv.append(detailsDiv);
  }

  
  
  /* ROCKET INFO BLOCK */

  // rocket_block
  var rocketBlockDiv = document.createElement('div');
  rocketBlockDiv.className = "rocket_block info_block clearfix";
  rocketBlockDiv.id = "rocket_" + myLaunch.flight_number;
  contentBlockDiv.append(rocketBlockDiv);

  // rocket block heading
  var rocketBlockHeading = document.createElement('h3');
  rocketBlockHeading.innerHTML = "ROCKET TYPE <span>" + myLaunch.rocket.rocket_name + "</span>"
  rocketBlockDiv.append(rocketBlockHeading);

  // facts
  var factsDiv = document.createElement('div');
  factsDiv.className = "facts";

  factsDiv.innerHTML = 
  "<div>Engine type: <span>" + myRocket.engines.type + "</span></div>" +
  "<div>Company: <span>" + myRocket.company + "</span></div>" +
  "<div>Country: <span>" + myRocket.country + "</span></div>" +
  "<div>First Flight: <span>" + myRocket.first_flight + "</span></div>" +
  "<div>Cost per Launch: <span>$" + numberWithPeriods(myRocket.cost_per_launch) + "</span></div>" +
  "<div>Diameter: <span>meters: " + myRocket.diameter.meters + ", feet: " + myRocket.diameter.feet + "</span></div>" +
  "<div>Height: <span>meters: " + myRocket.height.meters + ", feet: " + myRocket.height.feet + "</span></div>" +
  "<div>Mass: <span>kg: " + myRocket.mass.kg + ", lb: " + myRocket.mass.lb + "</span></div>" +
  "<div>Read more at <a href='" + myRocket.wikipedia + "' target='_blank'>Wikipedia</div>";
  
  rocketBlockDiv.append(factsDiv);

  
  // details 
  var detailsDiv = document.createElement('div');
  detailsDiv.className = "description";
  detailsDiv.innerHTML = myRocket.description;
  rocketBlockDiv.append(detailsDiv);

  // rocket images div
  var rocketImagesDiv = document.createElement('div');
  rocketImagesDiv.className = "images";
  detailsDiv.append(rocketImagesDiv);



  // rocket images
  myImages = myRocket.flickr_images;

  // show first two images from flickr
  for (var i = 0;i < myImages.length; i++) {

      // Thumbnail
      var rocketThumbLink = document.createElement('a');
      rocketThumbLink.href = "#img" + i + "_" + myLaunch.flight_number;
      rocketImagesDiv.append(rocketThumbLink);

      var rocketImage = document.createElement('img');
      rocketImage.src =  myImages[i];
      rocketImage.className = "thumbnail";
      rocketThumbLink.append(rocketImage);

      // Lightbox image
      var rocketImageLink = document.createElement('a');
      rocketImageLink.href = "#_";
      rocketImageLink.className = "lightbox";
      rocketImageLink.id = "img" + i + "_" + myLaunch.flight_number;
      rocketImagesDiv.append(rocketImageLink);

      var rocketImage = document.createElement('img');
      rocketImage.src =  myImages[i];
      rocketImage.className = "thumbnail";
      rocketImageLink.append(rocketImage);

      var imageCaption = document.createElement('p');
      imageCaption.innerHTML = "Rocket: <b> "+myRocket.rocket_name + "</b>";
      rocketImageLink.append(imageCaption);


  }

    /* LAUNCH PAD INFO BLOCK */


    // Build a string with all the rockets that have been launched here
    var vehiclesLaunchedString = "";
    if (myLaunchPad.hasOwnProperty('vehicles_launched')) {
      for ( i = 0;i < myLaunchPad.vehicles_launched.length; i++)  {
        vehiclesLaunchedString += "<div>" + myLaunchPad.vehicles_launched[i] + "</div>";
      }
    }

    // launchsite_block
    var launchSiteBlockDiv = document.createElement('div');
    launchSiteBlockDiv.className = "launchsite_block info_block clearfix";
    launchSiteBlockDiv.id = "site_" + myLaunch.flight_number;
    contentBlockDiv.append(launchSiteBlockDiv);

    // launchsite block heading
    var launchSiteBlockHeading = document.createElement('h3');
    launchSiteBlockHeading.innerHTML = "LAUNCH PAD <span>" + myLaunchPad.site_name_long + "</span>"
    launchSiteBlockDiv.append(launchSiteBlockHeading);

    // facts
    var factsDiv = document.createElement('div');
    factsDiv.className = "facts";
    

    factsDiv.innerHTML = 
        "<div>Status: <span>" + myLaunchPad.status + "</span></div>" +
        "<div>Location: <span>" + myLaunchPad.location.name  + " (" + myLaunchPad.location.region + ")</span></div>" +
        "<div>Vehicles launched: <span>" + vehiclesLaunchedString + "</span></div>" +
        "<div>Attempted launches:  <span>" + myLaunchPad.attempted_launches + "</span></div>" +
        "<div>Successful launches:  <span>" + myLaunchPad.successful_launches + "</span></div>" +
        "<div>Read more at <a href='"+ myLaunchPad.wikipedia +"' target='_blank'>Wikipedia</a></div>";    
    launchSiteBlockDiv.append(factsDiv);

    // description
    var descriptionDiv = document.createElement('div');
    descriptionDiv.className = "description";
    
    descriptionDiv.innerHTML = "<p>" + myLaunchPad.details + "</p>" +
      "<div><iframe src='https://maps.google.com/maps?q=" + myLaunchPad.location.latitude + "," + myLaunchPad.location.longitude + "&hl=en&z=6&amp;output=embed' width='100%' height='300' frameborder='0' style='border:0' allowfullscreen></iframe> </div>";
    
    launchSiteBlockDiv.append(descriptionDiv);


}; // End populate_launch



// Populates HTML and dynamic data in myRocketsContainer for myRocket
var populateRockets = function (myRocket, myRocketsContainer) {

  
  // Create and append elements for a rocket


  /* ROCKET INFO BLOCK */

  // rocket_block
  var rocketBlockDiv = document.createElement('div');
  rocketBlockDiv.className = "rocket_block info_block clearfix";
  rocketBlockDiv.id = "rocket_" + myRocket.id;
  myRocketsContainer.append(rocketBlockDiv);

  // rocket block heading
  var rocketBlockHeading = document.createElement('h3');
  rocketBlockHeading.innerHTML = "ROCKET TYPE <span>" + myRocket.rocket_name + "</span>"
  rocketBlockDiv.append(rocketBlockHeading);

  // facts
  var factsDiv = document.createElement('div');
  factsDiv.className = "facts";

  factsDiv.innerHTML = 
  "<div>Engine type: <span>" + myRocket.engines.type + "</span></div>" +
  "<div>Company: <span>" + myRocket.company + "</span></div>" +
  "<div>Country: <span>" + myRocket.country + "</span></div>" +
  "<div>First Flight: <span>" + myRocket.first_flight + "</span></div>" +
  "<div>Cost per Launch: <span>$" + numberWithPeriods(myRocket.cost_per_launch) + "</span></div>" +
  "<div>Diameter: <span>meters: " + myRocket.diameter.meters + ", feet: " + myRocket.diameter.feet + "</span></div>" +
  "<div>Height: <span>meters: " + myRocket.height.meters + ", feet: " + myRocket.height.feet + "</span></div>" +
  "<div>Mass: <span>kg: " + myRocket.mass.kg + ", lb: " + myRocket.mass.lb + "</span></div>" +
  "<div>Read more at <a href='" + myRocket.wikipedia + "' target='_blank'>Wikipedia</div>";
  
  rocketBlockDiv.append(factsDiv);

  
  // details 
  var detailsDiv = document.createElement('div');
  detailsDiv.className = "description";
  detailsDiv.innerHTML = myRocket.description;
  rocketBlockDiv.append(detailsDiv);

  // rocket images div
  var rocketImagesDiv = document.createElement('div');
  rocketImagesDiv.className = "images";
  detailsDiv.append(rocketImagesDiv);



  // rocket images
  myImages = myRocket.flickr_images;

  // show first two images from flickr
  for (var i = 0;i < myImages.length; i++) {

      // Thumbnail
      var rocketThumbLink = document.createElement('a');
      rocketThumbLink.href = "#img" + i + "_" + myRocket.id;
      rocketImagesDiv.append(rocketThumbLink);

      var rocketImage = document.createElement('img');
      rocketImage.src =  myImages[i];
      rocketImage.className = "thumbnail";
      rocketThumbLink.append(rocketImage);

      // Lightbox image
      var rocketImageLink = document.createElement('a');
      rocketImageLink.href = "#_";
      rocketImageLink.className = "lightbox";
      rocketImageLink.id = "img" + i + "_" + myRocket.id;
      rocketImagesDiv.append(rocketImageLink);

      var rocketImage = document.createElement('img');
      rocketImage.src =  myImages[i];
      rocketImage.className = "thumbnail";
      rocketImageLink.append(rocketImage);

      var imageCaption = document.createElement('p');
      imageCaption.innerHTML = "Rocket: <b> "+myRocket.rocket_name + "</b>";
      rocketImageLink.append(imageCaption);


  }


}; // End populate_rocket


// Populates HTML and dynamic data in myLaunchPadContainer for myLaunchPad
var populateLaunchPad = function (myLaunchPad, myLaunchPadContainer) {

  
  // Create and append elements for a launch pad


    /* LAUNCH PAD INFO BLOCK */


    // Build a string with all the rockets that have been launched here
    var vehiclesLaunchedString = "";
    if (myLaunchPad.hasOwnProperty('vehicles_launched')) {
      for ( i = 0;i < myLaunchPad.vehicles_launched.length; i++)  {
        vehiclesLaunchedString += "<div>" + myLaunchPad.vehicles_launched[i] + "</div>";
      }
    }

    // launchsite_block
    var launchSiteBlockDiv = document.createElement('div');
    launchSiteBlockDiv.className = "launchsite_block info_block clearfix";
    launchSiteBlockDiv.id = "site_" + myLaunchPad.id;
    myLaunchPadContainer.append(launchSiteBlockDiv);

    // launchsite block heading
    var launchSiteBlockHeading = document.createElement('h3');
    launchSiteBlockHeading.innerHTML = "LAUNCH PAD <span>" + myLaunchPad.site_name_long + "</span>"
    launchSiteBlockDiv.append(launchSiteBlockHeading);

    // facts
    var factsDiv = document.createElement('div');
    factsDiv.className = "facts";
    

    factsDiv.innerHTML = 
        "<div>Status: <span>" + myLaunchPad.status + "</span></div>" +
        "<div>Location: <span>" + myLaunchPad.location.name  + " (" + myLaunchPad.location.region + ")</span></div>" +
        "<div>Vehicles launched: <span>" + vehiclesLaunchedString + "</span></div>" +
        "<div>Attempted launches:  <span>" + myLaunchPad.attempted_launches + "</span></div>" +
        "<div>Successful launches:  <span>" + myLaunchPad.successful_launches + "</span></div>" +
        "<div>Read more at <a href='"+ myLaunchPad.wikipedia +"' target='_blank'>Wikipedia</a></div>";    
    launchSiteBlockDiv.append(factsDiv);

    // description
    var descriptionDiv = document.createElement('div');
    descriptionDiv.className = "description";
    
    descriptionDiv.innerHTML = "<p>" + myLaunchPad.details + "</p>" +
      "<div><iframe src='https://maps.google.com/maps?q=" + myLaunchPad.location.latitude + "," + myLaunchPad.location.longitude + "&hl=en&z=6&amp;output=embed' width='100%' height='300' frameborder='0' style='border:0' allowfullscreen></iframe> </div>";
    
    launchSiteBlockDiv.append(descriptionDiv);




}; // End populate_launch

