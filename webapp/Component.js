sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/project/farglory/Dashboard/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("sap.project.farglory.Dashboard.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var oCityModel = new sap.ui.model.json.JSONModel();
			var oAreaModel = new sap.ui.model.json.JSONModel();
			var oEngineeringStatusModel = new sap.ui.model.json.JSONModel();
			var oStatisticModel = new sap.ui.model.json.JSONModel();
			var oSourceModel = new sap.ui.model.json.JSONModel("json/data.json");
			oSourceModel.setSizeLimit(1000);
			oSourceModel.attachRequestCompleted(function () {
				var aSourceData = oSourceModel.getData();
				var oCity = {},
					oArea = {},
					oEngineeringStatus = {},
					oStatistic = { Count: 0, ActualRevenue: 0, TotalArea: 0 };
				aSourceData.forEach(function (x) {
					if (x.Lon < -30) {
						x.Lon = x.Lon + 360;
					}
					oCity[x.City] = oCity[x.City] || {
						key: x.City,
						text: x.City
					};
					x.Area = x.Area || x.City;
					oArea[x.City + "-" + x.Area] = oArea[x.City + "-" + x.Area] || {
						key: x.City + "-" + x.Area,
						text: x.Area
					};
					oEngineeringStatus[x.EngineeringStatus] = oEngineeringStatus[x.EngineeringStatus] || {
						key: x.EngineeringStatus,
						text: x.EngineeringStatus
					};
					oStatistic.Count++;
					oStatistic.ActualRevenue += x.ActualRevenue;
					oStatistic.TotalArea += x.TotalArea;
				});
				oStatistic.ActualRevenue = oStatistic.ActualRevenue.toFixed(2);
				oStatistic.TotalArea = oStatistic.TotalArea.toFixed(2);
				oSourceModel.setData(aSourceData);
				oCityModel.setData(Object.values(oCity));
				oAreaModel.setData(Object.values(oArea));
				oEngineeringStatusModel.setData(Object.values(oEngineeringStatus));
				oStatisticModel.setData(oStatistic);
			});
			this.setModel(oSourceModel, "data");
			this.setModel(oCityModel, "city");
			this.setModel(oAreaModel, "area");
			this.setModel(oEngineeringStatusModel, "engineeringStatus");
			this.setModel(oStatisticModel, "statistic");
		}
	});
});