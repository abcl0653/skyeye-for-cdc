/*----------------------------------------------------------------------*
 * Copyright  (c) 2020 SAP SE. All rights reserved
 * Author       : String Shi
 * Description  : Leaflet Map Control
 *----------------------------------------------------------------------*/

/**
 * Initialization Code and shared classes of library sap.vco.leaflet.
 */
sap.ui.define(["sap/ui/core/library"], // library dependency
	function (library, includeStylesheet, includeScript) {

		"use strict";

		/**
		 * 
		 *
		 * @namespace
		 * @name sap.vco.leaflet
		 * @author SAP SE
		 * @version 1.0.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "sap.vco.leaflet",
			version: "1.0.0",
			dependencies: ["sap.ui.core"],
			types: [],
			interfaces: [],
			controls: [
				"sap.vco.leaflet.controls.Map",
				"sap.vco.leaflet.controls.Layer",
				"sap.vco.leaflet.controls.Marker",
				"sap.vco.leaflet.controls.FloatingItem"
			],
			elements: []
		});

		/* eslint-disable */
		return sap.vco.leaflet;
		/* eslint-enable */

	}, /* bExport= */ false);