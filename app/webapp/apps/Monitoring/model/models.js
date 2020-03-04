sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	var oEventBus = sap.ui.getCore().getEventBus();

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createPageConfigModel:function(){
			var oModel = new sap.ui.model.json.JSONModel("json/pageConfig.json");
			oModel.attachRequestCompleted(function(){
				oEventBus.publish("SkyEye", "PageConfigLoaded");
			});
			return oModel;
		}

	};
});