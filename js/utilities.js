
/* Utilities */

function formatDate(date) {
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
}



function formatDatePanel(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];


  var day = date.getUTCDate();
  var monthIndex = date.getUTCMonth();
  var year = date.getFullYear();

  return '<span> (' + day + '. ' + monthNames[monthIndex] + ' ' + year + ")</span>";
}


// adding some periods to launch  price
function numberWithPeriods(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}



function toggleInfo(currentButton) {
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
    }
}





window.addEventListener('scroll', scrollFunction);
var upButton = document.getElementById('upButton');
upButton.addEventListener('click', toTheTop);

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("upButton").style.display = "block";
  } else {
    document.getElementById("upButton").style.display = "none";
  }
}

// When user clicks on the button, scroll to the top of the document
function toTheTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
