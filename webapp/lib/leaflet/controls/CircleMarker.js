/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./Path"], function (Path) {
	"use strict";

	var formatLatLng = function (input) {
		if (typeof input === "string") {
			return input.split(",");
		} else {
			return input;
		}
	};

	return Path.extend('sap.vco.leaflet.controls.CircleMarker', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				latLng: {
					type: "string",
					defaultValue: "0,0"
				},
				radius: {
					type: "int",
					defaultValue: 10
				}
			}
		},

		setRadius: function (radius) {
			var oCircleMarker = this.getProperty("_origin");
			if (oCircleMarker) {
				oCircleMarker.setRadius(radius);
			}
			this.setProperty("radius", radius, true);
		},

		setLatLng: function (latLng) {
			var oCircleMarker = this.getProperty("_origin");
			if (oCircleMarker) {
				oCircleMarker.setLatLng(formatLatLng(latLng));
			}
			this.setProperty("latLng", latLng, true);
		},

		_getOptions: function () {
			var oOption = Path.prototype._getOptions.apply(this, arguments);
			return Object.assign(oOption, { radius: this.getRadius() });
		},

		_initLayer: function () {
			var oLatLng = this.getLatLng();
			var oOption = this._getOptions();

			var oOrigin = this.getProperty("_origin");
			oOrigin = L.circleMarker(formatLatLng(oLatLng), oOption);
			this.setProperty("_origin", oOrigin);
			this._bindEvents();
		}

	});
});