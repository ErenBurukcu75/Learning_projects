sap.ui.define([
    "vesaenvanterproject/controller/BaseController",
    "sap/ui/model/json/JSONModel"
],
function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("vesaenvanterproject.controller.Home", {
        onInit: function () {
            this.getOwnerComponent().getRouter().initialize();

            var oModel = new JSONModel({
                "items": [
                    {
                        title: "Genel Envanter"
                    },
                    {
                        title: "PC Envanter"
                    },
                    {
                        title:"Araç Envanter"
                    }

                ]
            })

            this.getView().setModel(oModel, "test");


        },

        navToPC: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("pcEnvanter");

        },

        onTilePress: function (oEvent) {

            var oButton = oEvent.getSource();
            var sTitle = oButton.getBindingContext("test").getProperty("title");

            if(sTitle === "PC Envanter") {
                this.navToPC();
            }

            console.log("%cTile title: " + sTitle, "color: blue; font-weight: bold;");
        },    
    });
});
