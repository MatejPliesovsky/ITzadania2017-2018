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
  var pohlavie = row.insertCell(3);
  var row5 = row.insertCell(4);

  meno.innerHTML = $("#meno").val();
  priezvisko.innerHTML = $("#priezvisko").val();
  dob.innerHTML = $("#date").val() + '<span id="exact_age">Age</span>';
  pohlavie.innerHTML = document.querySelector('input[name = "pohlavie"]:checked').value;
  row5.innerHTML = '<button onclick="myDeleteTable(this)" class="btn btn-danger">X</button>';

  document.getElementById("mojjsf").reset();
};

function myDeleteTable() {
  document.getElementById("listTable2").deleteRow(this);
};

function switcher() {
  var str = document.getElementById("calculate").innerHTML;
  var res = str.replace("date", "exact_age");
  document.getElementById("calculate").innerHTML = res;
}

$(document).ready(function() {
  $("#calculate").click(function() {
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
      $("#exact_age").text("Error!");
    } else {
      $("#exact_age").html("<div id=\"age\">" + year_age + "</div> ");
    }
  });
});

function storeData(meno,priezvisko,date,pohlavie) {
    if (typeof (localStorage) == 'undefined') {
        console.log('Nepodporovane lokalne ulozisko.');
    } else {
        try {
            localStorage.setItem('boxik', JSON.stringify({
                meno: meno,
                priezvisko: priezvisko,
                date: date,
                pohlavie: pohlavie,
            }));
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                console.log('Quota exceeded!');
            }
        }
    }
};
