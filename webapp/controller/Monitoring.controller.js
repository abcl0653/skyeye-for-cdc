sap.ui.define([
	"./BaseController",
	"sap/ui/core/format/NumberFormat",
	"sap/ui/core/Fragment"
], function (BaseController, NumberFormat, Fragment) {
	"use strict";

	var oNumberFormat = NumberFormat.getCurrencyInstance({
		"currencyCode": false
	});

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Monitoring", {
		onInit: function () {
			Fragment.load({
				name: "sap.ibso.skyeyeForCdc.view.fragment.BlockDetail",
				controller: this
			}).then(function (oPopover) {
				this._oBlockDetailPopover = oPopover;
				this.getView().addDependent(this._oBlockDetailPopover);
			}.bind(this));

			this.getView().setModel(new sap.ui.model.json.JSONModel("json/orgUnit.json"),"orgUnit");
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/block.json"), "block");
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/hospital.json"), "hospital");
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/case.json"), "case");

			this.getView().setModel(new sap.ui.model.json.JSONModel("json/trend.json"),"trend");
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/trendOption.json"),"trendOption");

			this.getView().setModel(new sap.ui.model.json.JSONModel("json/graphTest.json"));

			this.getView().setModel(new sap.ui.model.json.JSONModel({
				AreaRiskVisible:true,
				CaseVisible:true,
				CaseTraceVisible:true,
				HospitalVisible:true,
				AreaRiskLevel:"4",
				AutoLevel:false
			}),"pageConfig");

			// this.getView().byId("caseDetailContainer").bindElement("case>/0");

			// this.getView().byId("fdl").setStaticNodes([0,1,2,3,4,5,6]);
			this.onLevelChange();
		},

		onGraphReady:function(oEvent){
			var oGraph = oEvent.getSource();
			setTimeout(function(){
				oGraph._fitToScreen();
			},0);
			
		},

		onPressProject: function (oEvent) {
			this._oBlockDetailPopover.bindElement("block>" + oEvent.getSource().getBindingContext("block").getPath());
			this._oBlockDetailPopover.openBy(oEvent.getSource());
		},

		onPressCase: function (oEvent) {
			var oDetailContainer = this.getView().byId("caseDetailContainer");
			oDetailContainer.bindElement("case>" + oEvent.getSource().getBindingContext("case").getPath());
			oDetailContainer.setVisible(true);
		},

		onPressMap: function (oEvent) {
			this.getView().byId("caseDetailContainer").setVisible(false);
		},

		onLevelChange:function(oEvent){
			var sLevel = this.getView().byId("levelSelect").getSelectedKey();
			this.getView().byId("areaRisk").getBinding("layers").filter(new sap.ui.model.Filter("Level", "EQ", sLevel));
		},

		formatNumber: function (sValue) {
			return oNumberFormat.format(sValue);
		}
	});
});