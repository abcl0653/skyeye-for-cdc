sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.MasterData", {
		onInit: function () {
			BaseController.prototype.onInit.apply(this,arguments);
		}
	});
});