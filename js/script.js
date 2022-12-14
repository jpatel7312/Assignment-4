/*
    Assignment #4
    Jay Patel
*/
    
$(function () {
    // your code here
        var lat;
        var longt;
        var accu;
        
    checkBrowerSetting();
    
    function checkBrowerSetting(){
        var geoError = function(code, message) {
            $("#locationhere").text("Please Click Allow Location to access.");
            alert("Please Click Allow on the geolocation to access the code"); 
        };
        navigator.geolocation.getCurrentPosition(userLocation, geoError);
    }

    function userLocation(position){
         lat= position.coords.latitude;
         longt= position.coords.longitude;
         accu= position.coords.accuracy;
        $("#locationhere").text("User Current Location:");
        $("#locationhere").append("Latitude :"+lat+" Longitude :"+longt+ "<br>");
        $("#locationhere").append("Accuracy: "+accu);
        checkStorage();
    }

    function checkStorage(){
            if(localStorage.getItem("Latitude:")){
                $("#locationhere").append("<h1>"+"Latitude :"+localStorage.getItem("Latitude:")+" Longitude :"+localStorage.getItem("Longitude:")+"</h1>");
                $("#locationhere").append("<h2>"+"Welcome back user"+"</h2>");                         
                var dis = calcDistanceBetweenPoints(localStorage.getItem("Latitude:"),localStorage.getItem("Longitude:"),lat,longt);
                $("#locationhere").append("<p>"+"You have travelled: "+dis+" meters."+"</p>");
                $("#locationhere").append("<p>"+"You have travelled: "+(dis/1000)+" Km."+"</p>");
            }
           else{
                $("#locationhere").append("<h2>"+"Welcome new user"+"</h2>");
                window.localStorage.setItem('Latitude:',lat);
                window.localStorage.setItem('Longitude:',longt);
            }        
        window.localStorage.setItem('Latitude:',lat);
        window.localStorage.setItem('Longitude:',longt);
    }
    

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var ??1 = toRadians(lat1);
        var ??2 = toRadians(lat2);
        var ???? = toRadians(lat2 - lat1);
        var ???? = toRadians(lon2 - lon1);

        var a = Math.sin(???? / 2) * Math.sin(???? / 2) + Math.cos(??1) * Math.cos(??2) * Math.sin(???? / 2) * Math.sin(???? / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});

