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

		constructor: function () {
			Control.apply(this, arguments);
			if (window.echarts) {
				this._initEChart();
			} else {
				sap.ui.getCore().getEventBus().subscribe("sap.vco.echarts", "libLoaded", this._initEChart, this);
			}
		},

		destroy: function () {
			var oChart = this.getProperty("_origin");
			if (oChart) {
				oChart.dispose();
			}
			Control.prototype.destroy.apply(this, arguments);
		},

		getOrigin: function () {
			return this.getProperty("_origin");
		},

		_initEChart: function () {

			var $container = $("<div class='echarts-container'/>").css({
				width: "100%",
				height: "100%"
			});
			var chart = echarts.init($container.get(0))
			this.setProperty("_origin", chart, true);

			var option = this.getOption();
			if (option) {
				this.setOption(option);
			}

			this._render();
			this.fireAfterEchartInit();
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

		onAfterRendering: function () {
			this._render();
		},
		_render: function () {
			var chart = this.getProperty("_origin");
			if (chart && this.getDomRef()) {
				this.$().append($(chart.getDom()));
				sap.ui.core.ResizeHandler.register(this.getDomRef(), function () {
					chart.resize();
				});
				chart.resize();
				var oBinding = this.getBinding("dataset");
				if (oBinding && oBinding.length) {
					chart.setOption({ dataset: { source: oBinding.oList } });
				}
				// } else {
				// 	this._initEChart();
			}
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