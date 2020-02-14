/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Layer Control
 *----------------------------------------------------------------------*/
/* global sap, $, L */

sap.ui.define(["./Layer"], function (Layer) {
	"use strict";
	return Layer.extend('sap.vco.leaflet.controls.InteractiveLayer', {

		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				_dom: {
					type: "object",
					visibility: "hidden"
				}
			},
			events: {
				press: {
					parameters: {
						mouseEvent: {
							type: "object"
						}
					}
				}
			},
			abstract: true
		},

		_bindEvents: function () {
			var oOrigin = this.getProperty("_origin");
			if (oOrigin) {
				oOrigin.off("click");
				oOrigin.on("click", function (e) {
					this.setProperty("_dom", e.originalEvent.toElement, true)
					this.fireEvent("press", e);
				}.bind(this));
			}
		},

		getDomRef: function () {
			return this.getProperty("_dom");
		}

	});
});