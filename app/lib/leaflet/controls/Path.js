/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./InteractiveLayer"], function (InteractiveLayer) {
	"use strict";
	return InteractiveLayer.extend('sap.vco.leaflet.controls.Path', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				style: {
					type: "string",
					defaultValue: "{}"
				}
			},
			abstract: true
		},

		setStyle: function (style) {
			var oPath = this.getProperty("_origin");
			if (oPath) {
				oPath.setStyle(JSON.parse(style));
			}
			this.setProperty("style", style, true);
		},

		_getOptions: function () {
			var oOption = InteractiveLayer.prototype._getOptions.apply(this, arguments);
			return Object.assign(oOption, JSON.parse(this.getStyle()));
		}

	});
});