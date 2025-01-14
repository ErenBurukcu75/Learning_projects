sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
	"use strict";

	return Controller.extend("vesaprem.controller.BaseController", {

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("home", {}, true);
            }
        },

		request: async function (processName, postData) {
            this.service = this.getOwnerComponent().getModel();
            
            if(!this.service){
                console.error("oMainModel is undefined");
            }
            var requestData = {};
            requestData.Processname = processName;
            requestData.Jsondata = JSON.stringify(postData);
            var that = this;
            return new Promise(function (resolve, reject) {
                that.service.create("/GenericEntitySet", requestData, {
                    success: (oData) => { // oData -> Jsondata, Processname, Success
                        var resultObject = JSON.parse(oData.Jsondata);
                        console.log("%c----------------------------( Request Başarılı )----------------------------", "color: green; font-weight: bold;");
                        console.log(processName, true);
                        
                        resolve(resultObject);
                    },
                    error: (oResponse) => {
                        console.log("%cRequest başarısız: " + JSON.stringify(error), "color: red; font-weight: bold;");
                        that.oMainModel.setProperty("/busy", false);
                        that.busy = false;
                        that.handleTechError(oResponse);
                        that.log(processName, oResponse, false);
                        console.error("Request failed with status:", oResponse.statusCode);
                        console.error("Error details:", oResponse);
                        reject(oResponse);
                    }
                });
            });
        },

		

	});

});
