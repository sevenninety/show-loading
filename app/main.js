define([
	"dojo/ready",
	"dojo/parser",
	"dojo/dom",
	"dojo/_base/array",
	"esri/map",
	"esri/geometry/Extent",	
	"app/dijit/Loading",
	"app/config",
	"esri/layers/ArcGISTiledMapServiceLayer",
	"esri/layers/ArcGISDynamicMapServiceLayer"], 
	function(ready, parser, dom, array, Map, Extent, Loading, config, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer) { 
		ready(function() {
			// Call the parser to create the dijit layout
			parser.parse();
			
			// Delare module level variables
			var map;
			
			// Initialise the application
			init();		
			
			// Create the map
			function init() {
				var options = {}, 
					configMap = config.map,
					layers = [];
				
				// Initial extent or center defined?
				if (configMap.initialExtent) {
					console.log("Set initial extent");
					var ext = configMap.initialExtent.split(",");
					options.extent = new Extent(ext[0], ext[1], ext[2], ext[3], null);
				} else if (configMap.center ) {
					options.center = configMap.center;					
					if (configMap.zoom) {
						options.zoom = configMap.zoom;
					}					
				}
				
				// Create the map
				map = this._map = new Map("map", options);
				
				// Add basemaps
				array.forEach(configMap.basemaps, function(configLayer){
					console.log("Add basemap: ", configLayer.label);
					layers.push(createLayer(configLayer));
				});
				
				// Add operational Layers
				array.forEach(configMap.operationalLayers, function(configLayer){
					console.log("Add operational layer: ", configLayer.label);
					layers.push(createLayer(configLayer));
				});
				
				// Add all the map layers
				map.addLayers(layers);		
				
				map.on("load", function(){	
					console.log("map loaded");	
					        	
					var loading = new Loading({
						map: map
					}, dom.byId("loadingIcon")).startup();
		        });      
			}

			function createLayer(configLayer) {
				var layer = null;
				
				// TODO: add more layer types as required
				switch(configLayer.type) {
					case "tiled":
						layer = new ArcGISTiledMapServiceLayer(configLayer.url, {
							visible: configLayer.visible
						});
						break;
					case "dynamic":
						layer = new ArcGISDynamicMapServiceLayer(configLayer.url, {
							visible: configLayer.visible,
							opacity: configLayer.opacity ? configLayer.opacity : 0
						}); 
						break;
				}
				
				return layer;
			}		
		}
	);
});
