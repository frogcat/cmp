$(function() {

	var master = L.map('master', {
		center : [ LAT, LNG ],
		zoom : 16,
		minZoom : 10,
		layers : [ L.tileLayer(BG_URL, {
			attribution : "国土地理院",
			maxNativeZoom : 18,
			maxZoom : 20
		}) ],
		zoomControl : false,
		inertia : false
	});

	var slave = L.map('slave', {
		center : [ LAT, LNG ],
		zoom : 16,
		minZoom : 10,
		layers : [ L.tileLayer(FG_URL, {
			attribution : "国土地理院",
			maxNativeZoom : 18,
			maxZoom : 20
		}) ],
		zoomControl : false,
		attributionControl : false
	});

	new L.Control.Zoom({
		position : 'bottomright'
	}).addTo(master);

	L.hash(master);

	master.on("move", function() {
		slave.setView(master.getCenter(), master.getZoom(), {
			animate : false
		});
	});

	$("#slider").slider({
		"value" : 50,
		"slide" : function(event, ui) {
			$("#slave").css("width", ui.value + "%");
		}
	});

	$("#slave").css("width", "50%");

});
