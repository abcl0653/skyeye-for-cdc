/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define([
	"sap/ui/core/Element"
], function (Element) {
	"use strict";
	return Element.extend('sap.vco.leaflet.controls.Icon', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				options: {
					type: "string",
					defaultValue: "{}"
				},
				_origin: {
					type: "object",
					visibility: "hidden"
				}
			},
			aggregations: {
				customData: {
					type: "sap.ui.core.CustomData",
					multiple: true,
					singularName: "customData"
				}
			},
			events: {
				add: {},
				remove: {}
			}
		},

		_getOptions: function () {
			var oOption = JSON.parse(this.getOptions())
			var aCustomData = this.getCustomData();
			aCustomData.forEach(function (x) {
				oOption[x.getKey()] = x.getValue();
			});
			return oOption;
		},

		setOptions: function (option) {
			this.setProperty("options", option, true);
			this._init();
		},

		getOrigin: function () {
			if (!this.getProperty("_origin")) {
				this._init();
			}
			return this.getProperty("_origin");
		},

		_init: function () {
			var oOption = this._getOptions();
			var oOrigin = this.getProperty("_origin");
			oOrigin = L.icon(oOption);
			this.setProperty("_origin",oOrigin);
		 }

	});
});