/*----------------------------------------------------------------------*
 * Copyright  (c) 2016 SAP SE. All rights reserved
 * Author       : SAP Custom Development
 * Description  : LeafletMap Control
 *----------------------------------------------------------------------*/
/* global sap, echarts */
sap.ui.define([
	"sap/ui/dom/includeScript", "sap/ui/core/Control"
], function (includeScript, Control) {
	"use strict";

	var sUrl = sap.ui.require.toUrl("sap/vco/echarts");
	includeScript(sUrl + "/thirdparty/echarts.min.js", "echarts-js", function () {
		sap.ui.getCore().getEventBus().publish("sap.vco.echarts", "libLoaded");
	});

	return Control.extend("sap.vco.echarts.controls.Instance", {
		metadata: {
			library: "sap.vco.echarts",
			properties: {
				width: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: '100%'
				},
				height: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: '100%'
				},
				option: {
					type: "object",
					defaultValue: {
						xAxis: {
							type: 'category'
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							type: 'line',
							encode: {
								x: "x",
								y: "y"
							}
						}]
					}
				},
				_origin: {
					type: "object",
					visibility: "hidden",
					defaultValue: null
				}
			},
			aggregations: {
				dataset: {
					type: "sap.ui.core.Element",
					multipe: true,
					bindable: "bindable",
					_doesNotRequireFactory: true
				}
			},
			events: {
				"afterEchartInit": {},
				"afterResize": {}
			}
		},

		destroy: function () {
			if (this._origin) {
				this._origin.dispose();
			}
			Control.prototype.destroy.apply(this, arguments);
		},

		renderer: function (oRm, oControl) {
			oRm.write("<div ");
			oRm.writeControlData(oControl);
			oRm.addClass("echartContainer");
			oRm.writeClasses();
			oRm.addStyle("width", oControl.getWidth());
			oRm.addStyle("height", oControl.getHeight());
			oRm.writeStyles();
			oRm.write(">");
			oRm.write("</div>");
		},

		getOrigin: function () {
			return this.getProperty("_origin");
		},

		_initEChart: function () {

			var frame = this.$()[0];
			var chart = echarts.init(frame);
			this.setProperty("_origin", chart, true);

			var option = this.getOption();
			if (option) {
				this.setOption(option);
			}

			this._render();
			this.fireAfterEchartInit();
		},

		_render: function () {
			var chart = this.getProperty("_origin");
			if (chart) {
				this.$().append($(chart.getDom()));
				sap.ui.core.ResizeHandler.register(this.getDomRef(), function () {
					chart.resize();
				});
				chart.resize();
				if (this.getBinding("dataset")) {
					chart.setOption({ dataset: { source: this.getBinding("dataset").oList } });
				}
			} else {
				this._initEChart();
			}
		},

		onAfterRendering: function () {
			this._render();
		},

		updateDataset: function () {
			var chart = this.getProperty("_origin");
			if (chart && this.getBinding("dataset") && this.getBinding("dataset").getLength()) {
				chart.setOption({ dataset: { source: this.getBinding("dataset").oList } });
			}
		},

		setOption: function (option) {
			var oEchart = this.getOrigin();
			if (oEchart && option) {
				oEchart.setOption(option, option.clear);
				this.setProperty("option", oEchart.getOption(), option.clear);
				delete option.clear;
				this.updateDataset();
			} else {
				this.setProperty("option", option, true);
			}
		}
	});
});