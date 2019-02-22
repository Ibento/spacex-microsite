/* CONTACT JAVASCRIPT FILE */

var submitButton = document.getElementById('submitContact');

submitButton.addEventListener('click', function(e) {
    if (validateForm()) {
        
        // submit form if all inputs are valid
        e.submit();
    }    
    else
    {   
        // prevent submit of the form if not valid
        e.preventDefault();
    }
});

var validateForm = function (e) {
    
    // Boolean that is set to false if any of the fields are invalid
    var isFormValid = true;

    // Variable holders for first name
    var fullName = document.getElementById('full_name');
    var fullNameError = document.getElementById('fullnameError');
   
    // Check if first name is valid
    if (fullName.value === '') {
        isFormValid = false;
        fullNameError.style.display = 'block';
    } else {
        fullNameError.style.display = 'none';
        isFormValid = true;
    }
  
    // Variable holders for question
    var question = document.getElementById('question');
    var questionError = document.getElementById('questionError');
    
    // Check if question  is valid
    if (question.value === '') {
        isFormValid = false;
        questionError.style.display = 'block';
        question.style.border = "1px solid red"
    } else {
        questionError.style.display = 'none';
        question.style.border = "0";
        isFormValid = true;
    }

    // Variable holders for email address
    var email = document.getElementById('email');
    var emailError = document.getElementById('emailError');
    // RegEx for email addresses
    var emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Check if email address is valid
    if (!email.value.match(emailRegEx)) {
        emailError.style.display = 'block';
        isFormValid = false;
    } else {
        emailError.style.display = 'none';
        isFormValid = true;
    }
  
    return isFormValid;
};

