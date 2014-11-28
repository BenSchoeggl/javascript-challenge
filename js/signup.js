/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById("signup");
    var stateSelector = form.elements['state'];
    for (var i = 0; i < usStates.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = usStates[i].name;
        stateSelector.appendChild(option);
    }
    var occupationSelector = document.getElementById("occupation");
    occupationSelector.addEventListener("change", function() {
        if (occupationSelector.value === "other") {
            document.getElementsByName("occupationOther")[0].style.display = "block";
        } else {
            document.getElementsByName("occupationOther")[0].style.display = "none";
            document.getElementsByName("occupationOther")[0].text = "";
        }
    });
    document.getElementById("cancelButton").addEventListener("click", function() {
        var modal = $("#confirmModal");
        modal.modal('show');
        document.getElementById("modalConfirm").addEventListener('click', function() {
            modal.modal('hide');
            window.location = "http://google.com";
        });
    });
    form.addEventListener('submit', function(evt) {
        var formIsValid = validateFirstName();
        formIsValid = validateLastName() && formIsValid;
        formIsValid = validateAddressLine1() && formIsValid;
        formIsValid = validateCity() && formIsValid;
        formIsValid = validateBirthday() && formIsValid;
        formIsValid = validateZIPCode() && formIsValid;
        formIsValid = validateState() && formIsValid;
        formIsValid = validateOccupation() && formIsValid;
        console.log(formIsValid);
        if (!formIsValid && evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = formIsValid;
        return formIsValid;
    });
    form.elements['firstName'].addEventListener('change', validateFirstName);
    form.elements['lastName'].addEventListener('change', validateLastName);
    form.elements['address1'].addEventListener('change', validateAddressLine1);
    form.elements['city'].addEventListener('change', validateCity);
    form.elements['state'].addEventListener('change', validateState);
    form.elements['occupation'].addEventListener('change', validateOccupation);
    form.elements['birthdate'].addEventListener('change', validateFirstName);
    form.elements['zip'].addEventListener('change', validateZIPCode);
});

function validateFirstName() {
    console.log("validateFirsttName ran");
    return checkFieldWithRegExp(document.getElementById("signup").elements['firstName'], new RegExp("^[a-zA-Z]"));
}

function validateLastName() {
    console.log("validateLastName ran");
    return checkFieldWithRegExp(document.getElementById("signup").elements['lastName'], new RegExp("^[a-zA-Z]"));
}

function validateAddressLine1() {
    console.log("validateAddress ran");
    return checkFieldWithRegExp(document.getElementById("signup").elements['address1'], new RegExp("^[a-zA-Z0-9]"));
}

function validateCity() {
    console.log("validateCity ran");
    return checkFieldWithRegExp(document.getElementById("signup").elements['city'], new RegExp("^[a-zA-Z]"));
}

function validateState() {
    console.log("validateState ran");
    return checkFieldWithRegExp(document.getElementById("signup").elements['state'], new RegExp("."));
}

function validateOccupation() {
    console.log("validateOccupation ran");
    var occupationField = document.getElementById("signup").elements['occupation'];
    var regExForOccupation = new RegExp(".");
    var formIsGood = checkFieldWithRegExp(occupationField, regExForOccupation);
    if (formIsGood && occupationField.value == 'other') {
        formIsGood = formIsGood && checkFieldWithRegExp(document.getElementById('signup').elements['occupationOther'],
            regExForOccupation);
    }
    return formIsGood;
}

function validateZIPCode() {
    console.log("validateZIP ran");
    return checkFieldWithRegExp(document.getElementById("signup").elements['zip'], new RegExp("^\d{5}$"));
}

function validateBirthday() {
    var birthday = moment(document.getElementById('signup').elements["birthdate"].value);
    var currentMoment = moment();
    if (!birthday.isValid() || birthday.isAfter(currentMoment)) {
        console.log("invalid date");
        document.getElementById("birthdate").className = "form-control invalid-field";
        document.getElementById("birthdateMessage").innerHTML = "Please enter a valid Date";
        return false;
    } else {
        var earliestAllowedBirthday = moment().subtract(13, 'years');
        if (birthday.isAfter(earliestAllowedBirthday)) {
            document.getElementById("birthdate").className = "form-control invalid-field";
            document.getElementById("birthdateMessage").innerHTML = "Must be 13 or older to submit.";
            birthdateField.className = "form-control invalid-field";
            return false;
        } else {
            document.getElementById("birthdate").className = "form-control";
            document.getElementById("birthdateMessage").innerHTML = "";
            return true;
        }
    }
}

function blackFunction() {
    
}

function checkFieldWithRegExp(field, regEx) {
    if (!regEx.test(field.value)) {
        field.className = "form-control invalid-field";
        return false;
    } else {
        field.className = "form-control";
        return true;
    }
}

//Comment so I can commit localBranch