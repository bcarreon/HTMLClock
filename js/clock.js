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

getTemp();

getTime();