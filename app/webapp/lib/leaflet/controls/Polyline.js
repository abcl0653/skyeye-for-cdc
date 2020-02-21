/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./Path"], function (Path) {
	"use strict";

	return Path.extend('sap.vco.leaflet.controls.Polyline', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				latLngs: {
					type: "any",
					defaultValue:[[0,0]]
				}
			}
		},

		_formatLatLngs: function (input) {
			if (Array.isArray(input)) {
				input.forEach(function (x) {
					if (typeof x === "string") {
						x = x.split(",");
					}
				});
				return input;
			} else if (typeof input === "string") {
				return JSON.parse(input);
			} else {
				return input;
			}
		},

		setLatLngs: function (latLngs) {
			var oPolyline = this.getProperty("_origin");
			if (oPolyline) {
				oPolyline.setLatLngs(this._formatLatLngs(latLngs));
			}
			this.setProperty("latLngs", latLngs, true);
		},

		_init: function () {
			var aLatLngs = this.getLatLngs();
			var oOption = this._getOptions();

			var oOrigin = this.getProperty("_origin");
			oOrigin = L.polyline(this._formatLatLngs(aLatLngs), oOption);
			this.setProperty("_origin", oOrigin);
			this._bindEvents();
		}

	});
});