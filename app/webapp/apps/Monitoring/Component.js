sap.ui.define([
	"sap/fe/AppComponent",
	"sap/ui/Device",
	"sap/ibso/skyeyeForCdc/model/models",
	"sap/ushell/services/CrossApplicationNavigation"
], function (UIComponent, Device, models, CrossApplicationNavigation) {
	"use strict";

	var oCrossApplicationNavigation = new CrossApplicationNavigation();

	return UIComponent.extend("sap.ibso.skyeyeForCdc.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			this.initUshell();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			this.setModel(models.createPageConfigModel(), "pageConfig");

			this.setModel(new sap.ui.model.json.JSONModel("json/case.json"), "case");
			this.setModel(new sap.ui.model.json.JSONModel("json/task.json"), "task");
			this.setModel(new sap.ui.model.json.JSONModel("json/event.json"), "event");
			this.setModel(new sap.ui.model.json.JSONModel("json/hospital.json"), "hospital");
			this.setModel(new sap.ui.model.json.JSONModel("json/people.json"), "people");
		},

		initUshell: function () {
			// jQuery.sap.require("sap.ushell.services.Container");
			// sap.ushell.Container = new sap.ushell.services.Container();
			sap.ushell = {
				Container: {
					getService: function (name) {
						if (name === "Search") {
							return {
								queryApplications: function (properties) {
									return jQuery.when().then(function () {
										return {
											totalResults: 0,
											searchTerm: properties.searchTerm,
											getElements: function () {
												return [];
											}
										};
									});
								}
							};
						} else if (name === "URLParsing") {
							return {
								parseParameters: function (search) {
									search = search.substr(1);
									var result = {};
									var params = search.split("&");
									for (var i = 0; i < params.length; i++) {
										var pairs = params[i].split("=");
										if (!pairs[1]) {
											pairs[1] = "";
										}
										result[pairs[0]] = [pairs[1]];
									}
									return result;
								},
								splitHash: function (hash) {
									var result = {};
									result.appSpecificRoute = hash.substr(14);
									return result;
								}
							};
						}else if(name === "CrossApplicationNavigation"){
							return oCrossApplicationNavigation;
						}
					},
					getLogonSystem: function (name) {
						return {
							getName: function () {
								return;
							},
							getClient: function () {
								return;
							}
						};
					}
				}
			}
		}
	});
});