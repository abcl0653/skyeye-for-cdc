sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.Region", {
		onInit: function () {
			BaseController.prototype.onInit.apply(this,arguments);
			this.getView().setModel(new sap.ui.model.json.JSONModel([{
				name:"上海市",
				type:"直辖市",
				person:"XXX",
				nodes:[{
					name:"浦东新区",
					type:"区/县",
					person:"XXX",
					nodes:[
						{
							name:"张江镇",
							type:"街道/镇/乡",
							person:"XXX",
							nodes:[
								{
									name:"光明小区三期",
									type:"居民小区",
									person:"XXX"
								},{
									name:"光明小区四期",
									type:"居民小区",
									person:"XXX"
								}
							]
						}
					]
				}

				]
			}]))
		}
	});
});