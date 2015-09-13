$(function() {
	var bg = L.tileLayer(BG_URL, {
		attribution : "国土地理院",
		maxNativeZoom : 18,
		maxZoom : 20
	});

	var fg = L.tileLayer.mask(FG_URL, {
		attribution : "国土地理院",
		maxNativeZoom : 18,
		maxZoom : 20,
		maskUrl : "white.png",
		maskWidth : window.innerWidth,
		maskHeight : window.innerHeight * 3
	});

	var opt = L.extend({
		zoom : 16,
		minZoom : 10,
		inertia : false,
		zoomControl : false,
		attributionControl : false,
		layers : [ bg, fg ]
	}, L.Hash.parseHash(location.hash) || {
		zoom : 16,
		center : [ LAT, LNG ]
	});

	var map = L.map("map", opt);

	L.control.attribution({
		position : 'bottomright',
		prefix : "<a target='cmp_usage' href='http://gsi-cyberjapan.github.io/cmp/op.png'>使い方</a>"
	}).addTo(map);

	L.control.zoom({
		position : 'bottomright'
	}).addTo(map);

	fg.setCenter(0, window.innerHeight / 2);

	new L.Hash(map);

	$("#slider").slider({
		"value" : 50,
		"slide" : function(event, ui) {
			var cx = window.innerWidth * (ui.value - 50) / 100;
			var cy = window.innerHeight / 2;
			fg.setCenter(cx, cy);
		}
	});
});
