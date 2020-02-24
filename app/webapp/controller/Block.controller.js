sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Block", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/blockDetail.json"),"blockDetail");
		},
		onPressItem:function(oEvent){
			var sId = oEvent.getParameter("listItem").getBindingContext("blockDetail").getObject().Id;
			this.getRouter().navTo("BlockDetail",{Id:sId});
		}
	});
});