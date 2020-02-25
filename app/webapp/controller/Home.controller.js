sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Home", {
		onInit: function () {
			var oPageConfigModel = this.getOwnerComponent().getModel("pageConfig");
			if (oPageConfigModel && oPageConfigModel.getData()) {
				this.initGenericTiles(oPageConfigModel.getData());
			} else {
				this.EventBus.subscribe("SkyEye", "PageConfigLoaded", function (channel, event, parameter) {
					this.initGenericTiles(this.getOwnerComponent().getModel("pageConfig").getData());
				}.bind(this));
			}

		},
		initGenericTiles: function (aPageConfig) {
			var oPage = this.getView().byId("page");
			aPageConfig.forEach(function (x) {
				if (x.ShowInLaunchpad && x.Content) {
					var oScrollContainer = new sap.m.ScrollContainer({ width: "100%", height: "100%" });
					x.Content.forEach(function (y) {
						oScrollContainer.addContent(new sap.m.GenericTile({
							header: y.text,
							ariaLabel: y.key,
							backgroundImage: y.icon,
							press: this.onPressTile.bind(this)
						}));
					}.bind(this));
					oPage.addSection(new sap.uxap.ObjectPageSection({
						title:x.Title,
						subSections: [new sap.uxap.ObjectPageSubSection({
							blocks: [oScrollContainer]
						})]
					}));
				}
			}.bind(this));
		},
		onPressTile: function (oEvent) {
			this.getRouter().navTo(oEvent.getSource().getAriaLabel());
		}
	});
});