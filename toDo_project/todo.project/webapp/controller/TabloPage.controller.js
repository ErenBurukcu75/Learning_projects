sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/f/library",
    "sap/m/MessageToast"

], function (Controller, JSONModel, MessageBox, Filter, FilterOperator, Sorter, fioriLibrary, MessageToast) {
    "use strict";

    return Controller.extend("todo.project.controller.TabloPage", {
        onInit: function () {
            this.getOwnerComponent().getRouter().initialize();
            this.oView = this.getView();
            this.oMainModel = this.getOwnerComponent().getModel();
        },
        request: async function (processName, postData) {
            if (!this.service) {
                this.service = this.getOwnerComponent().getModel();
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
                        console.log(resultObject);
                        resolve(resultObject);
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
        onRequestButtonPress: function () {
            // her tıklanıldığında güncel veriyi çeker 
            var Processname = "GetList"; 
            var Jsondata = {};
            var that = this;
            this.request(Processname, Jsondata)
                .then(function(result) {
                    var oModel = new JSONModel();
                    oModel.setData({ Veriler: result });
                    that.getView().setModel(oModel);
                    console.log("Request başarılı: " + JSON.stringify(result));
                })
                .catch(function(error) {
                    MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });
        },
        
        
        onLogPress: function () {
            var oLogPanel = this.byId("logPanel");
            var oLogText = this.byId("logText");
            var sCurrentLog = oLogText.getText();
            var sNewLog = "Yeni log kaydı: " + new Date().toLocaleString();
            oLogText.setText(sCurrentLog + "\n" + sNewLog);
            oLogPanel.setVisible(true);
        },

        onSearch: function (oEvent) {
            var oTableSearchState = [],
                sQuery = oEvent.getParameter("query");
        
            if (sQuery && sQuery.length > 0) {
                // create filter for search by id
                oTableSearchState = [new Filter("ename", FilterOperator.Contains, sQuery)];
            }
        
            var oTable = this.byId("employeeTable");
            if (oTable) {
                var oBinding = oTable.getBinding("rows"); // "items" yerine "rows" kullanın
                if (oBinding) {
                    oBinding.filter(oTableSearchState, "Application");
                } else {
                    console.error("Binding not found for employeeTable");
                }
            } else {
                console.error("employeeTable not found");
            }
        },

        onAdd: function () {
            MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
        },

        onSort: function () {
            this._bDescendingSort = !this._bDescendingSort;
            var oBinding = this.byId("employeeTable").getBinding("items"),
                oSorter = new Sorter("Name", this._bDescendingSort);

            oBinding.sort(oSorter);
        },

        onListItemPress: function () {


            var oFCL = this.oView.getParent().getParent();


			oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
        
        }
        
        
    });
});
