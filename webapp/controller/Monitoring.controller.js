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
		},

		onPressProject: function (oEvent) {
			this._oBlockDetailPopover.bindElement("block>" + oEvent.getSource().getBindingContext("block").getPath());
			this._oBlockDetailPopover.openBy(oEvent.getSource());
		},

		formatNumber: function (sValue) {
			return oNumberFormat.format(sValue);
		}
	});
});