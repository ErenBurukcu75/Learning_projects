sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/f/library",
	"project1/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "project1/controller/BaseController"
], function (Controller, fioriLibrary, formatter, JSONModel, MessageToast, BaseController ) {
	formatter = formatter;
	
	"use strict";

	return BaseController.extend("project1.controller.Detail", {
		formatter: formatter,
		
		onInit: function () {
    
			
		},

        request: async function (processName, postData) {
            if (!this.service) {
                console.log("before")
                this.service = this.getOwnerComponent().getModel();
                console.log(this.service, "AAA")
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
                        console.log(processName, true);
                        console.log("Request successful:");
                        resolve(resultObject);
                        console.log("AAA")
                        console.log(resultObject)
                    },
                    error: (oResponse) => {
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

        onListItemPress: function () {
            var oView = this.getView();
            var oFCL = oView.getParent().getParent();

            oFCL.setLayout(fioriLibrary.LayoutType.BeginColumn);
		},

        formatDateToYYYYMMDD: function(date) {
            var parts = date.split(".");
            if (parts.length === 3) {
                return parts[2] + "-" + parts[1] + "-" + parts[0];
            } else if (parts.length === 2) {
                return parts[1] + "-" + parts[0];
            }
            return date;
        },

		onSearch: function (oEvent) {
            
            var sValue = oEvent.getParameter("query");
            var oTable = this.byId("logTable");
            var oBinding = oTable.getBinding("items");
            
            console.log(sValue)

            var formattedDate = this.formatDateToYYYYMMDD(sValue);
        
        

    
    var aFilters = [
        new sap.ui.model.Filter("tarih", sap.ui.model.FilterOperator.Contains, formattedDate),
        new sap.ui.model.Filter("saat", sap.ui.model.FilterOperator.Contains, sValue),
        new sap.ui.model.Filter("degisiklik", sap.ui.model.FilterOperator.Contains, sValue),

        
    ];

    
    var oCombinedFilter = new sap.ui.model.Filter({
        filters: aFilters,
        and: false
    });

    
    oBinding.filter([oCombinedFilter]);
        },

		
        checkLog: async function (){
            var Processname = "GetLog"; 
            var Jsondata = {};
            var that = this;
            await this.request(Processname, Jsondata)
            .then(function(result) {
            var oModel = new JSONModel();
            oModel.setData({ veriler1: result});
            that.getView().setModel(oModel, "log");
            console.log("Request başarılı: " + JSON.stringify(result));
            })
            .catch(function(error) {
            MessageToast.show("Request başarısız: " + JSON.stringify(error));
            console.error(error);
            });
            },

       
	});
});
