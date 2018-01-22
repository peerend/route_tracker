// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
    
    var getUserLocation = function(){
        var geoLocationOpts = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
          if (navigator.geolocation){
            return navigator.geolocation.getCurrentPosition(positionFound, locationError, geoLocationOpts)        
          } else {
            alert('browser not supported');
          }
    
          function positionFound(position){
              // if the user has no position, check where they are now and use that for the home address
              if (!$("#user_home_lat").val()){
                $("#user_home_lat").val(position.coords.latitude);
              }
              if (!$("#user_home_lon").val()){
                $("#user_home_lon").val(position.coords.longitude);
              }
          }
    
          function locationError(){
              console.log(error.message);
          }
    }
    getUserLocation();

    var getDestinationLocation = function(){
        // here's where we'd add the geocoder to auto fill the destination lat and lon
    }
})