/*global QUnit*/

sap.ui.define([
	"vesa_envanter_project/controller/project_envanter.controller"
], function (Controller) {
	"use strict";

	QUnit.module("project_envanter Controller");

	QUnit.test("I should test the project_envanter controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
