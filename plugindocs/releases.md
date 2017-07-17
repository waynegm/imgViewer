#Release History
## 1.0.1
- replace call to img.load() event trigger depreciated in jQuery 3 with img.trigger("load") 
## 1.0.0
- Restructure repository layout
- Change build system from grunt to vanilla npm
- Edit package.json for npmjs package publishing
- Move examples to docs folder for serving by ghpages
- Revamp examples
- Split documetation out of README.md and place in plugindocs folder
- Update Hammerjs to latest version (2.0.8)
- Fix pageX and pageY for IE11 tap events
- Fix drag bug in Firefox
- Improve behaviour of touch gestures

## 0.9.1
- Add zoomMax option to limit maximum possible zoom level

## 0.9.0
- Replace jquery.event.ue with hammer.js and jquery.hammer.js for more flexibility with touch gesture support
- Add dragable option allowing user to disable dragging 

## 0.8.0
- Replace toe.js with jquery.event.ue for better touch gesture support

## 0.7.4
- Fix for triggering of drag events during pinch gestures

## 0.7.3
- Fix multiple click/tap events when using jQuery Mobile

## 0.7.2
- Add dependency on jquery-mousewheel
- Stop IE 10 & 11 continuously dragging image

## 0.7.1
- Add zoomable option allowing user to disable zooming
- Fix bug in drag implementation on mobile devices

## 0.7
- Added support for pinch and drag touch gestures for mobile device support (adds requirement for toe.js).
- Added dependency on the requestAnimationFrame polyfill provided by Zoetrope for more responsive image scaling and dragging.
- Changed to using css transform to scale and translate image for better performance on mobile platforms.
- Minimum IE supported is now IE 9 - stick with version 0.6 if you need IE 8 support.
- Updated Grunfile.js to include tests against latest version (2.1.0) of jQuery.

## 0.6
- Major refactoring of the code to make it work in IE8.
- Instead of manipulating a background image a new image element with the same src as the original image is positioned over it.
- Added the panTo, getView, isVisible, imgtoView and viewToImg public methods.
- Added unit tests to cover most of the code.

## 0.5
- Proof of concept - everything seems to work as I want but unit tests are needed and the exposed interface may need refinement to increase it's flexibility and usefulness.
