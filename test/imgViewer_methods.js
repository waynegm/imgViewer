/*
 * imgViewer_methods.js
 */
(function($) {
module("imgViewer: methods");

test( "destroy",1, function() {
	var img = $("#qunit-fixture img");
	
	var tst = img.imgViewer();
	tst.imgViewer("destroy");
	ok(img.contents().length === 0, "elements added are removed");
	tst.remove();
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
		ok(res.x === erelx && res.y === erely, "top left corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		res = tst.imgViewer("cursorToImg", offset.left+width, offset.top+height);
		erelx = 0.5+0.5/zoom;
		erely = 0.5+0.5/zoom;
		ok(res.x === erelx && res.y === erely, "bottom right corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		res = tst.imgViewer("cursorToImg", offset.left+width/4, offset.top+height/4);
		erelx = 0.5-0.25/zoom;
		erely = 0.5-0.25/zoom;
		ok(res.x === erelx && res.y === erely, "internal point at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		equal(tst.imgViewer("cursorToImg", offset.left-zoom*width, offset.top), null, "returns null for page pixel x coordinate left of zoomed image");
		equal(tst.imgViewer("cursorToImg", offset.left+zoom*width, offset.top), null, "returns null for page pixel x corodinate right of zoomed image");
		equal(tst.imgViewer("cursorToImg", offset.left, offset.top-zoom*height), null, "returns null for page pixel y coordinate above zoomed image");
		equal(tst.imgViewer("cursorToImg", offset.left, offset.top+zoom*height), null, "returns null for page pixel y coordinate below zoomed image");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "cursorToImg at 1x zoom",3, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgViewer();
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var offset = $img.offset();
		var res = tst.imgViewer("cursorToImg", offset.left, offset.top);
		ok(res.x === 0 && res.y === 0, "top left corner at 1x zoom is " + res.x + " " + res.y + " expected 0 0");
		res = tst.imgViewer("cursorToImg", offset.left+width, offset.top+height);
		ok(res.x === 1 && res.y === 1, "bottom right corner at 1x zoom is " + res.x + " " + res.y + " expected 1 1");
		res = tst.imgViewer("cursorToImg", offset.left+width/4, offset.top+height/4);
		ok(res.x === 0.25 && res.y === 0.25, "internal point at 1x zoom is " + res.x + " " + res.y + " expected 0.25 0.25");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "cursorToImg at 1x zoom with padding and margin",1, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 1;
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var offset = $img.offset();
		var res = tst.imgViewer("cursorToImg", offset.left+50, offset.top+50);
		var erelx = 0.5-0.5/zoom, 
		erely = 0.5-0.5/zoom;
		ok(res.x === erelx && res.y === erely, "top left corner with padding and border at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "cursorToImg at 4x zoom with padding and margin",1, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var offset = $img.offset();
		var res = tst.imgViewer("cursorToImg", offset.left+50, offset.top+50);
		var erelx = 0.5-0.5/zoom, 
		erely = 0.5-0.5/zoom;
		ok(res.x === erelx && res.y === erely, "top left corner with padding and border at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
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
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
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
		ok(res.x === offset.left && res.y === offset.top, "top left corner at 1x zoom is " + res.x + " " + res.y + " expected " + offset.left + " " + offset.top);
		res = tst.imgViewer("imgToCursor", 1.0, 1.0);
		ok(res.x === (offset.left+width) && res.y === (offset.top+height), "bottom right corner at 1x zoom is " + res.x + " " + res.y + " expected " + (offset.left+width) + " " + (offset.top+height));
		res = tst.imgViewer("imgToCursor", 0.25, 0.25);
		ok(res.x === (offset.left+width/4) && res.y === (offset.top+height/4), "internal point at 1x zoom is " + res.x + " " + res.y + " expected " + (offset.left+width/4) + " " + (offset.top+height/4));
		equal(tst.imgViewer("imgToCursor", -1.0, 0.5), null, "returns null for relative x image coordinate < 0");
		equal(tst.imgViewer("imgToCursor", 2.0, 0.5), null, "returns null for relative x image coordinate > 1");
		equal(tst.imgViewer("imgToCursor", 0.5, -0.5), null, "returns null for relative y image coordinate < 0");
		equal(tst.imgViewer("imgToCursor", 0.5, 2.5), null, "returns null for relative x image coordinate > 1");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
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
		ok(res.x === offset.left && res.y === offset.top, "top left corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + offset.left + " " + offset.top);
		erelx = 0.5+0.5/zoom;
		erely = 0.5+0.5/zoom;
		res = tst.imgViewer("imgToCursor", erelx, erely);
		ok(res.x === (offset.left+width) && res.y === (offset.top+height), "bottom right corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + (offset.left+width) + " " + (offset.top+height));
		erelx = 0.5-0.25/zoom;
		erely = 0.5-0.25/zoom;
		res = tst.imgViewer("imgToCursor", erelx, erely);
		ok(res.x === (offset.left+width/4) && res.y === (offset.top+height/4), "internal point at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + (offset.left+width/4) + " " + (offset.top+height/4));
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "imgToCursor at 1x zoom with padding and border",1, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 1;
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var offset = $img.offset();
		var erelx = 0.5-0.5/zoom, 
		erely = 0.5-0.5/zoom;
		var res = tst.imgViewer("imgToCursor", erelx, erely);
		ok(res.x === offset.left+50 && res.y === offset.top+50, "top left corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + (offset.left+50) + " " + (offset.top+50));
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "imgToCursor at 4x zoom with padding and border",1, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var offset = $img.offset();
		var erelx = 0.5-0.5/zoom, 
		erely = 0.5-0.5/zoom;
		var res = tst.imgViewer("imgToCursor", erelx, erely);
		ok(res.x === offset.left+50 && res.y === offset.top+50, "top left corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + (offset.left+50) + " " + (offset.top+50));
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});


asyncTest( "imgToView at 1x zoom",7, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgViewer();
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var res = tst.imgViewer("imgToView", 0.0, 0.0);
		ok(res.x === 0 && res.y === 0, "top left corner at 1x zoom is " + res.x + " " + res.y + " expected 0 0");
		res = tst.imgViewer("imgToView", 1.0, 1.0);
		ok(res.x === width && res.y === height, "bottom right corner at 1x zoom is " + res.x + " " + res.y + " expected " + width + " " + height);
		res = tst.imgViewer("imgToView", 0.25, 0.25);
		ok(res.x === Math.round(width/4) && res.y === Math.round(height/4), "internal point at 1x zoom is " + res.x + " " + res.y + " expected " + Math.round(width/4) + " " + Math.round(height/4));
		equal(tst.imgViewer("imgToView", -1.0, 0.5), null, "returns null for relative x image coordinate < 0");
		equal(tst.imgViewer("imgToView", 2.0, 0.5), null, "returns null for relative x image coordinate > 1");
		equal(tst.imgViewer("imgToView", 0.5, -0.5), null, "returns null for relative y image coordinate < 0");
		equal(tst.imgViewer("imgToView", 0.5, 2.5), null, "returns null for relative x image coordinate > 1");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "imgToView at 4x zoom",3, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var erelx = 0.5-0.5/zoom, 
		erely = 0.5-0.5/zoom;
		var res = tst.imgViewer("imgToView", erelx, erely);
		ok(res.x === 0 && res.y === 0, "top left corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected 0 0");
		erelx = 0.5+0.5/zoom;
		erely = 0.5+0.5/zoom;
		res = tst.imgViewer("imgToView", erelx, erely);
		ok(res.x === width && res.y === height, "bottom right corner at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + width + " " + height);
		erelx = 0.5-0.25/zoom;
		erely = 0.5-0.25/zoom;
		res = tst.imgViewer("imgToView", erelx, erely);
		ok(res.x === Math.round(width/4) && res.y === Math.round(height/4), "internal point at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + Math.round(width/4) + " " + Math.round(height/4));
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "imgToView at 1x zoom with padding and border",1, function() {
	var $img = $("#qunit-fixture img");
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer();
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var res = tst.imgViewer("imgToView", 0.25, 0.25);
		ok(res.x === Math.round(width/4) && res.y === Math.round(height/4), "internal point at 1x zoom is " + res.x + " " + res.y + " expected " + Math.round(width/4) + " " + Math.round(height/4));
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "imgToView at 4x zoom with padding and border",1, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var erelx = 0.5-0.25/zoom;
		var erely = 0.5-0.25/zoom;
		var res = tst.imgViewer("imgToView", erelx, erely);
		ok(res.x === Math.round(width/4) && res.y === Math.round(height/4), "internal point at " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + Math.round(width/4) + " " + Math.round(height/4));
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
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
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
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
		ok(res.x === erelx && res.y === erely, "pan to internal location " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		erelx = 1/(2*zoom);
		erely = 1/(2*zoom);
		res = tst.imgViewer("panTo", 0.0, 0.0);
		ok(res.x === erelx && res.y === erely, "pan to top left corner " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		erelx = 1 - 1/(2*zoom);
		erely = 1 - 1/(2*zoom);
		res = tst.imgViewer("panTo", 1.0, 1.0);
		ok(res.x === erelx && res.y === erely, "pan to bottom right corner " + zoom + "x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		equal(tst.imgViewer("panTo", -1.0, 0.5), null, "returns null for relative x image coordinate < 0");
		equal(tst.imgViewer("panTo", 2.0, 0.5), null, "returns null for relative x image coordinate > 1");
		equal(tst.imgViewer("panTo", 0.5, -0.5), null, "returns null for relative y image coordinate < 0");
		equal(tst.imgViewer("panTo", 0.5, 2.5), null, "returns null for relative x image coordinate > 1");
		tst.remove();
		
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "viewToImg at 1x zoom",7, function() {
	var $img = $("#qunit-fixture img");
	var tst = $img.imgViewer();
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var res = tst.imgViewer("viewToImg", 0, 0);
		ok(res.x === 0 && res.y === 0, "top left corner at 1x zoom is " + res.x + " " + res.y + " expected 0 0");
		res = tst.imgViewer("viewToImg", width, height);
		ok(res.x === 1 && res.y === 1, "bottom right corner at 1x zoom is " + res.x + " " + res.y + " expected 1 1");
		res = tst.imgViewer("viewToImg", Math.round(width/4), Math.round(height/4));
		ok(res.x === 0.25 && res.y === 0.25, "internal point at 1x zoom is " + res.x + " " + res.y + " expected 0.25 0.25");
		equal(tst.imgViewer("viewToImg", -1, 0), null, "returns null for view x left of image");
		equal(tst.imgViewer("viewToImg", 0, 2*width), null, "returns null for view x right of image > 1");
		equal(tst.imgViewer("viewToImg", 0, -1), null, "returns null for view y above image");
		equal(tst.imgViewer("viewToImg", 0, 2*height), null, "returns null for view y above image");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "viewToImg at 4x zoom",3, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var erelx = 0.5-0.5/zoom, 
			erely = 0.5-0.5/zoom;
		var res = tst.imgViewer("viewToImg", 0, 0);
		ok(res.x === erelx && res.y === erely, "top left corner at 1x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		erelx = 0.5+0.5/zoom;
		erely = 0.5+0.5/zoom;
		res = tst.imgViewer("viewToImg", width, height);
		ok(res.x === erelx && res.y === erely, "bottom right corner at 1x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		erelx = 0.5-0.25/zoom;
		erely = 0.5-0.25/zoom;
		res = tst.imgViewer("viewToImg", Math.round(width/4), Math.round(height/4));
		ok(res.x === erelx && res.y === erely, "internal point at 1x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "viewToImg at 1x zoom with padding and border",1, function() {
	var $img = $("#qunit-fixture img");
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer();
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var res = tst.imgViewer("viewToImg", Math.round(width/4), Math.round(height/4));
		ok(res.x === 0.25 && res.y === 0.25, "internal point at 1x zoom is " + res.x + " " + res.y + " expected 0.25 0.25");
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

asyncTest( "viewToImg at 4x zoom with padding and border",1, function() {
	var $img = $("#qunit-fixture img");
	var zoom = 4;
	$img.css({border: "30px solid #ccc", padding: "20px"});
	var tst = $img.imgViewer({zoom: zoom});
	$img.load(function() {
		var width = $img.width();
		var height = $img.height();
		var erelx = 0.5-0.25/zoom;
		var erely = 0.5-0.25/zoom;
		var res = tst.imgViewer("viewToImg", Math.round(width/4), Math.round(height/4));
		ok(res.x === erelx && res.y === erely, "internal point at 1x zoom is " + res.x + " " + res.y + " expected " + erelx + " " + erely);
		tst.remove();
		start();
	}).each(function() {
		if (this.complete) { $(this).load(); }
	});
});

}(jQuery));


