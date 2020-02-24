/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/project/farglory/ReManagement/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});