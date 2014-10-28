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
        var valid = validateFields();
        if (!valid && evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = valid;
        return valid;
    });
});

function validateFields() {
    var form = document.getElementById("signup");
    var simpleFields = [form.elements['firstName'], form.elements['lastName'], form.elements['address1'], form.elements['city']];
    var regEx = new RegExp("^[a-zA-Z0-9]");
    var formIsGood = true;
    //figures out if the basic text input fields are ok
    for (var i = 0; i < simpleFields.length; i++) {
        if (!regEx.test(simpleFields[i].value)) {
            simpleFields[i].className = "form-control invalid-field";
            formIsGood = false;
        } else {
            simpleFields[i].className = "form-control";

        }
    }
    //figures out if the selectors are ok
    if (!(regEx.exec(form["occupationOther"].value) || form.elements["occupation"].value !== "other")) {
        form['occupationOther'].className = "form-control invalid-field";
        formIsGood = false
    }
    var selectors = [form.elements['state'], form.elements['occupation']];
    for (i = 0; i < selectors.length; i++) {
        if (selectors[i].value === "") {
            selectors[i].className = "form-control invalid-field";
            formIsGood = false;
        } else {
            selectors[i].className = "form-control";
        }
    }
    // figures out if the zip code is ok
    var zipRegEx = new RegExp("^\d{5}$");
    if (zipRegEx.exec(form.elements['zip'].value)) {
        form.elements["zip"].className = "form-control invalid-field";
        formIsGood = false;
    } else {
        form.elements["zip"].className = "form-control";
    }
    // figures out if the birthday is ok
    if (form.elements["birthdate"].value === "") {
        formIsGood = false;
        form.elements["birthdate"].className = "form-control invalid-field";
    }
    var birthday = new Date(form.elements["birthdate"].value);
    var current = new Date();
    if ((current.getFullYear() - birthday.getUTCFullYear()) < 13) {
        formIsGood = false;
        form.elements["birthdate"].className = "form-control invalid-field";
        document.getElementById("birthdateMessage").innerHTML = "Must be 13 or older to submit.";
        form.elements["birthdate"].className = "form-control invalid-field";
    } else if (current.getFullYear() === birthday.getUTCFullYear() && 
        current.getMonth() > birthday.getUTCMonth()) {
            formIsGood = false;
            form.elements["birthdate"].className = "form-control invalid-field";
            document.getElementById("birthdateMessage").innerHTML = "Must be 13 or older to submit.";
            form.elements["birthdate"].className = "form-control invalid-field";
    } else if ((current.getFullYear() === birthday.getUTCFullYear()) && 
        (current.getMonth() === birthday.getUTCMonth()) && 
        (current.getDay() > birthday.getUTCDay())) {
            formIsGood = false;
            form.elements["birthdate"].className = "form-control invalid-field";
            document.getElementById("birthdateMessage").innerHTML = "Must be 13 or older to submit.";
            form.elements["birthdate"].className = "form-control invalid-field";

    } else if (formIsGood) {
        form.elements["birthdate"].className = "form-control";
    }
    return formIsGood;
}