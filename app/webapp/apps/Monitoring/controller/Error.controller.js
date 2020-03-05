sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Launchpad", {
		onAfterRendering: function () {
			setTimeout(function(){
				this.getRouter().navTo("Home")
			}.bind(this),5000);
		}
	});
});