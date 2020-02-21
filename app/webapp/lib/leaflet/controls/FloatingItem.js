/*!
 * ${copyright}
 */
// Provides control sap.vco.leaflet.Example.
sap.ui.define([
	"./../library", "sap/ui/core/Control"
], function (library, Control) {
	"use strict";

	return Control.extend("sap.vco.leaflet.controls.FloatingItem", {
		metadata: {
			library: "sap.vco.leaflet",
			properties: {
				left: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null
				},
				right: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null
				},
				top: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null
				},
				bottom: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null
				}
			},
			defaultAggregation: "content",
			aggregations: {
				content: {
					type: "sap.ui.core.Control",
					multiple: false
				},
			}
		},
		renderer: function (oRm, oControl) {
			oRm.write('<div');
			oRm.writeControlData(oControl);
			oRm.addStyle("position", "absolute");
			oRm.addStyle("z-index", "1001");
			oRm.addStyle("left", oControl.getLeft());
			oRm.addStyle("right", oControl.getRight());
			oRm.addStyle("top", oControl.getTop());
			oRm.addStyle("bottom", oControl.getBottom());
			oRm.writeStyles();
			oRm.write('>');
			oRm.renderControl(oControl.getContent());
			oRm.write("</div>");
		},
	});
}, /* bExport= */ true);