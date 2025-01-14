sap.ui.define([
    "vesaenvanterproject/controller/BaseController",
    "sap/ui/model/json/JSONModel"
],
function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("vesaenvanterproject.controller.PcEnvanter", {
        onInit: function () {

            
            var oModel = new JSONModel("/model/products.json");
			this.getView().setModel(oModel);
            console.log(oModel);

        },


        handlePress: function (oEvent) {
          sap.m.MessageToast.show("hello world")
        }
    });
});
