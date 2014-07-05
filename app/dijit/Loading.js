define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dojo/text!./templates/Loading.html",
	"esri/domUtils",
    "xstyle/css!./css/Loading.css"],
    function(declare, lang, _WidgetBase, _TemplatedMixin, template, domUtils){
        return declare([_WidgetBase, _TemplatedMixin], {
        	// The template
        	templateString: template,
        	
        	map: null,

            baseClass: "loading",
            
			constructor: function (params, srcNodeRef) {
				params = params || {};
			
			    if (!params.map) {
			      console.error("app.dijit.Loading: Unable to find the 'map' property in parameters");
			    }
			    
			    this.map = params.map; // REQUIRED
			},
            
            postCreate: function() {
            	// Call the base class methods
            	this.inherited(arguments);       	
			    
			    // Add event handlers
				this.map.on("update-start", lang.hitch(this, this.showLoading)); 
				this.map.on("update-end", lang.hitch(this, this.hideLoading));  		
            },            
                       
            showLoading: function() {
            	console.log("showLoading");
            	domUtils.show(this.loadingIcon);
		        this.map.disableMapNavigation();
		        this.map.hideZoomSlider();
            },
            
            hideLoading: function() {
            	console.log("hideLoading");
            	domUtils.hide(this.loadingIcon);
          		this.map.enableMapNavigation();
          		this.map.showZoomSlider();
            }
        });
	}
);