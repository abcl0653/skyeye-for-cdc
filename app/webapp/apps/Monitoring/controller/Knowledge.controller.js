sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Knowledge", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/knowledge.json"), "knowledge");
		},
		onPressItem: function (oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var oItemData = oItem.getBindingContext("knowledge").getObject();
			window.open(oItemData.Link)
		}
	});
});