class User {
  constructor(name, surname, dateOfBirth, sex) {
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.age = dateToAge(dateOfBirth);
    this.sex = sex;
  }
}

$(document).ready(function() {
  $("#ulozit").click(function(event) {
    var meno = $("#meno").val();
    if (meno.trim().length < 2) {
      $("#errmeno").html("Nesprávny tvar mena!");
    }

    var priezvisko = $("#priezvisko").val();
    if (priezvisko.trim().length < 2) {
      $("#errpriezvisko").html("Nesprávny tvar priezviska!");
    }
    var dob = new Date($("#date").val());
  });

  $("#meno").keyup(function(event) {
    var meno = $("#meno").val();
    if (meno.trim().length > 1) {
      $("#errmeno").html("");
    }
  });

  $("#priezvisko").keyup(function(event) {
    var priezvisko = $("#priezvisko").val();
    if (priezvisko.trim().length > 1) {
      $("#errpriezvisko").html("");
    }
  });

});

var model = [];
function insertNewUser() {
  var user = new User(
    $("#meno").val(),
    $("#priezvisko").val(),
    $("#date").val(),
    $("input[name = \"pohlavie\"]:checked").val()
  );
  model.push(user);
}

class Filter {
  constructor(property, value) {
    this.property = property;
    this.value = value;
  }
}

var filter = null;
function updateTable() {
  var table = $("#listTable2");
  table.empty();

  for (var i = 0; i  < model.length; i++) {
    if (filter && model[i][filter.property] == filter.value) {
      continue;
    }
    var tr = $("<tr></tr>");
    tr.append("<td>" + model[i].name + "</td>");
    tr.append("<td>" + model[i].surname + "</td>");
    if (showAge){
      tr.append("<td>" + model[i].age + "</td>");
    }
    else {
      tr.append("<td>" + model[i].dateOfBirth + "</td>");
    }
    tr.append("<td>" + model[i].sex + "</td>");
    tr.append("<button onclick=\"myDeleteTable(this)\" class=\"btn btn-danger\">X</button>");
    table.append(tr);
  }
  document.getElementById("mojjsf").reset();
};

function addToTable() {
  insertNewUser();
  updateTable();
}

function myDeleteTable() {
  document.getElementById("listTable2").deleteRow(this);
};

var showAge = false;
$(document).ready(function() {
  $("#calculate").click(function() {
    showAge = !showAge;
    updateTable();
  });
});

function dateToAge(mdate) {
  var yearThen = parseInt(mdate.substring(0, 4), 10);
  var monthThen = parseInt(mdate.substring(5, 7), 10);
  var dayThen = parseInt(mdate.substring(8, 10), 10);

  var today = new Date();
  var birthday = new Date(yearThen, monthThen - 1, dayThen);

  var differenceInMilisecond = today.valueOf() - birthday.valueOf();

  var year_age = Math.floor(differenceInMilisecond / 31536000000);
  var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);

  var month_age = Math.floor(day_age / 30);

  day_age = day_age % 30;

  if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) {
    return "Error!";
  } else {
    return year_age;
  }
};



$(document).ready(function($) {

    $('#mySelector').change( function(){
      switch ($(this).val()) {
        case "m":
          filter = new Filter("sex", "Žena");
          break;
        case "z":
          filter = new Filter("sex", "Muž");
          break;
        default:
          filter = null;
      }
      updateTable();
    });
});


function storeData() {
  if (localStorage) {
    $(document).ready(function() {
      $(".save").click(function() {

        var meno = $("#meno").val();
        var priezvisko = $("#priezvisko").val();
        var dob = $("#date").val();
        var pohlavie = document.querySelector('input[name = "pohlavie"]:checked').value;

        // Store data
        localStorage.setItem("meno", meno);
        localStorage.setItem("priezvisko", priezvisko);
        localStorage.setItem("date", dob);
        localStorage.setItem("pohlavie", pohlavie);
        console.log("Your first name is saved.");
      });
      $(".access").click(function() {
        // Retrieve data
        console.log(localStorage.getItem("meno"), localStorage.getItem("priezvisko"), localStorage.getItem("date"), localStorage.getItem("pohlavie"));
      });
    });
  } else {
    console.log("Sorry, your browser do not support local storage.");
  }
};
