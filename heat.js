

// Adding 500 Data Points
var map, pointarray, heatmap;

var taxiData = [ ];
// new google.maps.LatLng(37.751266, -122.403355)

var parse = function(xhr) {
	var points = [];
	var data = xhr.responseText.split("\n");
	for(var i = 0, x = data.length; i < x; i++) {
		try {
		var record = JSON.parse(data[i]);
		var location = record.location;
    		points.push(parseFloat(location.latitude));
    		points.push(parseFloat(location.longitude));
		} catch(e) {};
	}
	return points;
};

var superInit = function(cb) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4) {
		var body = xhr.responseText;
		cb(parse(xhr));
	    }
	};
	xhr.open('GET', 'dsg-data.json', true);
	xhr.send(null);
};

function initialize(points) {

  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(37.774546, -122.433523),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

 for(var i = 0, x = points.length; i < x; i+=2) {
   taxiData.push(new google.maps.LatLng(points[i], points[i+1]));
 }

  var pointArray = new google.maps.MVCArray(taxiData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

google.maps.event.addDomListener(window, 'load', function() {
 superInit(initialize);
});

