define({
	httpProxy: "/proxy/proxy.ashx",
	geometryService: {
		url: "//utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
	},
	map: {
		center: [-83.275, 42.573],
		zoom: 18,
		basemaps: [
			{ label: "Streets", type: "tiled", visible: true, url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer" }
		],
		operationalLayers: [
			{ label: "BloomfieldHillsMichigan", type: "dynamic", visible: true, opacity: 0.55, url: "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer" }
		]		
	}
});

