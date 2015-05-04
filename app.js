var count;

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

//define water and park options separately so they can be easily modified
    var parkOptions = {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{visibility: 'on'}, {color: '#bdbdb9'}]
    };

// this is where to set the initial style options for the map
    var mapStyles = [
        // turn off all labels
        {
            featureType: 'all',
            elementType: 'labels',
            stylers: [{visibility: 'off'}]
        },

        //set roads to simple visibility and give them a uniform background color
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{visibility: 'simplified'}, {weight: '1'}, {color: '#525157'}]
        },
        //make the water pretty
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#bcc9d1'}]
        },
        // don't display transit
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{visibility: 'off'}]
        },
        //don't display landscape
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{visibility: 'off'}]
        },
        //don't display POI, except for parks
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{visibility: 'off'}]
        },

        //use custom park options
        parkOptions
    ];




function displayMap(latitude, longitude) {
    $("#googleMap").empty();

    var myCenter = new google.maps.LatLng( latitude, longitude);

        var mapProp = {
            center: myCenter,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyles
        };

        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var marker = new google.maps.Marker({position: myCenter});

        marker.setMap(map);

        var infowindow = new google.maps.InfoWindow({content: "You Are Here"});
        infowindow.open(map, marker);
    $('.coord').html("<b>Latitude:</b> " + latitude + " <b>Longitude:</b> " + longitude);
}

$(document).ready(function(){

    $(".getLocation").on('click', '.getLocate', function(){
        $(".radioBtns").toggleClass("hidden");
        getMyPosition();
    });

    $('.radioBtns').on('click', '#parksBtnFalse', function(){
        console.log("clicked parks button false!");
        parkOptions.stylers = [{visibility: 'off'}];
        getMyPosition();
    });

    $('.radioBtns').on('click', '#parksBtnTrue', function(){
        console.log("clicked parks button true!");
        parkOptions.stylers = [{visibility: 'on'}, {color: '#bdbdb9'}];
        getMyPosition();
    });
});