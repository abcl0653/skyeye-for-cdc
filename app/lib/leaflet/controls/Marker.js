/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./InteractiveLayer"], function (InteractiveLayer) {
	"use strict";
	return InteractiveLayer.extend('sap.vco.leaflet.controls.Marker', {

		metadata: {
			library: "sap.vco.leaflet",
			defaultAggregation: "icon",
			properties: {
				latLng: {
					type: "string",
					defaultValue: "0,0"
				},
				zIndexOffset: {
					type: "int",
					defaultValue: 0
				},
				opacity: {
					type: "float",
					defaultValue: 1.0
				},
			},
			aggregations: {
				icon: {
					type: "sap.vco.leaflet.controls.Icon",
					multiple: false
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

		setIcon: function (oIcon) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.setIcon(oIcon);
			}
			this.setAggregation("icon", oIcon, true);
		},

		setLatLng: function (latLng) {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.setLatLng(this._formatLatLng(latLng));
			}
			this.setProperty("latLng", latLng, true);
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
			var oOption = InteractiveLayer.prototype._getOptions.apply(this, arguments);
			oOption.opacity = this.getOpacity();
			oOption.zIndexOffset = this.getZIndexOffset();
			var oIcon = this.getAggregation("icon");
			if (oIcon) {
				oOption.icon = oIcon.getOrigin();
			}
			return oOption;
		},

		_init: function () {
			var oLatLng = this.getLatLng();
			var oOption = this._getOptions();

			var oOrigin = this.getProperty("_origin");
			oOrigin = L.marker(this._formatLatLng(oLatLng), oOption);
			this.setProperty("_origin", oOrigin);
			this._bindEvents();
		}

	});
});