sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Check", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/check.json"),"check");
		},
		onPressItem: function (oEvent) {
			// var sId = oEvent.getParameter("listItem").getBindingContext("people").getObject().Id;
			// this.getRouter().navTo("TaskDetail");
		}
	});
});