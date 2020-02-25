sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.CaseDetail", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/case.json"),"case");
			
			this.getView().bindElement("case>/0")
		},
		onPressCaseList:function(){
			this.getRouter().navTo("Case");
		},
		onPressBlockDetail:function(oEvent){
			// var sId = oEvent.getParameter("listItem").getBindingContext("blockDetail").getObject().Id;
			// this.getRouter().navTo("BlockDetail",{Id:sId});
			this.getRouter().navTo("BlockDetail");
		},
	});
});