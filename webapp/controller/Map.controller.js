sap.ui.define([
	"./BaseController",
	"sap/ui/core/format/NumberFormat",
	"sap/ui/core/Fragment"
], function (BaseController, NumberFormat, Fragment) {
	"use strict";

	var oNumberFormat = NumberFormat.getCurrencyInstance({
		"currencyCode": false
	});

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Map", {
		onInit: function () {
			BaseController.prototype.onInit.apply(this,arguments);
			Fragment.load({
				name: "sap.ibso.skyeyeForCdc.view.fragment.Detail",
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