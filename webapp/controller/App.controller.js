sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/NumberFormat",
	"sap/ui/core/Fragment"
], function (Controller, NumberFormat, Fragment) {
	"use strict";

	var oNumberFormat = NumberFormat.getCurrencyInstance({
		"currencyCode": false
	});

	return Controller.extend("sap.project.farglory.Dashboard.controller.App", {
		onInit: function () {
			Fragment.load({
				name: "sap.project.farglory.Dashboard.view.fragment.Detail",
				controller: this
			}).then(function (oPopover) {
				this._oPopover = oPopover;
				this.getView().addDependent(this._oPopover);
			}.bind(this));
		},

		onPressProject: function (oEvent) {
			this._oPopover.bindElement("data>" + oEvent.getSource().getBindingContext("data").getPath());
			this._oPopover.openBy(oEvent.getSource());
		},

		formatNumber: function (sValue) {
			return oNumberFormat.format(sValue);
		}
	});
});