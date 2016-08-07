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
	tst.remove();
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
	tst.remove();
});

test( "zoomable option", 2, function() {
	var $img = $("#qunit-fixture img");
	var zoom = false;
	var tst = $img.imgViewer({
		zoomable: zoom
	});
	equal(tst.imgViewer("option", "zoomable"), zoom, "set zoomable option in constructor");
	zoom = true;
	tst.imgViewer("option", "zoomable", zoom);
	equal(tst.imgViewer("option", "zoomable"), zoom, "set zoomable option on built object");
	tst.remove();
});
	
test( "dragable option", 2, function() {
	var $img = $("#qunit-fixture img");
	var drag = false;
	var tst = $img.imgViewer({
		dragable: drag
	});
	equal(tst.imgViewer("option", "dragable"), drag, "set dragable option in constructor");
	drag = true;
	tst.imgViewer("option", "dragable", drag);
	equal(tst.imgViewer("option", "dragable"), drag, "set dragable option on built object");
	tst.remove();
});

	
}(jQuery));
