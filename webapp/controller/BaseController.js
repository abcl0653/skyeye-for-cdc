sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("sap.ibso.skyeyeForCdc.controller.BaseController", {
        onInit: function () {
            Fragment.load({
                name: "sap.ibso.skyeyeForCdc.view.fragment.Menu",
                controller: this
            }).then(function (oMenu) {
                this._oMenu = oMenu;
            }.bind(this));
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onMenuOpen: function (oEvent) {
            this._oMenu.openBy(oEvent.getParameter("button"), false);
        },
        
        onMenuItemSelected: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            var sKey = oItem.getKey();
            this.getRouter().navTo(sKey);
        }
    });
});