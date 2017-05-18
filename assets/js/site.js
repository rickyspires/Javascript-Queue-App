window.onbeforeunload = function() {
    return "Warning !!! If you leave this page you will loose your data.";
}

function validate(){

    $('#queForm').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply a title'
                    }
                }
            },
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
            last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            }, 
            org_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply a title'
                    }
                }
            },
        },
        submitHandler: function(validator, form, submitButton ) {

            var numInList = 0;

            /* get radio buton */
            var radioBtns = document.getElementsByClassName("radioBtn");
            for(var i = 0; i < radioBtns.length; i++){
                if(radioBtns[i].checked){
                  var radio = radioBtns[i].value; 
                }
            }

            /* get options buton */
            var typeBtns = document.getElementsByClassName("typeOption");
            for(var j = 0; j < typeBtns.length; j++){
                if(typeBtns[j].checked){
                  var type = typeBtns[j].value; 
                }
            }

            var numtr = document.getElementsByTagName('tr').length+0;
            var title = document.getElementById("title").value;
            var fname = document.getElementById("first_name").value;
            var lname = document.getElementById("last_name").value;
            var orgname = document.getElementById("orgname").value;

            /* create an delete button element */
            var statusBtn = document.createElement('input');
            statusBtn.setAttribute('type', 'button');
            statusBtn.setAttribute('id', numtr);
            statusBtn.setAttribute('class', 'btn btn-danger statusBtn');
            statusBtn.setAttribute('onclick','complete(this.id);'); // for FF
            statusBtn.onclick = function() {complete(this.id);}; // for IE
            statusBtn.setAttribute('value', 'Waiting');

            /* create table */
            var table=document.getElementById('queList').getElementsByTagName('tbody')[0];

            var row=table.insertRow(0);
            var cell1=row.insertCell(0); //id
            var cell2=row.insertCell(1); //organisation  
            var cell3=row.insertCell(2); //radio - type
            var cell4=row.insertCell(3); //date
            var cell5=row.insertCell(4); //button

            cell1.style.width = "1%";
            cell2.style.width = "59%";
            cell3.style.width = "15%";
            cell4.style.width = "15%";
            cell5.style.width = "10%";

            cell1.innerHTML=numtr;
            cell2.innerHTML=orgname + " " + title + " " + fname + " " + lname;  
            cell3.innerHTML=radio + "<br>" + type;     
            cell4.innerHTML = getDateTime(); 
            cell5.appendChild(statusBtn); 
            
            /* number in list */
            document.getElementById('numInList').innerHTML = numtr;   

            /* reset form */
            $('#queForm').bootstrapValidator("resetForm",true); 

        },
    })
    .on('success.form.bv', function(e) {

        $('#queForm').data('bootstrapValidator').resetForm();

    });

}

/* change status */
function complete(id){
    $("#" + id).attr("disabled", true);
    $("#" + id).attr("value","Seen");
    $("#" + id).attr('class', 'btn btn-success');
    $("#" + id).closest('tr').addClass('seen').insertAfter("tbody tr:last");
}

function deleterow(){
    $("#queList tbody tr").remove(); 
}

function getDateTime(){
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second;
}

$(document).ready(function() {

    //GET JSON RADIO BUTTONS
    $.getJSON('assets/data/data.json', function(data) {
        
        //CREATE FORM FROM JSON
        var optionRadio="";
        for (var value in data.options) {
            optionRadio+="<input class='radioBtn' type='radio' name='option' value='" + data.options[value].option + "' " + data.options[value].checked + "/> " + data.options[value].option + "<br>";
        }
        document.getElementById("optionsList").innerHTML=optionRadio;

        $('#create_form input:radio[name=ctype]:checked').val() || '';

    });

    //HIDE AND SHOW FORM
    $("#citizenInputs").addClass("show");
    $("#organisationInputs").addClass("hide");
    $("#organisationInputs").addClass("hide");

    $('.typeBtn').on('click', function() {
        if ($(this).hasClass("citizen")) {
            $("#citizenInputs").removeClass("hide").addClass("show");
            $("#organisationInputs").removeClass("show").addClass("hide");
            $("#anonymousInputs").removeClass("show").addClass("hide");
            validate("citizen");
        }
        else if ($(this).hasClass("organisation")) {
            $("#citizenInputs").removeClass("show").addClass("hide");
            $("#organisationInputs").removeClass("hide").addClass("show");
            $("#anonymousInputs").removeClass("show").addClass("hide");
            validate("organisation");
        }
        else if ($(this).hasClass("anonymous")) {
            $("#citizenInputs").removeClass("show").addClass("hide");
            $("#organisationInputs").removeClass("show").addClass("hide");
            $("#anonymousInputs").removeClass("show").addClass("hide");
            validate("anonymous");
        }
    });

});

$("#" + id)