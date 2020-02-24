sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.BlockDetail", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/blockDetail.json"),"blockDetail");

			this.getView().bindElement("blockDetail>/0")
		},
		onPressBlockList:function(){
			this.getRouter().navTo("Block");
		}
	});
});