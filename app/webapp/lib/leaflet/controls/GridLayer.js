/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./Layer"], function (Layer) {
	"use strict";
	return Layer.extend('sap.vco.leaflet.controls.GridLayer', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				opacity: {
					type: "float",
					defaultValue: 1.0
				},
				zIndex: {
					type: "int",
					defaultValue: 1
				}
			}
		},

		setOpacity: function (opacity) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.setOpacity(opacity);
			}
			this.setProperty("opacity", opacity, true);
		},

		setZIndex: function (zIndex) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.setZIndex(zIndex);
			}
			this.setProperty("zIndex", zIndex, true);
		},

		_getOptions: function () {
			var oOption = Layer.prototype._getOptions.apply(this, arguments);
			oOption.opacity = this.getOpacity();
			oOption.zIndex = this.getZIndex();
			return oOption;
		},

		_init: function () { 
			var oOption = this._getOptions();
			var oOrigin = this.getProperty("_origin");
			oOrigin = L.gridLayer(oOption);
			this.setProperty("_origin",oOrigin);
		}

	});
});