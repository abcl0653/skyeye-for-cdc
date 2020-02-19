/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./Path"], function (Path) {
	"use strict";

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

		_formatLatLng: function (input) {
			if (typeof input === "string") {
				return input.split(",");
			} else {
				return input;
			}
		},

		setRadius: function (radius) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.setRadius(radius);
			}
			this.setProperty("radius", radius, true);
		},

		setLatLng: function (latLng) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.setLatLng(this._formatLatLng(latLng));
			}
			this.setProperty("latLng", latLng, true);
		},

		_getOptions: function () {
			var oOption = Path.prototype._getOptions.apply(this, arguments);
			return Object.assign(oOption, { radius: this.getRadius() });
		},

		_init: function () {
			var oLatLng = this.getLatLng();
			var oOption = this._getOptions();

			var oOrigin = this.getProperty("_origin");
			oOrigin = L.circleMarker(this._formatLatLng(oLatLng), oOption);
			this.setProperty("_origin", oOrigin);
			this._bindEvents();
		}

	});
});