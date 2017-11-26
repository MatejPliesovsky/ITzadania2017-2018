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

function myCreateTable() {
  var table = document.getElementById("listTable2");
  var row = table.insertRow(0);
  var meno = row.insertCell(0);
  var priezvisko = row.insertCell(1);
  var dob = row.insertCell(2);
  var ee = row.insertCell(3);
  var pohlavie = row.insertCell(4);
  var row5 = row.insertCell(5);

  meno.innerHTML = $("#meno").val();
  priezvisko.innerHTML = $("#priezvisko").val();
  dob.innerHTML = "<div class=\"birthday\">" + $("#date").val() + "</div>";
  ee.innerHTML = dateToAge();
  pohlavie.innerHTML = document.querySelector('input[name = "pohlavie"]:checked').value;
  row5.innerHTML = '<button onclick="myDeleteTable(this)" class="btn btn-danger">X</button>';

  document.getElementById("mojjsf").reset();
};

function myDeleteTable() {
  document.getElementById("listTable2").deleteRow(this);
};

$(document).ready(function() {
  $("#calculate").click(function() {
    if (calculate.checked) {
      $(".birthday").css({'display': "none"});
      $(".exage").css({'display': "block"})
    } else {
      $(".birthday").css({'display': "block"});
      $(".exage").css({'display': "none"})
    }
  })
});

function dateToAge() {
  var mdate = $("#date").val().toString();
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
    return "<div class=\"exage\" style=\"display: none\">" + year_age + "</div> ";
  }
};



$(document).ready(function($) {

    $('#mySelector').change( function(){
      var selection = $(this).val();
      $('listTable2')[selection? 'show' : 'hide']();

      if (selection) {
        $.each($('#listTable2'), function(index, item) {
          $(item)[$(item).is(':contains('+ selection  +')')? 'show' : 'hide']();
        });
      }

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
