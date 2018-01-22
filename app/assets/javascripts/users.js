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
              // create coord object to track position
              var coordObj = {};
              // if the user has no position, check where they are now and use that for the home address
              if (!$("#user_home_lat").val()){
                $("#user_home_lat").val(position.coords.latitude);
                coordObj.lat = parseFloat(position.coords.latitude);
              } else {
                  coordObj.lat = parseFloat($("#user_home_lat").val());
              }
              if (!$("#user_home_lon").val()){
                $("#user_home_lon").val(position.coords.longitude);
                coordObj.lon = parseFloat(position.coords.longitude); 
              } else {
                  coordObj.lon = parseFloat($("#user_home_lon").val())
              }
              // I should probably validate the coord object ¯\_(ツ)_/¯
              coordObj.zoom = 10;
              drawMap(coordObj)
              
          }

          function drawMap(myCoords){
            var map = new ol.Map({
              target: 'my_edit_map',
              layers: [
                new ol.layer.Tile({
                  source: new ol.source.OSM()
                })
              ],
              view: new ol.View({
                center: ol.proj.fromLonLat([myCoords.lon, myCoords.lat]),
                zoom: myCoords.zoom
              })
            }); 

            map.on('dblclick', function(evt) {
                var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                var lon = lonlat[0];
                var lat = lonlat[1];
                $("#user_dest_lon").val(lon);
                $("#user_dest_lat").val(lat);
            });
          }
    
          function locationError(error){
              console.log(error.message);
          }
    }
    getUserLocation();

    var getDestinationLocation = function(){
        // here's where we'd add the geocoder to auto fill the destination lat and lon
    }
})