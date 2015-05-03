
function getMyPosition(){
        $("#googleMap").append("<img class='loading' src='loading.gif'>")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $('.googleMap').append("<p>Geolocation is not supported by this browser.</p>");
        }

    function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log("latitude: " + latitude + " Longitude: " + longitude);
        displayMap(latitude, longitude);
    }
}

function displayMap(latitude, longitude) {
    $("#googleMap").empty();
    var myCenter = new google.maps.LatLng( latitude, longitude);

        var mapProp = {
            center: myCenter,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var marker = new google.maps.Marker({position: myCenter});

        marker.setMap(map);

        var infowindow = new google.maps.InfoWindow({content: "You Are Here"});
        infowindow.open(map, marker);
    $('.coord').append("<b>Latitude:</b> " + latitude + " <b>Longitude:</b> " + longitude);
}



$(document).ready(function(){

    $(".getLocation").on('click', '.getLocate', function(){
        getMyPosition();
    });

});