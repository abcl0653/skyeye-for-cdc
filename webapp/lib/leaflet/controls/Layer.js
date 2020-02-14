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
	return Element.extend('sap.vco.leaflet.controls.Layer', {

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
			},
			abstract: true
		},

		constructor: function () {
			Element.apply(this, arguments);
			var _origin = this.getProperty("_origin");
			if (window.L && (_origin === null || typeof _origin === "undefined")) {
				this._initLayer();
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
			this._initLayer();
		},

		getOrigin: function () {
			if (!this.getProperty("_origin")) {
				this._initLayer();
			}
			return this.getProperty("_origin");
		},

		_initLayer: function () { }

	});
});