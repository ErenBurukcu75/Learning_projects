/*global QUnit*/

sap.ui.define([
	"todo.project/controller/TabloPage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("TabloPage Controller");

	QUnit.test("I should test the TabloPage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
