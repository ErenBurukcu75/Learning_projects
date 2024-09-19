sap.ui.define([
    "project1/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
   "use strict";

   return BaseController.extend("project1.controller.Invoice.Invoice", {


       onInit: function() {
        var sPath = jQuery.sap.getModulePath("project1", "/model/mockdata/Invoice.json");
        var oModel = new JSONModel(sPath);
        
        this.getView().setModel(oModel, "InvoiceList")
       }
       
      
   });
});
