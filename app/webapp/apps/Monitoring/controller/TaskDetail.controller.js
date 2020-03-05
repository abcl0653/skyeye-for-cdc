sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.TaskDetail", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel("json/task.json"),"task");
			
			this.getView().bindElement("task>/0")
		},
		onPressTaskList:function(){
			this.getRouter().navTo("Task");
		}
	});
});