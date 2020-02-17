sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("sap.ibso.skyeyeForCdc.controller.BaseController", {
        onInit: function () {
            Fragment.load({
                name: "sap.ibso.skyeyeForCdc.view.fragment.ProductSwitcher",
                controller: this
            }).then(function (oProductSwitcher) {
                this._oProductSwitcher = oProductSwitcher;
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
        }
    });
});