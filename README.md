imgViewer
=========

imgViewer is a jQuery plugin that adds to an image the ability to zoom in and out with the mousewheel 
and pan around by click and drag. A unique feature of this plugin is it's ability to work on images 
which have widths or heights specified as a percentage of their container. Try out the [demo](http://waynegm.github.io/imgViewer/)

## Dependencies
The plugin is known to work with the configuration described below:

 * [jQuery](http://jquery.com/) (>=1.8)
 * [jQuery UI](http://jqueryui.com/) (>=1.8)
    * [Widget Factory](http://api.jqueryui.com/jQuery.widget/)
 * [jQuery Mousewheel](http://brandonaaron.net/code/mousewheel/docs) (>=3.0)

## Usage

Include either the development version or minified production version of the JS file located
 in the `dist` folder and associated dependencies into your web page:

```html
<head>
	...
	<script src="jquery.js"></script>
	<script src="jquery-ui.js"></script>
	<script src="jquery.mousewheel.js"></script>
	<script src="jquery.imgViewer.min.js"></script>
	...
</head>
```

Put an image element and a javascript block to attach the plugin to the image in the web page body:

```html
<body>
	...
	<img  id="image1" src="test.jpg" width="50%" />              
	...
	<script>
		(function($) {
			$("#image1").imgViewer();
		})(JQuery);
	</script>
	...
</body>
```
## Options

###zoomStep
  * How much the zoom changes for each mousewheel click - must be a positive number
  * Default: 0.1
  * Example:

```javascript
$("#image1").imgViewer("option", "zoomStep", 0.05);
```

###zoom
  * Get/Set the current zoom level of the image - must be >= 1
  * Default: 1 (ie the entire image is visible)
  * Example - to display the image magnified 3x:

```javascript
$("#image1").imgViewer("option", "zoom", 3);
```

###onClick
  * Callback triggered by a mouseclick on the image
  * Default: null
  * Callback Arguments:
    * e: the original click event object
    * self: the imgViewer widget object issuing the clik event
  * Example - to display the relative image coordinate clicked (relative image coordinates range from 0 to 1
   where 0,0 correspondes to the topleft corner and 1,1 the bottom right):
   
```javascript
$("#image1").imgViewer("option", "onClick", function(e, self) {
	var pos = self.cursorToImg( e.pageX, e.pageY);
	$("#click_position").html(e.pageX + " " + e.pageY + " " + pos.relx + " " + pos.rely);
});
```

###onUpdate
  * Callback triggered after the image has been redisplayed
  * Default: null
  * Callback Arguments:
	* e: always null
	* self: the imgViewer widget object issuing the update notice
  * Example - to display the relative image coordinate at the centre of the view:
  
```javascript
$("#image1").imgViewer("option", "onUpdate", function(e, self) {
	var pos = {
				relx: self.vCenter.x/$(self.img).width(),
				rely: self.vCenter.y/$(self.img).height()
			};
	$("#centre_position").html(pos.relx + " " + pos.rely);
});
```

## Public Methods

###cursorToImg
  * Convert page pixel coordinates to relative image coordinate for the current view and zoom
  * Arguments:
	* pageX: x coordinate in pixel(page) coordinates
	* pageY: y coordiante in pixel(page) coordinates
  * Returns javascript object with relative image coordinates (relative image coordinates range from 0 to 1
   where 0,0 correspondes to the topleft corner and 1,1 the bottom right):
	* { relx: relative x image coordinate, rely: relative y image coordinate }
  * If the page coordinate is outside the image viewport an empty object is returned

###getView
  * Get the relative image coordinates of the current view
  * Returns a javascript object with the relative image coordinates:
	* { top: minimum relative y coordinate,
	*	left: minimum relative x coordinate,
	*	bottom: maximum relative y image coordinate,
	*	right: maximum relative x coordinate
	* }
	
###imgToCursor
  * Convert relative image coordinate to a page pixel coordinate for the current view and zoom
  * Arguments:
	* relx: relative x image coordinate
	* rely: relative y image coordinate
  * Returns a javascript object with the page pixel coordinates:
	* { pageX: the x page pixel coordinate, pageY: the y page pixel coordinate }
  * If the relative image coordinates are not >=0 and <=1 an empty object is returned.

###isVisible
  * Test is a given relative image coordinate is within the bounds of the current view
  * Arguments:
	* relx: relative x image coordinate
	* rely: relative y image coordinate
  * Returns
	* true or false

###panTo
  * Pan the view to be centred at the given relative image coordinates
  * Arguments:
	* relx: relative x image coordinate
	* rely: relative y image coordinate
  * Returns a javascript object with the relative image coordinates of the view centre after snapping the edges of the zoomed image to the view boundaries.
	* { relx: view center relative x image coordinate, rely: view center relative y image coordinate }
  * If the relative image coordinates are not >=0 and <=1 the view is not changed. 
	
## License

This plugin is provided under the [MIT License](http://opensource.org/licenses/MIT). 
Copyright (c) 2013 Wayne Mogg.

## Release History
### 0.5
Proof of concept - everything seems to work as I want but unit tests are needed and the exposed interface 
may need refinement to increase it's flexibility and usefulness.
### 0.6
Major refactoring of the code to make it work in IE8. Instead of manipulating a background image a new image element 
with the same src as the original image is positioned over it. Added the panTo, getView and isVisible public methods. Added
 unit tests for most of the code.