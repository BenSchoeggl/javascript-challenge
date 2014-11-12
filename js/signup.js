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
        var valid = validateFields();
        if (!valid && evt.preventDefault()) {
            evt.preventDefault();
        }
        evt.returnValue = valid;
        return valid;
    });
});

function validateFields() {
    var form = document.getElementById("signup");
    var formIsGood = true;
    //figures out if the basic text input fields are ok
    formIsGood = (checkTextFields([form.elements['firstName'], form.elements['lastName'], form.elements['city']],
        new RegExp("^[a-zA-Z]")) && formIsGood);
    formIsGood = ((checkTextFields([form.elements['address1'], form.elements['address2']], new RegExp("^[a-zA-z0-9]")))
        && formIsGood);
    //figures out if the selectors are ok
    formIsGood = (checkSelectors() && formIsGood);
    // figures out if the zip code is ok
    formIsGood =  (checkZip() && formIsGood);
    // figures out if the birthday is ok
    if (form.elements["birthdate"].value === "") {
        formIsGood = false;
        form.elements["birthdate"].className = "form-control invalid-field";
    }
    formIsGood = (checkBirthday() && formIsGood);
    return formIsGood;
}

function checkTextFields(fields, regExp) {
    var formIsGood = true;
    for (var i = 0; i < fields.length; i++) {
        if (!regEx.test(fields[i].value)) {
            fields[i].className = "form-control invalid-field";
            formIsGood = false;
        } else {
            fields[i].className = "form-control";
        }
    }
    return formIsGood;
}

function checkSelectors() {
    var formIsGood = true;
    var regEx = new RegExp("^[a-zA-z0-9]");
    if (!(regEx.exec(form["occupationOther"].value) || form.elements["occupation"].value !== "other")) {
        form['occupationOther'].className = "form-control invalid-field";
        formIsGood = false
    }
    var selectors = [form.elements['state'], form.elements['occupation']];
    for (var i = 0; i < selectors.length; i++) {
        if (selectors[i].value === "") {
            selectors[i].className = "form-control invalid-field";
            formIsGood = false;
        } else {
            selectors[i].className = "form-control";
        }
    }
    return formIsGood;
}

function checkZip() {
    var formIsGood = true;
    var zipRegEx = new RegExp("^\d{5}$");
    if (zipRegEx.exec(form.elements['zip'].value)) {
        form.elements["zip"].className = "form-control invalid-field";
        formIsGood = false;
    } else {
        form.elements["zip"].className = "form-control";
    }
    return formIsGood;
}

function checkBirthday() {
    var formIsGood = true;
    if (moment.isValid(form.elements["birthdate"].value)) {
        formIsGood = false;
        form.elements["birthdate"].className = "form-control invalid-field";
    } else {
        var birthday = moment(form.elements['birthdate'].value);
        var cutOff = moment().subtract(13, 'years');
        if (birthday.isAfter(cutOff)) {
            formIsGood = false;
            form.elements["birthdate"].className = "form-control invalid-field";
        } else {
            form.elements["birthdate"].className = "form-control";
        }
    }
    return formIsGood;
}