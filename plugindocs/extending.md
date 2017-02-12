# Extending 
The imgViewer widget is built using the [jQuery UI Widget Factory](https://learn.jquery.com/jquery-ui/widget-factory/). Extending the functionaity of the widget is a relatively simple process as described in [Extending Widgets with the Widget Factory](https://learn.jquery.com/jquery-ui/widget-factory/extending-widgets/).

As an example
```javascript
$.widget("wgm.imgExtension", $.wgm.imgViewer, {
	options: {
	}
});
```
