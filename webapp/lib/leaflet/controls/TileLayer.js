/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./GridLayer"], function (GridLayer) {
	"use strict";
	return GridLayer.extend('sap.vco.leaflet.controls.TileLayer', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				url: {
					type: "string",
					defaultValue: ""
				}
			}
		},

		setUrl: function (url) {
			var oTileLayer = this.getProperty("_origin");
			if (oTileLayer) {
				oTileLayer.setUrl(url);
			}
			this.setProperty("url", url, true);
		},

		_initLayer: function () {
			var sUrl = this.getUrl();
			sUrl = sUrl.replace(/\[/g,"{").replace(/\]/g,"}");
			var oOption = this._getOptions();
			var oOrigin = this.getProperty("_origin");
			oOrigin = L.tileLayer(sUrl, oOption);
			this.setProperty("_origin", oOrigin);
		}

	});
});