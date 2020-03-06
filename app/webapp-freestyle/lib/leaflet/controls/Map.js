/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Map Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define([
	"sap/ui/dom/includeStylesheet", "sap/ui/dom/includeScript", "sap/ui/core/Control"
], function (includeStylesheet, includeScript, Control) {
	"use strict";

	var sUrl = sap.ui.require.toUrl("sap/vco/leaflet");
	includeStylesheet(sUrl + "/thirdparty/leaflet.css", "leaflet-css");
	includeScript(sUrl + "/thirdparty/leaflet.js", "leaflet-js", function () {
		sap.ui.getCore().getEventBus().publish("sap.vco.leaflet", "libLoaded");
	});

	return Control.extend("sap.vco.leaflet.controls.Map", {
		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "100%"
				},
				height: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "100%"
				},
				center: {
					type: "object",
					defaultValue: [31.20418, 121.59734]
				},
				zoom: {
					type: "int",
					defaultValue: 1
				},
				minZoom: {
					type: "int",
					defaultValue: 1
				},
				maxZoom: {
					type: "int",
					defaultValue: 18
				},
				_origin: {
					type: "object",
					visibility: "hidden",
					defaultValue: null
				},
				description: {
					type: "string",
					defaultValue: null
				},
				zoomControl: {
					type: "boolean",
					defaultValue: true
				}
			},
			defaultAggregation : "layers",
			aggregations: {
				layers: {
					type: "sap.vco.leaflet.controls.Layer",
					multiple: true,
					singularName: "layer"
				},
				layerGroups: {
					type: "sap.vco.leaflet.controls.LayerGroup",
					multipe: true,
					singularName: "layerGroup"
				},
				floatingItems: {
					type: "sap.vco.leaflet.controls.FloatingItem",
					multipe: true,
					singularName: "floatingItem"
				}
			},
			events: {
				afterInitialized: {},
				addLayer: {},
				removeLayer: {},
				clearLayer: {},
				movestart: {},
				move: {},
				moveend: {},
				zoomstart: {},
				zoomend: {},
				press: {
					parameters: {
						mouseEvent: {
							type: "object"
						}
					}
				}
			}
		},

		constructor: function () {
			Control.apply(this, arguments);
			if (window.L) {
				this._initLeaftMap();
			} else {
				sap.ui.getCore().getEventBus().subscribe("sap.vco.leaflet", "libLoaded", this._initLeaftMap, this);
			}
		},

		destroy: function () {
			var oMap = this.getProperty("_origin");
			if (oMap && oMap.dispose) {
				oMap.dispose();
			}
			Control.prototype.destroy.apply(this, arguments);
		},

		getOrigin: function () {
			return this.getProperty("_origin");
		},

		_initLeaftMap: function (callback) {
			var that = this;
			var $container = $("<div class='leaflet-container'/>").css({
				width: "100%",
				height: "100%"
			});

			var aOriginLayers = [];

			var aLayers = this.getLayers();
			var length = aLayers.length;
			for (var i = 0; i < length; i++) {
				aOriginLayers.push(aLayers[i].getOrigin());
			}

			var aLayerGroups = this.getLayerGroups();
			aLayerGroups.forEach(function (x) {
				aOriginLayers.push(x.getOrigin());
			});

			var map = L.map($container.get(0), {
				minZoom: this.getMinZoom(),
				maxZoom: this.getMaxZoom(),
				zoomControl: this.getZoomControl(),
				layers: aOriginLayers
			}).setView(this.getCenter(), this.getZoom());

			this._setZoomControlTootip(map);

			map.on("movestart", function (e) {
				that.fireEvent("movestart", e);
			});

			map.on("move", function (e) {
				that.fireEvent("move", e);
			});

			map.on("moveend", function (e) {
				that.fireEvent("moveend", e);
			});

			map.on("zoomstart", function (e) {
				that.fireEvent("zoomstart", e);
			});

			map.on("zoomend", function (e) {
				that.fireEvent("zoomend", e);
			});

			map.on("dragend", function (e) {
				that.fireEvent("dragend", e);
			});

			map.on("click", function (e) {
				that.fireEvent("press", e);
			});

			this.setProperty("_origin", map, true);
			this._render();
		},

		renderer: function (oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.addClass("geoMap");
			oRm.writeClasses();
			oRm.writeAccessibilityState(oControl, {
				describedby: {
					value: oControl.getId() + "-descirption",
					append: true
				}
			});
			oRm.writeAttribute("tabindex", 0);
			oRm.addStyle("width", oControl.getWidth());
			oRm.addStyle("height", oControl.getHeight());
			oRm.addStyle("position", "relative");
			oRm.writeStyles();
			oRm.write(">");
			oRm.write("<span class='geo-description' style='display: none'");
			oRm.writeAttribute("id", oControl.getId() + "-descirption");
			oRm.write(">");
			oRm.write(oControl.getDescription());
			oRm.write("</span>");
			var aContent = oControl.getFloatingItems();
			var l = aContent.length;
			for (var i = 0; i < l; i++) {
				oRm.renderControl(aContent[i]);
			}
			oRm.write("</div>");
		},

		onAfterRendering: function () {
			this._render();
		},

		_render: function () {
			var map = this.getProperty("_origin");
			var aChildren = this.$().children();
			// if (map && aChildren.length > 0 && aChildren[aChildren.length - 1].className.indexOf("leaflet-container") === -1) {
			if (map && this.getDomRef()) {
				this.$().append($(map.getContainer()));
				sap.ui.core.ResizeHandler.register(this.getDomRef(), function () {
					map.invalidateSize();
				});
				map.invalidateSize();
			}
		},

		_setZoomControlTootip: function (map) {
			var rouseBundle = sap.ui.getCore().getLibraryResourceBundle("sap.vco.leaflet");
			var zoomControl = map.zoomControl;
			if (zoomControl) {
				zoomControl._zoomInButton.title = rouseBundle.getText("ZOOM_IN");
				zoomControl._zoomOutButton.title = rouseBundle.getText("ZOOM_OUT");
			}
		},

		setHeight: function (height) {
			var map = this.getProperty("_origin");
			if (map) {
				this.$().outerHeight(height);
				map.invalidateSize();
			}
			return this.setProperty("height", height, true);
		},

		getLayerById: function (id) {
			var aLayers = this.getLayers();
			var oLayer;
			if (id) {
				aLayers.forEach(function (x) {
					oLayer = (x.getId() === id) ? x : oLayer;
				});
			}
			return oLayer;
		},

		addLayer: function (layer) {
			var map = this.getProperty("_origin");
			if (map) {
				map.addLayer(layer.getOrigin());
			}
			var aLayers = this.getLayers();
			return this.insertAggregation("layers", layer, aLayers.length, true);
		},

		removeLayer: function (layer) {
			var map = this.getProperty("_origin");
			if (map) {
				map.removeLayer(layer.getOrigin());
			}
			return this.removeAggregation("layers", layer, true);
		},

		addLayerGroup: function (layerGroup) {
			var map = this.getProperty("_origin");
			if (map) {
				map.addLayer(layerGroup.getOrigin());
			}
			var aLayerGroup = this.getLayerGroups();
			return this.insertAggregation("layerGroups", layerGroup, aLayerGroup.length, true);
		},

		removeLayerGroup: function (layerGroup) {
			var map = this.getProperty("_origin");
			if (map) {
				map.removeLayer(layerGroup.getOrigin());
			}
			return this.removeAggregation("layerGroups", layerGroup, true);
		},

		fitBounds: function (latlngs) {
			var map = this.getProperty("_origin");
			if (map) {
				map.fitBounds(latlngs);
			}
		}
	});
});