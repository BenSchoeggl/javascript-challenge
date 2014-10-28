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
        evt.preventDefault();
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
    var regEx = /^[a-zA-z0-9]+$/;
    var formIsGood = true;
    for (var i = 0; i < simpleFields.length; i++) {
        console.log(simpleFields[i]);
        if (!regEx.exec(simpleFields[i].value)) {
            simpleFields[i].className = "form-control invalid-field";
            formIsGood = false;
        }
    }
    console.log("simples" + formIsGood);
    if (regEx.exec(form["occupationOther"].value) || form.elements["occupation"].value !== "other") {
        form['occupationOther'].className = "form-control invalid-field";
        formIsGood = false
    }
    var selectors = [form.elements['state'], form.elements['occupation']];
    for (i = 0; i < selectors.length; i++) {
        if (selectors[i].value !== "") {
            selectors[i].className = "form-control invalid-field";
            formIsGood = false;
        }
    }
    console.log("selectors" + formIsGood);
    regEx = /^\\d{5}$/;
    var zipCode = form.elements['zip'];
    if (regEx.exec(zipCode.value)) {
        zipCode.className = "form-control invalid-field";
        formIsGood = false;
    }
    console.log("zip" + formIsGood);
    var birthday = new Date(form.elements["birthdate"].value).getUTCDate();
    var current = new Date().getUTCDate();
    if ((current.getYear() - birthday.getYear()) < 13) {
        formIsGood = false;
        form.elements["birthday"].className = "form-control invalid-field";
        document.getElementById("birthdateMessage").innerHTML = "Must be 13 or older to submit.";
    } else if (current.getMonth() > birthday.getMonth()) {
        formIsGood = false;
        form.elements["birthday"].className = "form-control invalid-field";
        document.getElementById("birthdateMessage").innerHTML = "Must be 13 or older to submit.";
    } else if (current.getDay() > birthday.getDay()) {
        formIsGood = false;
        form.elements["birthday"].className = "form-control invalid-field";
        document.getElementById("birthdateMessage").innerHTML = "Must be 13 or older to submit.";
    }
    console.log("birthday" + formIsGood);
    return formIsGood;
}