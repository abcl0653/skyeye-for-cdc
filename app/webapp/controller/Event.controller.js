sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Event", {
		onInit: function () {
		},
		onPressItem: function (oEvent) {
			// var sId = oEvent.getParameter("listItem").getBindingContext("people").getObject().Id;
			this.getRouter().navTo("EventDetail");
		}
	});
});