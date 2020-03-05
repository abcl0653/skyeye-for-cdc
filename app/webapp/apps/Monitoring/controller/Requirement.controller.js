sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Requirement", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/requirement.json"), "requirement");
		},
		onPressItem: function (oEvent) {
			// var sId = oEvent.getParameter("listItem").getBindingContext("people").getObject().Id;
			this.getRouter().navTo("RequirementDetail");
		}
	});
});