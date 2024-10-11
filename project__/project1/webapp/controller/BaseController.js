sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.BaseController", {
        onNavBack: function () {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteHome", {}, true);
            }
        },

        getImageUrlOfPersonnel: function (pernr) {
            return "/sap/opu/odata/sap/HCMFAB_COMMON_SRV/" +
                "EmployeePictureSet(ApplicationId='DOCMANAGE',EmployeeId='" +
                pernr +
                "')/$value";
        },

        scrollTo : function (id) {
            document.getElementById(this.byId(id).sId).scrollIntoView( {behavior: "smooth" } );
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        attachRouteMatch: function (name, callback) {
            console.log(this.getRouter())
            this.getRouter().getRoute(name).attachMatched(callback, this);
        }

    });
});
