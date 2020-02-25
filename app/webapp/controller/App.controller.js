sap.ui.define([
	"./BaseController",
	"sap/ui/core/Fragment"
], function (BaseController, Fragment) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.App", {
		onInit: function () {
			this.getRouter().attachTitleChanged(this.onTitleChanged.bind(this));

			this._oNavigationList = new sap.tnt.NavigationList();
			this._oSideNavigation = new sap.tnt.SideNavigation({
				item: this._oNavigationList,
				itemSelect:this.onSideNavigationSelected.bind(this)
			});

			Fragment.load({
				name: "sap.ibso.skyeyeForCdc.view.fragment.ProductSwitcher",
				controller: this
			}).then(function (oProductSwitcher) {
				this._oProductSwitcher = oProductSwitcher;
				this.getView().addDependent(this._oProductSwitcher);
			}.bind(this));

			if(!sap.ui.Device.system.phone){
				this.getView().byId("toolPage").addStyleClass("sapUiSizeCompact");
			}
		},

		onTitleChanged: function (oEvent) {
			var sId = oEvent.getParameter("title");
			var aConfig = this.getView().getModel("pageConfig").getData();
			var index = aConfig.findIndex(function (x) {
				if (x.Content) {
					var j = x.Content.findIndex(function (y) { return y.key === sId });
					return x.Id === sId || j > 0;
				} else {

					return x.Id === sId;
				}
			});
			this.getView().bindElement("pageConfig>/" + index);
			if (index > 0 && aConfig[index].Content) {
				this._oNavigationList.destroyItems();
				aConfig[index].Content.forEach(function (x) {
					this._oNavigationList.addItem(new sap.tnt.NavigationListItem(x));
				}.bind(this));
				this.getView().byId("toolPage").setSideContent(this._oSideNavigation);
			} else {
				this.getView().byId("toolPage").setSideContent(null);
			}
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

		onSideNavigationSelected: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			var sKey = oItem.getKey();
			this.getRouter().navTo(sKey);
			if (this.getOwnerComponent().getModel("device").getProperty("/system/phone")) {
				this.getView().byId("toolPage").setSideExpanded(false);
			}
		},

		onHome:function(){
			this.getRouter().navTo("Home");
		}
	});
});