/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet LayerGroup Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./Layer"], function (Layer) {
	"use strict";
	return Layer.extend('sap.vco.leaflet.controls.LayerGroup', {

		metadata: {
			library: "sap.vco.leaflet",
			defaultAggregation : "layers",
			aggregations: {
				layers: {
					type: "sap.vco.leaflet.controls.Layer",
					multiple: true,
					singularName: "layer"
				}
			}
		},

		addLayer: function (layer) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.addLayer(layer.getOrigin());
			}
			var aLayers = this.getLayers();
			return this.insertAggregation("layers", layer, aLayers.length, true);
		},

		removeLayer: function (layer) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.removeLayer(layer.getOrigin());
			}
			return this.removeAggregation("layers", layer, true);
		},

		_initLayer: function () {
			var aLayers = this.getLayers();
			var aOriginLayers = [];
			aLayers.forEach(function (x) {
				aOriginLayers.push(x.getOrigin());
			});
			var oOptions = this.getOptions();
			var oOrigin = L.layerGroup(aOriginLayers, oOptions);
			this.setProperty("_origin", oOrigin, true);
		}
	});
});
