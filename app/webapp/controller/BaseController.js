sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("sap.ibso.skyeyeForCdc.controller.BaseController", {

        EventBus: sap.ui.getCore().getEventBus(),

        onInit: function () {

        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }

    });
});