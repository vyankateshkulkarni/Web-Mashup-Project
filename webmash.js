var username = "vyankateshkulkarni";
var request = new XMLHttpRequest();
var xml;
var temperature = 20;
var windSpeed = 08;
var clouds = "scattered";

  function initializeMap() {
var myLatLng = {lat: 32.75, lng: -97.13};
	    var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 17
        });
        var marker = new google.maps.Marker({
          position: map.getCenter(),
          draggable: true,
          map: map
        });
        
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        
        map.addListener('click', function(event) {
          var latitude=event.latLng.lat();
          var longitude=event.latLng.lng();
         sendRequest(latitude,longitude);
         geocodeLatLng(geocoder, map, infowindow,latitude,longitude, marker);
        });

}
  function geocodeLatLng(geocoder, map, infowindow,latitude,longitude,marker) {
        
        var latlng = {lat: latitude, lng: longitude};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(11);
              marker.setPosition(latlng);
             var history = results[1].formatted_address;
             var weather = " Temperature:"+temperature +" Wind Speed:"+windSpeed + " Clouds:"+clouds;
             infowindow.setContent(history + weather.bold());
             document.getElementById("history").innerHTML= document.getElementById("history").innerHTML + history + weather + " " ;
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    }
function displayResult () {
    if (request.readyState == 4) {
        xml = request.responseXML.documentElement;
        temperature = xml.getElementsByTagName("temperature")[0].childNodes[0].nodeValue;
        clouds = xml.getElementsByTagName("clouds")[0].childNodes[0].nodeValue;
        windSpeed = xml.getElementsByTagName("windSpeed")[0].childNodes[0].nodeValue;
    }
}
function sendRequest (latitude,longitude) {
    request.onreadystatechange = displayResult;   
    request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+latitude+"&lng="+longitude+"&username="+username);
    request.send();
}
function clearhistory()
{
    document.getElementById("history").innerHTML = "";
}