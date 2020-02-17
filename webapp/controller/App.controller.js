sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function (Controller, Fragment) {
	"use strict";

	return Controller.extend("sap.ibso.skyeyeForCdc.controller.App", {
		onInit: function () {
			var oPageConfigModel = new sap.ui.model.json.JSONModel();
			oPageConfigModel.loadData("json/pageConfig.json", null, false);

			// var oPageConfig = oPageConfigModel.getData();
			// this._oConfig = {};
			// oPageConfigModel.forEach(function(x){
			// 	if(x.Content){
			// 		x.Content.forEach(function(y){
			// 			this._oConfig[y.Id] = x.Id;
			// 		}.bind(this));
			// 	}else{
			// 		this._oConfig[x.Id] = x.Id;
			// 	}
			// }.bind(this));

			this.getView().setModel(oPageConfigModel, "pageConfig");

			this.getRouter().attachTitleChanged(function (oEvent) {
				var sId = oEvent.getParameter("title");
				var aConfig = this.getView().getModel("pageConfig").getData();
				var index = aConfig.findIndex(function (x) {
					return x.Id === sId;
				});
				this.getView().bindElement("pageConfig>/" + index);
				if (aConfig[index].Content) {
					this._oNavigationList.destroyItems();
					aConfig[index].Content.forEach(function (x) {
						this._oNavigationList.addItem(new sap.tnt.NavigationListItem(x));
					}.bind(this));
					this.getView().byId("toolPage").setSideContent(this._oSideNavigation);
				} else {
					this.getView().byId("toolPage").setSideContent(null);
				}
			}.bind(this));

			this._oNavigationList = new sap.tnt.NavigationList();
			this._oSideNavigation = new sap.tnt.SideNavigation({
				item: this._oNavigationList
			});
			this._oSideNavigation.attachItemSelect(this.onSideNavigationSelected.bind(this));

			Fragment.load({
				name: "sap.ibso.skyeyeForCdc.view.fragment.ProductSwitcher",
				controller: this
			}).then(function (oProductSwitcher) {
				this._oProductSwitcher = oProductSwitcher;
				this.getView().addDependent(this._oProductSwitcher);
			}.bind(this));
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNotificationPress: function () {

		},

		onProductSwitchPress: function (oEvent) {
			this._oProductSwitcher.openBy(oEvent.getSource(), false);
		},

		onProductChanged: function (oEvent) {
			var oItem = oEvent.getParameter("itemPressed");
			var sKey = oItem.getTarget();
			this.getRouter().navTo(sKey);
		},

		onSideNavButtonPress: function (oEvent) {
			var oToolPage = oEvent.getSource().getParent().getParent();
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		onSideNavigationSelected: function () {

		}
	});
});