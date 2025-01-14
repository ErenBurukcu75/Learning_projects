sap.ui.define([
    "vesaprem/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], function (BaseController, History, JSONModel) {
    "use strict";

    return BaseController.extend("vesaprem.controller.chooseSection", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("chooseSection").attachPatternMatched(this._onObjectMatched, this);

            // Kontrol amaçlı
            console.log("Component initialized.");
        },

        _onObjectMatched: function (oEvent) {
            var sCompanyName = oEvent.getParameter("arguments").companyName;

            var oCompanyModel = new sap.ui.model.json.JSONModel({
               
                name: sCompanyName
            });
            this.getView().setModel(oCompanyModel, "company");
        },

        onVPNPress: function () {
            var sCompanyName = this.getView().getModel("company").getProperty("/name");
           
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("vpn", {
                    companyName: sCompanyName
                });

                
           
        },

        onSystemInfoPress: function () {
           
                var sCompanyName = this.getView().getModel("company").getProperty("/name");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("vsqvsp", {
                    companyName: sCompanyName
                });

                console.log(sCompanyName);

            
        },

       
    });
});
