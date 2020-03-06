/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./Polyline"], function (Polyline) {
	"use strict";

	return Polyline.extend('sap.vco.leaflet.controls.Polygon', {

		metadata: {
			library: "sap.vco.leaflet"
		},

		_init: function () {
			var aLatLngs = this.getLatLngs();
			var oOption = this._getOptions();

			var oOrigin = this.getProperty("_origin");
			oOrigin = L.polygon(this._formatLatLngs(aLatLngs), oOption);
			this.setProperty("_origin", oOrigin);
			this._bindEvents();
		}

	});
});