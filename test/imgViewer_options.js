/*
 * imgViewer_options.js
 */
(function($) {
	module("imgViewer: options");
	
	test( "zoom option", 3, function() {
		var $img = $("#qunit-fixture img");
	var zoom = 5;
	var tst = $img.imgViewer({
		zoom: zoom
	});
	equal(tst.imgViewer("option", "zoom"), zoom, "set zoom option in constructor");
	zoom = 2;
	tst.imgViewer("option", "zoom", zoom);
	equal(tst.imgViewer("option", "zoom"), zoom, "set zoom option on built object");
	tst.imgViewer("option", "zoom", 0.5);
	equal(tst.imgViewer("option", "zoom"), zoom, "no change if zoom is less than 1");
	
	});

test( "zoomStep option", 3, function() {
	var $img = $("#qunit-fixture img");
	var step = 0.5;
	var tst = $img.imgViewer({
		zoomStep: step
	});
	equal(tst.imgViewer("option", "zoomStep"), step, "set zoomStep option in constructor");
	step = 0.25;
	tst.imgViewer("option", "zoomStep", step);
	equal(tst.imgViewer("option", "zoomStep"), step, "set zoomStep option on built object");
	tst.imgViewer("option", "zoomStep", -0.2);
	equal(tst.imgViewer("option", "zoomStep"), step, "no change if zoomStep is less than 0");
	
});
	
}(jQuery));