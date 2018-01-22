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
    $('#my_map').data('my_map', map);
    
    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);
    
    addXYZLayer('1996 View', null, 'https://www.portlandmaps.com/arcgis/rest/services/Public/Aerial_Photos_Summer_1996/MapServer');

    getUserData();
  }

  //we're going to create two kinds of markers, one for home and one for destinations
  function drawMarkers(map, data){

    // WIP features aren't rendering at the moment isn't projection or z-index
    var defaultStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: [250,250,250,1]
      }),
      stroke: new ol.style.Stroke({
        color: [220,220,220,1],
        width: 1
      })
    });

    var homeStyle = new ol.style.Style({
      image: new ol.style.Icon(({
              anchor: [0.5, 1],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              opacity: 1,
              src: 'https://openlayers.org/en/v3.19.1/examples/data/icon.png'
      }))
    });
    
    var features = [];
    var i = 2;
    data.forEach(function(dat){
      i = i + 2;
      var homePoint = new ol.geom.Point(ol.proj.transform([dat.home_lon, dat.home_lat], 'EPSG:4326', 'EPSG:3857'));
      var destPoint = new ol.geom.Point(ol.proj.transform([dat.dest_lon, dat.dest_lat], 'EPSG:4326', 'EPSG:3857'));
      var homeFeature = new ol.Feature({
        geometry: [dat.home_lon, dat.home_lat],
        name: dat.user_name,
        isHome: 1,
      });

      var destFeature = new ol.Feature({
        geometry: destPoint,
        name: dat.user_name,
        isHome: 0
      });

      homeFeature.setStyle(homeStyle);
      destFeature.setStyle(defaultStyle);
      homeFeature.setId(i);
      destFeature.setId(i -1);
      features.push(homeFeature);
      features.push(destFeature);
    });

    var vectorSource = new ol.source.Vector({
      features: features 
    });

    var markerLayer = new ol.layer.Vector({
      title: 'Marker Layer',
      visible: true,
      source: vectorSource
    });

    markerLayer.setZIndex(200);

    overlayGroup.getLayers().push(markerLayer);
  }

  function getUserData(){
    $.ajax({
      dataType: 'json',
      url: '/users',
      success: dataFound,
      error: dataNotFound
    });

    function dataFound(data){
      var map = $('#my_map').data('my_map');
      drawMarkers(map, data);
    }
    function dataNotFound(error){
      console.log(error.message);
      return null;
    }
  }

  function addXYZLayer(title, attribution, url) {
    overlayGroup.getLayers().push(new ol.layer.Tile({
        title: title,
        visible: false,
        source: new ol.source.XYZ({
            attributions: [attribution],
            url: url + '/tile/{z}/{y}/{x}'
        })
    }));
  }
  createMap();
});