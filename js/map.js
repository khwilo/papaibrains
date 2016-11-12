/* initialize the map with a map div element 
 * and set its geographical center and zoom
 * the center is at Isiolo, Kenya
 */
var map = L.map('mapid').setView([1.002, 38.167], 13);

/* provide the url of the map */
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

/* add a map entity as a tile layer */
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{attribution: '&copy;' + mapLink + 'Contributors', maxZoom: 18,
		}).addTo(map);

/* initialize the svg layer */
map._initPathRoot();

/* pick up the svg from the map object */
var svg = d3.select("#map").select("svg"),
g = svg.append("g");

d3.json("papai_dev.json", function(collection) {
	/* Add latitude and longitude item to each item in the dataset */
	collection.objects.forEach(function(d) {
		d.LatLng = new L.LatLng(d.circle.coordinates[0], 
				d.circle.coordinates[1]);
	});

	var feature = g.selectAll("cirlce")
		.data(collection.objects)
		.enter().append("circle")
		.style("stroke", "black")
		.style("opacity", .6)
		.style("fill", "red")
		.attr("r", 20);

	map.on("viewstreet", update);
	update();

	function update() {
		feature.attr("transform", 
				function(d) {
					return "translate("+
						map.LatLngToLayerPoint(d.LatLng).x +","+
						map.LatLngToLayerPoint(d.LatLng).y +")";
				});
	};
});
