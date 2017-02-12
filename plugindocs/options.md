# Plugin Options
The widget options can be set at the time of creation:
```javascript
var $img = $("#image1").imgViewer({
	dragable: false,
	onClick: function( e, pos ) {
				$("#position").html("relx: " + pos.x + " rely: " + pos.y + " zoom: " + this.options.zoom() );
	}
});
```
or afterwards by:
```javascript
$img.imgViewer("option", "zoomable", false);
```
The current value of an option can be retrieved by:
```javascript
$img.imgViewer("option", "zoomMax");
```
##dragable
  * Controls if image will be dragable
  * Default: true
  * Example - to disable image dragging:

```javascript
$("#image1").imgViewer("option", "dragable", false);
```

##zoomStep
  * How much the zoom changes for each mousewheel click - must be a positive number
  * Default: 0.1
  * Example:

```javascript
$("#image1").imgViewer("option", "zoomStep", 0.05);
```

##zoom
  * Get/Set the current zoom level of the image - must be >= 1
  * Default: 1 (ie the entire image is visible)
  * Example - to display the image magnified 3x:

```javascript
$("#image1").imgViewer("option", "zoom", 3);
```
##zoomMax
  * Get/Set the limit on the maximum zoom level of the image - values less than 1 have no affect
  * Default: 0 (ie no limit on zoom)
  * Example - to restrict zoom to 3x or less:

```javascript
$("#image1").imgViewer("option", "zoomMax", 3);
```
##zoomable
  * Controls if image will be zoomable
  * Default: true
  * Example - to disable image zooming:

```javascript
$("#image1").imgViewer("option", "zoomable", false);
```
##onClick
  * Callback triggered by a mouseclick on the image - within the callback function `this` refers to the imgViewer object
  * Default: $.noop
  * Callback Arguments:
    * e: the original click event object
  * Example - to display the relative image coordinate clicked (relative image coordinates range from 0 to 1
   where 0,0 correspondes to the topleft corner and 1,1 the bottom right):
   
```javascript
$("#image1").imgViewer("option", "onClick", function(e) {
	var pos = this.cursorToImg( e.pageX, e.pageY);
	$("#click_position").html(e.pageX + " " + e.pageY + " " + pos.x + " " + pos.y);
});
```
##onUpdate
  * Callback triggered after the image has been redisplayed- within the callback function `this` refers to the imgViewer object
  * Default: $.noop
  * Callback Arguments:
	* None
  * Example - to display the relative image coordinate at the centre of the view:
  
```javascript
$("#image1").imgViewer("option", "onUpdate", function() {
	var pos = {
				relx: this.vCenter.x/$(this.img).width(),
				rely: this.vCenter.y/$(this.img).height()
			};
	$("#centre_position").html(pos.relx + " " + pos.rely);
});
```
##onReady
  * Callback triggered when the plugin is fully initialised- within the callback function `this` refers to the imgViewer object
  * Default: $.noop
  * Callback Arguments:
	* None
  * Example - to zoom and pan the image to a focal point on widget load:
  
```javascript
$("#image1").imgViewer({
	onReady: function() {
		this.options.zoom = 3;
        this.panTo(1,1);
    }
});
```


