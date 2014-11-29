/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

// updated 11/28/14 3:50PM

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
            var occupationOther = document.getElementsByName("occupationOther")[0];
            occupationOther.style.display = "block";
            occupationOther.className = "form-control";
        } else {
            document.getElementsByName("occupationOther")[0].style.display = "none";
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
        var formIsValid = checkFieldWithRegExp(form.elements['firstName'], new RegExp("^[a-zA-Z]")) && formIsValid;
        formIsValid = checkFieldWithRegExp(form.elements['lastName'], new RegExp("^[a-zA-Z]")) && formIsValid;
        formIsValid = checkFieldWithRegExp(form.elements['address1'], new RegExp("^[a-zA-Z0-9]")) && formIsValid;
        formIsValid = checkFieldWithRegExp(form.elements['city'], new RegExp("^[a-zA-Z]")) && formIsValid;
        formIsValid = validateBirthday() && formIsValid;
        formIsValid = checkFieldWithRegExp(form.elements['state'], new RegExp("^[a-zA-Z]")) && formIsValid;
        formIsValid = checkFieldWithRegExp(form.elements['zip'], new RegExp("^\\d{5}$")) && formIsValid;
        formIsValid = validateOccupation() && formIsValid;
        if (!formIsValid && evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = formIsValid;
        return formIsValid;
    });
    form.elements['firstName'].addEventListener('change', checkFieldWithRegExp(form.elements['firstName'],
        new RegExp("^[a-zA-Z]")));
    form.elements['lastName'].addEventListener('change', checkFieldWithRegExp(form.elements['lastName'],
        new RegExp("^[a-zA-Z]")));
    form.elements['address1'].addEventListener('change', checkFieldWithRegExp(form.elements['address1'],
        new RegExp("^[a-zA-Z0-9]")));
    form.elements['city'].addEventListener('change', checkFieldWithRegExp(form.elements['city'],
        new RegExp("^[a-zA-Z]")));
    form.elements['state'].addEventListener('change', checkFieldWithRegExp(form.elements['state'],
        new RegExp("^[a-zA-Z]")));
    form.elements['occupation'].addEventListener('change', validateOccupation);
    form.elements['occupationOther'].addEventListener('change', validateOccupationOther);
    form.elements['birthdate'].addEventListener('change', validateBirthday);
    form.elements['zip'].addEventListener('change', checkFieldWithRegExp(form.elements['address1'],
        new RegExp("^\\d{5}$")));
    for (var i = 0; i < form.elements.length; i++) {
        form.elements[i].className = "form-control";
    }
});

function validateOccupation() {
    var occupationField = document.getElementById("signup").elements['occupation'];
    if (occupationField.value == '') {
        occupationField.className = "form-control invalid-field";
        return false;
    } else {
        occupationField.className = "form-control";
        return true;
    }
}

function validateOccupationOther() {
    var occupationField = document.getElementById("signup").elements['occupation'];
    var occupationOtherField = document.getElementById("signup").elements['occupationOther'];
    if (occupationField.value == "other" && occupationOtherField.value == "") {
        occupationOtherField.className = "form-control invalid-field";
        return false;
    } else {
        occupationOtherField.className = "form-control";
        return true;
    }
}

function validateBirthday() {
    var birthday = moment(document.getElementById('signup').elements["birthdate"].value);
    var currentMoment = moment();
    if (!birthday.isValid() || birthday.isAfter(currentMoment)) {
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

function checkFieldWithRegExp(field, regEx) {
    if (!regEx.test(field.value)) {
        field.className = "form-control invalid-field";
        return false;
    } else {
        field.className = "form-control";
        return true;
    }
}