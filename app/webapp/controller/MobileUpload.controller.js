sap.ui.define([
	"./BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("sap.ibso.skyeyeForCdc.controller.MobileUpload", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel({
				SubmitType: "Task",
				Type: "测温",
				Priority: "中",
				Status: "新建",
				Block: "楼栋A"
			}));
		},

		onSubmitWithComplete: function () {
			this.getView().setModel().setProperty("/Status", "已完成");
			this.onSubmit();
		},

		onSubmit: function () {
			this.getView().setBusy(true);
			var oData = this.getView().getModel().getData();
			if (oData.SubmitType === "Task") {
				oData.CreatedDate = new Date().toLocaleDateString();
				oData.DueDate = new Date().toLocaleDateString();
				oData.Responsible = "志愿者";
				oData.ResponsiblePhone = "13912345678";
				var oTaskModel = this.getOwnerComponent().getModel("task");
				var aTask = oTaskModel.getData();
				aTask.push(oData);
				setTimeout(function () {
					this.getView().setBusy(false);
					MessageToast.show("任务创建成功");
					this.getRouter().navTo("Task");
				}.bind(this), 2000);
			} else if (oData.SubmitType === "Event") {

			}
		}
	});
});