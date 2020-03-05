sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Staff", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/staff.json"),"staff");
		},
		onPressItem:function(oEvent){
			var sId = oEvent.getParameter("listItem").getBindingContext("staff").getObject().Id;
			this.getRouter().navTo("StaffDetail",{Id:sId});
		}
	});
});