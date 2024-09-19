sap.ui.define([
    "project1/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel"
 ],
 function (BaseController, MessageToast, ODataModel) {
     "use strict";
 
     return BaseController.extend("project1.controller.Home", {
 
         onInit: function() {
             this.getOwnerComponent().getRouter().initialize();
             
             
             var oModel = new ODataModel("https://fioridev.vesa-tech.com/sap/opu/odata/sap/ZIHS_EDUCATION_SRV/", {
                 json: true,
                 loadMetadataAsync: true
             });
 
         
             this.getView().setModel(oModel);

             oModel.read("/EntitySet", {
                 success: function(oData) {
                     console.log(oData);
                 },
                 error: function(oError) {
                     console.error(oError);
                 }
             });
         },

         request: async function (processName, postData) {
            if (!this.service) {
                this.service = this.getOwnerComponent().getModel();
            }
            var requestData = {};
            requestData.Processname = processName;
            requestData.Jsondata = JSON.stringify(postData);
            var that = this;
            return new Promise(function (resolve, reject) {
                that.service.create("/GenericEntitySet", requestData, {
                    success: (oData) => { // oData -> Jsondata, Processname, Success
                        var resultObject = that.jsonParse(oData.Jsondata);
                        that.log(processName, resultObject, true);
                        resolve(resultObject);
                    },
                    error: (oResponse) => {
                        that.oMainModel.setProperty("/busy", false);
                        that.busy = false;
                        that.handleTechError(oResponse);
                        that.log(processName, oResponse, false);
                        reject(oResponse);
                    }
                });
            });
        },
        
         
         onNavToContact: function () {
            this.getOwnerComponent().getRouter().navTo("RouteContact");
            MessageToast.show("Navigating to Contact");
         },
         
         onNavToInvoice: function () {
             this.getOwnerComponent().getRouter().navTo("RouteInvoice");
             MessageToast.show("Navigating to Invoice");
         },
         
         onNavToAbout: function () {
             this.getOwnerComponent().getRouter().navTo("RouteAbout");
             MessageToast.show("Navigating to About");
         }
     });
 });
 