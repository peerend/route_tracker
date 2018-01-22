$(document).ready(function() {

    //get the users location, returns general city coords if nothing else
    function createMap (){
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
        var crd = position.coords;
        var myCoords = {
          lat: crd.latitude,
          lon: crd.longitude,
          zoom: 17
        }
        drawMap(myCoords);
      }
  
      function locationError(error){
        console.log(error.message);
        var myCoords = {
          lon: -122.6765,
          lat: 45.5231,
          zoom: 15
        }
        drawMap(myCoords);    
      }
    }
  
    function drawMap(myCoords){
      var map = new ol.Map({
        target: 'map',
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
    }
    createMap();
});