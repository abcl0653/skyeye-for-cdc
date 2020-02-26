sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ibso/skyeyeForCdc/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("sap.ibso.skyeyeForCdc.Component", {

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
			
			this.setModel(models.createPageConfigModel(), "pageConfig");
			
			this.setModel(new sap.ui.model.json.JSONModel("json/case.json"), "case");
			this.setModel(new sap.ui.model.json.JSONModel("json/task.json"), "task");
			this.setModel(new sap.ui.model.json.JSONModel("json/event.json"), "event");
			this.setModel(new sap.ui.model.json.JSONModel("json/hospital.json"), "hospital");
		}
	});
});