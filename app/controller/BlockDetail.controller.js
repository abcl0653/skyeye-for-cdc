sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.BlockDetail", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/people.json"),"people");
		}
	});
});