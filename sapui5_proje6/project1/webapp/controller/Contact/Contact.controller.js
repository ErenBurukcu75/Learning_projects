sap.ui.define([
     "project1/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("project1.controller.Contact.Contact", {

        onInit: function() {
        },
        
        onSubmit: function () {
            var sName = this.byId("nameInput").getValue();
            var sEmail = this.byId("emailInput").getValue();
            var sMessage = this.byId("messageInput").getValue();

            // Burada form verilerini işleyebilirsiniz
            sap.m.MessageToast.show("Form submitted: " + sName + ", " + sEmail + ", " + sMessage);
        }
    });
});
