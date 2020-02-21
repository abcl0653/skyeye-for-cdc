/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library sap.vco.echarts.
 */
sap.ui.define(["sap/ui/core/library"], // library dependency
	function (library, includeStylesheet, includeScript) {

		"use strict";

		/**
		 * 
		 *
		 * @namespace
		 * @name sap.vco.echarts
		 * @author SAP SE
		 * @version 1.0.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "sap.vco.echarts",
			version: "1.0.0",
			dependencies: ["sap.ui.core"],
			types: [],
			interfaces: [],
			controls: [
				"sap.vco.echarts.controls.Instance"
			],
			elements: []
		});

		/* eslint-disable */
		return sap.vco.echarts;
		/* eslint-enable */

	}, /* bExport= */ false);