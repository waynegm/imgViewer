/*
 * imgViewer_methods.js
 */
(function($) {
module("imgViewer: methods");

test("nothing",1, function() {
	equal(1,1,"done");
	
});
test( "destroy",1, function() {
	var img = $("#qunit-fixture img");
	
	img.imgViewer();
	img.imgViewer("destroy");
	ok(img.contents().length === 0, "elements added are removed");
});

asyncTest( "cursorToImg at 1x zoom",3, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgViewer();
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var offset = $img.offset();
		var res = tst.imgViewer("cursorToImg", offset.left, offset.top);
		ok(res.relx === 0 && res.rely === 0, "top left corner at 1x zoom is " + res.relx + " " + res.rely + " expected 0 0");
		res = tst.imgViewer("cursorToImg", offset.left+width, offset.top+height);
		ok(res.relx === 1 && res.rely === 1, "bottom right corner at 1x zoom is " + res.relx + " " + res.rely + " expected 1 1");
		res = tst.imgViewer("cursorToImg", offset.left+width/4, offset.top+height/4);
		ok(res.relx === 0.25 && res.rely === 0.25, "internal point at 1x zoom is " + res.relx + " " + res.rely + " expected 0.25 0.25");
		start();
	});
});

asyncTest( "cursorToImg at 4x zoom",7, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var offset = $img.offset();
		var res = tst.imgViewer("cursorToImg", offset.left, offset.top);
		var erelx = 0.5-0.5/zoom, 
			erely = 0.5-0.5/zoom;
		ok(res.relx === erelx && res.rely === erely, "top left corner at " + zoom + "x zoom is " + res.relx + " " + res.rely + " expected " + erelx + " " + erely);
		res = tst.imgViewer("cursorToImg", offset.left+width, offset.top+height);
		erelx = 0.5+0.5/zoom;
		erely = 0.5+0.5/zoom;
		ok(res.relx === erelx && res.rely === erely, "bottom right corner at " + zoom + "x zoom is " + res.relx + " " + res.rely + " expected " + erelx + " " + erely);
		res = tst.imgViewer("cursorToImg", offset.left+width/4, offset.top+height/4);
		erelx = 0.5-0.25/zoom;
		erely = 0.5-0.25/zoom;
		ok(res.relx === erelx && res.rely === erely, "internal point at " + zoom + "x zoom is " + res.relx + " " + res.rely + " expected " + erelx + " " + erely);
		equal(tst.imgViewer("cursorToImg", offset.left-zoom*width, offset.top), null, "returns null for page pixel x coordinate left of zoomed image");
		equal(tst.imgViewer("cursorToImg", offset.left+zoom*width, offset.top), null, "returns null for page pixel x corodinate right of zoomed image");
		equal(tst.imgViewer("cursorToImg", offset.left, offset.top-zoom*height), null, "returns null for page pixel y coordinate above zoomed image");
		equal(tst.imgViewer("cursorToImg", offset.left, offset.top+zoom*height), null, "returns null for page pixel y coordinate below zoomed image");
		
		start();
	});
});

asyncTest( "getView",2, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgViewer();
	$img.load(function() {
		var res = tst.imgViewer("getView");
		ok(res.top === 0.0 && res.left === 0.0 && res.bottom === 1.0 && res.right === 1.0, "view at 1x zoom is " + res.top + " " + res.left + " " + res.bottom + " " + res.right + " expected 0 0 1 1");
		var zoom = 4;
		var etop = 0.5 - 0.5/zoom;
		var eleft = 0.5 - 0.5/zoom;
		var ebot = 0.5 + 0.5/zoom;
		var eright = 0.5 + 0.5/zoom;
		tst.imgViewer("option", "zoom", zoom);
		res = tst.imgViewer("getView");
		ok(res.top === etop && res.left === eleft && res.bottom === ebot && res.right === eright, "view 4x zoom is " + res.top + " " + res.left + " " + res.bottom + " " + res.right + " expected " + etop + " " + eleft + " " + ebot + " " + eright);
		start();
	});
	
});
	
asyncTest( "imgToCursor at 1x zoom",7, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgViewer();
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var offset = $img.offset();
		var res = tst.imgViewer("imgToCursor", 0.0, 0.0);
		ok(res.pageX === offset.left && res.pageY === offset.top, "top left corner at 1x zoom is " + res.pageX + " " + res.pageY + " expected " + offset.left + " " + offset.top);
		res = tst.imgViewer("imgToCursor", 1.0, 1.0);
		ok(res.pageX === (offset.left+width) && res.pageY === (offset.top+height), "bottom right corner at 1x zoom is " + res.pageX + " " + res.pageY + " expected " + (offset.left+width) + " " + (offset.top+height));
		res = tst.imgViewer("imgToCursor", 0.25, 0.25);
		ok(res.pageX === (offset.left+width/4) && res.pageY === (offset.top+height/4), "internal point at 1x zoom is " + res.pageX + " " + res.pageY + " expected " + (offset.left+width/4) + " " + (offset.top+height/4));
		equal(tst.imgViewer("imgToCursor", -1.0, 0.5), null, "returns null for relative x image coordinate < 0");
		equal(tst.imgViewer("imgToCursor", 2.0, 0.5), null, "returns null for relative x image coordinate > 1");
		equal(tst.imgViewer("imgToCursor", 0.5, -0.5), null, "returns null for relative y image coordinate < 0");
		equal(tst.imgViewer("imgToCursor", 0.5, 2.5), null, "returns null for relative x image coordinate > 1");
		start();
	});
});	

asyncTest( "imgToCursor at 4x zoom",3, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var offset = $img.offset();
		var erelx = 0.5-0.5/zoom, 
		erely = 0.5-0.5/zoom;
		var res = tst.imgViewer("imgToCursor", erelx, erely);
		ok(res.pageX === offset.left && res.pageY === offset.top, "top left corner at " + zoom + "x zoom is " + res.pageX + " " + res.pageY + " expected " + offset.left + " " + offset.top);
		erelx = 0.5+0.5/zoom;
		erely = 0.5+0.5/zoom;
		res = tst.imgViewer("imgToCursor", erelx, erely);
		ok(res.pageX === (offset.left+width) && res.pageY === (offset.top+height), "bottom right corner at " + zoom + "x zoom is " + res.pageX + " " + res.pageY + " expected " + (offset.left+width) + " " + (offset.top+height));
		erelx = 0.5-0.25/zoom;
		erely = 0.5-0.25/zoom;
		res = tst.imgViewer("imgToCursor", erelx, erely);
		ok(res.pageX === (offset.left+width/4) && res.pageY === (offset.top+height/4), "internal point at " + zoom + "x zoom is " + res.pageX + " " + res.pageY + " expected " + (offset.left+width/4) + " " + (offset.top+height/4));
		
		start();
	});
});

asyncTest( "isVisible",9, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgViewer();
	$img.load(function() {
		ok(!(tst.imgViewer("isVisible", -0.1, 0.5)), "at 1x zoom returns false for relative x image coordinate < 0");
		ok(!(tst.imgViewer("isVisible", 1.1, 0.5)), "at 1x zoom returns false for relative x image coordinate > 1");
		ok(!(tst.imgViewer("isVisible", 0.5, -0.1)), "at 1x zoom returns false for relative y image coordinate < 0");
		ok(!(tst.imgViewer("isVisible", 0.5, 1.5)), "at 1x zoom returns false for relative y image coordinate > 1");
		ok(tst.imgViewer("isVisible", 0.0, 0.0), "at 1x zoom returns true for top left corner of view");
		ok(tst.imgViewer("isVisible", 1.0, 1.0), "at 1x zoom returns true for bottom right corner of view");
		ok(tst.imgViewer("isVisible", 0.5, 0.5), "at 1x zoom returns true for point inside view");
		var zoom = 4;
		tst.imgViewer("option", "zoom", zoom);
		ok(!(tst.imgViewer("isVisible", 0.0, 0.0)), "at 4x zoom returns false for point outside view");
		ok(tst.imgViewer("isVisible", 0.5, 0.5), "at 4x zoom returns true for point inside view");
		start();
	});
});	

asyncTest( "panTo at 4x zoom",7, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var erelx = 0.5-0.5/zoom, 
		erely = 0.5-0.5/zoom;
		var res = tst.imgViewer("panTo", erelx, erely);
		ok(res.relx === erelx && res.rely === erely, "pan to internal location " + zoom + "x zoom is " + res.relx + " " + res.rely + " expected " + erelx + " " + erely);
		erelx = 1/(2*zoom);
		erely = 1/(2*zoom);
		res = tst.imgViewer("panTo", 0.0, 0.0);
		ok(res.relx === erelx && res.rely === erely, "pan to top left corner " + zoom + "x zoom is " + res.relx + " " + res.rely + " expected " + erelx + " " + erely);
		erelx = 1 - 1/(2*zoom);
		erely = 1 - 1/(2*zoom);
		res = tst.imgViewer("panTo", 1.0, 1.0);
		ok(res.relx === erelx && res.rely === erely, "pan to bottom right corner " + zoom + "x zoom is " + res.relx + " " + res.rely + " expected " + erelx + " " + erely);
		equal(tst.imgViewer("panTo", -1.0, 0.5), null, "returns null for relative x image coordinate < 0");
		equal(tst.imgViewer("panTo", 2.0, 0.5), null, "returns null for relative x image coordinate > 1");
		equal(tst.imgViewer("panTo", 0.5, -0.5), null, "returns null for relative y image coordinate < 0");
		equal(tst.imgViewer("panTo", 0.5, 2.5), null, "returns null for relative x image coordinate > 1");
		
		start();
	});
});
}(jQuery));


