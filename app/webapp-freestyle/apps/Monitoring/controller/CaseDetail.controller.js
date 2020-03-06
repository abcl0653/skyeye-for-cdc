sap.ui.define([
	"./BaseController",
	"sap/ui/model/odata/v4/ODataModel"
], function (BaseController, ODataModel) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.CaseDetail", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/case.json"),"case");
			
			this.getView().bindElement("case>/0")

			// let oModel = new ODataModel({
			// 	serviceUrl: "/master/",
			// 	synchronizationMode: "None"
			// })
			// this.getView().setModel(oModel, "master")
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