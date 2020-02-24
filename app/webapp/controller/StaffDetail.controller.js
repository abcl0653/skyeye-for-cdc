sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.StaffDetail", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/staff.json"),"staff");

			this.getView().bindElement("staff>/0")
		},
		onPressStaffList:function(){
			this.getRouter().navTo("Staff");
		}
	});
});