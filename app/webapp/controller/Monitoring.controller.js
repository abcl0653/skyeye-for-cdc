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
				name: "sap.ibso.skyeyeForCdc.view.fragment.Block",
				controller: this
			}).then(function (oPopover) {
				this._oBlockPopover = oPopover;
				this.getView().addDependent(this._oBlockPopover);
			}.bind(this));

			Fragment.load({
				name: "sap.ibso.skyeyeForCdc.view.fragment.Hospital",
				controller: this
			}).then(function (oPopover) {
				this._oHospitalPopover = oPopover;
				this.getView().addDependent(this._oHospitalPopover);
			}.bind(this));

			Fragment.load({
				name: "sap.ibso.skyeyeForCdc.view.fragment.Task",
				controller: this
			}).then(function (oDialog) {
				this._oTaskDialog = oDialog;
				this.getView().addDependent(this._oTaskDialog);
			}.bind(this));

			var oBlockModel = new sap.ui.model.json.JSONModel();
			this.loadBlockData(oBlockModel);
			this.getView().setModel(oBlockModel, "block");

			this.getView().setModel(new sap.ui.model.json.JSONModel("json/orgUnit.json"), "orgUnit");
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/hospital.json"), "hospital");
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/case.json"), "case");

			this.getView().setModel(new sap.ui.model.json.JSONModel("json/trend.json"), "trend");
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/trendOption.json"), "trendOption");

			this.getView().setModel(new sap.ui.model.json.JSONModel("json/graphTest.json"));

			this.getView().setModel(new sap.ui.model.json.JSONModel({
				BlockRiskVisible: true,
				AutoMapFollow: false,
				SpecialRiskVisible: false,
				HospitalVisible: true,
				EventVisible:false,
				CaseVisible: false,
				CaseTraceVisible: false,
				BlockRiskLevel: "4",
				AutoLevel: false,
				Date: "2月11日",
				Time: "12:00",
				Year: "2020年",
				WeekDay: "星期二"
			}), "pageConfig");

			// this.getView().byId("caseDetailContainer").bindElement("case>/0");

			// this.getView().byId("fdl").setStaticNodes([0,1,2,3,4,5,6]);
			this.onChangeLevel();
		},

		loadBlockData: function (oBlockModel) {
			var aData = [];
			oBlockModel.loadData("json/block-3.json", null, false);
			aData = aData.concat(oBlockModel.getData());
			oBlockModel.loadData("json/block-4.json", null, false);
			aData = aData.concat(oBlockModel.getData());
			oBlockModel.loadData("json/block-5.json", null, false);
			aData = aData.concat(oBlockModel.getData());
			oBlockModel.setData(aData);
		},

		onGraphReady: function (oEvent) {
			var oGraph = oEvent.getSource();
			setTimeout(function () {
				oGraph._fitToScreen();
			}, 0);

		},

		onPressBlock: function (oEvent) {
			this._oBlockPopover.bindElement("block>" + oEvent.getSource().getBindingContext("block").getPath());
			this._oBlockPopover.openBy(oEvent.getSource());
		},

		onPressBlockDetail: function () {
			this.getRouter().navTo("Block");
		},

		onPressHospital: function (oEvent) {
			this._oHospitalPopover.bindElement("hospital>" + oEvent.getSource().getBindingContext("hospital").getPath());
			this._oHospitalPopover.openBy(oEvent.getSource());
		},

		onPressCase: function (oEvent) {
			if (this.getView().getModel("device").getProperty("/system/phone")) {

			} else {
				var oDetailContainer = this.getView().byId("caseDetailContainer");
				oDetailContainer.bindElement("case>" + oEvent.getSource().getBindingContext("case").getPath().match(/\/\d+/)[0]);
				oDetailContainer.setVisible(true);
			}
		},

		onPressMap: function (oEvent) {
			this.getView().byId("caseDetailContainer").setVisible(false);
		},

		onPressTask: function () {
			this._oTaskDialog.open();
		},

		onPressTaskDetail: function () {
			this.getRouter().navTo("TaskDetail");
			this._oTaskDialog.close();
		},

		onCloseDialog: function (oEvent) {
			oEvent.getSource().getParent().close();
		},

		onChangeLevel: function (oEvent) {
			var sLevel = this.getView().byId("levelSelect").getSelectedKey();
			this.getView().byId("blockRisk").getBinding("layers").filter(new sap.ui.model.Filter("Level", "EQ", sLevel));
		},

		onChangeCaseVisible: function (oEvent) {
			// if(!oEvent.getParameter("selected")){
			this.getView().getModel("pageConfig").setProperty("/CaseTraceVisible", oEvent.getParameter("selected"));
			// }
		},

		formatNumber: function (sValue) {
			return oNumberFormat.format(sValue);
		}
	});
});