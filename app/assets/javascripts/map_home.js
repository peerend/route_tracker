$(document).ready(function() {

  var overlayGroup = new ol.layer.Group({
    title: 'Overlays',
    layers: []
  });

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
    let attribution = new ol.Attribution({
      html: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });

    var map = new ol.Map({
      target: 'my_map',
      layers: [
        new ol.layer.Group({
            'title': "Base Maps",
            layers:[
                new ol.layer.Tile({
                    title: 'ESRI Base Layer',
                    type: 'base',
                    source: new ol.source.XYZ({
                        attributions: [attribution],
                        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                    })
                })
            ]   
        }),
        overlayGroup
     ],
      view: new ol.View({
        center: ol.proj.fromLonLat([myCoords.lon, myCoords.lat]),
        zoom: myCoords.zoom
      })
    }); 
    
    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);
    
    addXYZLayer('1996 View', null, 'https://www.portlandmaps.com/arcgis/rest/services/Public/Aerial_Photos_Summer_1996/MapServer');

    getUserData();
  }

  function getUserData(){
    $.ajax({
      dataType: 'json',
      url: '/users',
      success: dataFound,
      error: dataNotFound
    })

    function dataFound(data){
      console.log(data);
    }
    function dataNotFound(error){
      console.log(error.message);
    }
  }

  function addXYZLayer(title, attribution, url) {
    overlayGroup.getLayers().push(new ol.layer.Tile({
        title: title,
        visible: true,
        source: new ol.source.XYZ({
            attributions: [attribution],
            url: url + '/tile/{z}/{y}/{x}'
        })
    }));
  }

  createMap();
});