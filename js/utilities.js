/* ASORTED UTILITIES JAVASCRIPT FILE */


var formatDate = function (date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];


  var day = date.getUTCDate();
  var monthIndex = date.getUTCMonth();
  var year = date.getFullYear();

  var minutes = date.getUTCMinutes();
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  var hours = date.getUTCHours();
  hours = (hours < 10) ? "0" + hours : hours;

  return '<div>' + day + '. ' + monthNames[monthIndex] + ' ' + year + '<br>' + hours + ':' + minutes + ' (UTC)</div>';
};



var formatDatePanel = function (date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];


  var day = date.getUTCDate();
  var monthIndex = date.getUTCMonth();
  var year = date.getFullYear();

  return '<span>' + day + '. ' + monthNames[monthIndex] + ' ' + year + "</span>";
};


// adding some periods to launch  price
var numberWithPeriods = function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};



var toggleInfo = function (currentButton) {
    return function () {
        
        var rocket_info = document.getElementById("rocket_" + currentButton.id);
        var launchpad_info = document.getElementById("site_" + currentButton.id);
        

        if (currentButton.className === "plus_button") {
            currentButton.src = "img/minusbutton.svg";
            currentButton.className = "minus_button";
            rocket_info.setAttribute("style", "display:block");
            launchpad_info.setAttribute("style", "display:block");
        
            currentButton.nextSibling.innerHTML = "LESS<br>INFORMATION";
        } else {
            currentButton.src = "img/plusbutton.svg";
            currentButton.className = "plus_button";
            rocket_info.setAttribute("style", "display:none");
            launchpad_info.setAttribute("style", "display:none");
            currentButton.nextSibling.innerHTML = "MORE<br>INFORMATION";
        }

    
    };
};

// Change image element src to newSrc
var changeImage = function (element, newSrc) {
  var hoverElement = element;
  console.log(hoverElement.src);
  hoverElement.src = newSrc;
  console.log(hoverElement.src);
  
};

// get elements with hover class
var hoverElements = document.getElementsByClassName('hover');

// Change images for social links on mouse over
for (var i = 0;i < hoverElements.length; i++) {
  
    hoverElements[i].addEventListener('mouseover', function(e) {
      var mouseoverElement = e.srcElement;
      changeImage(mouseoverElement, "img/" + mouseoverElement.classList[0] + "_hover.png");
    });
}

// Change images for social links on mouse out
for (var i = 0;i < hoverElements.length; i++) {
  hoverElements[i].addEventListener('mouseout', function(e) {
    var mouseoutElement = e.srcElement;
    changeImage(mouseoutElement, "img/" + mouseoutElement.classList[0] + ".png");
  });
}

var scrollFunction = function () {

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("upButton").style.display = "block";
  } else {
    document.getElementById("upButton").style.display = "none";
  }
};

// When user clicks on the button, scroll to the top of the document
var toTheTop = function () {

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

window.addEventListener('scroll', scrollFunction);
var upButton = document.getElementById('upButton');
upButton.addEventListener('click', toTheTop);

