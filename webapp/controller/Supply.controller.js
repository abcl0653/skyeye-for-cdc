sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Supply", {
		onInit: function () {
			BaseController.prototype.onInit.apply(this,arguments);
		}
	});
});