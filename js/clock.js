function getTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
    setTimeout(function(){ getTime() }, 1000);
}

function checkTime(i) {
    if (i<10) {
        i = "0" + i;
    }
    return i;
}

function getTemp() {
    $.getJSON("https://api.forecast.io/forecast/9f663b2cbd5459e18e6b1b4542d7418f/35.300399,-120.662362?callback=?", setForecast);
}

function setForecast(data) {
    $("#forecastLabel").html(data.daily.summary);
    $("#forecastIcon").attr("src", "images/" + data.currently.icon + ".png");

    var array = data.daily.data;
    var tempMax = array[0].temperatureMax;

    for (var i = 1; i < array.length; i++) {
        if (tempMax < array[i].temperatureMax)
            tempMax = array[i].temperatureMax;
    }

    if (tempMax < 60)
        $("body").addClass("cold");

    if (tempMax >= 60)
        $("body").addClass("chilly");

    if (tempMax >= 70)
        $("body").addClass("nice");

    if (tempMax >= 80)
        $("body").addClass("warm");

    if (tempMax >= 90)
        $("body").addClass("hot");
}

function showAlarmPopup() {
    $("#mask").removeClass("hide");
    $("#popup").removeClass("hide");
}

function hideAlarmPopup() {
    $("#mask").addClass("hide");
    $("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName, id) {
    var divElement = $("<div id =\"" + id + "\"></div>");
    var divName = $("<div></div>");
    var divTime = $("<div></div>");
    var deleteAlarm = $("<input>");

    deleteAlarm.addClass("button");
    deleteAlarm.attr("type", "button");
    deleteAlarm.attr("value", "Delete Alarm");
    deleteAlarm.attr("onclick", "deleteAlarm(\""+ id + "\")")

    divElement.addClass("flexable");
    divName.addClass("name").html(alarmName);
    divTime.addClass("time").html(hours + ":" + mins + " " + ampm);

    divElement.append(divName);
    divElement.append(divTime);
    divElement.append(deleteAlarm);

    $("#alarms").append(divElement);
}

function addAlarm() {
    var hours = $("#hours option:selected").text();
    var mins = $("#mins option:selected").text();
    var ampm = $("#ampm option:selected").text();
    var alarmName = $("#alarmName").val();

    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();

    alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName}, {
        success: function(object) {
            insertAlarm(hours, mins, ampm, alarmName, object.id);
            hideAlarmPopup();
        }
    });
}

function deleteAlarm(id) {
    $("#" + id).remove();

    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new Parse.Query(AlarmObject);

    alarmObject.get(id, {
        success: function(myObject) {
            myObject.destroy({});
        }
    })
}



function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    console.log('Signed In!');
  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}

getTemp();

getTime();