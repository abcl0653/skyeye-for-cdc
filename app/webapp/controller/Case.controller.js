sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Case", {
		onInit: function () {
			BaseController.prototype.onInit.apply(this,arguments);
		},
		onPressItem: function (oEvent) {
			// var sId = oEvent.getParameter("listItem").getBindingContext("people").getObject().Id;
			this.getRouter().navTo("CaseDetail");
		}
	});
});