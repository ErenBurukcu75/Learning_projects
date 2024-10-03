/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "project1/model/models",
        "sap/ui/model/json/JSONModel"
    
    ],
    function (UIComponent, models, JSONModel) {
        "use strict";

        return UIComponent.extend("project1.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // var oInvoiceModel = new JSONModel("/model/mockdata/Invoice.json");
                // oInvoiceModel.attachRequestCompleted(function() {
                //     var data = oInvoiceModel.getData();
                //     var invoices = data.Invoices;
                //     invoices.forEach(function(item) {
                //         switch(item.Durum) {
                //             case "Çok kritik":
                //                 item.StateCol = "Indication01";
                //                 break;
                //             case "Kritik":
                //                 item.StateCol = "Indication03";
                //                 break;
                //             case "Orta":
                //                 item.StateCol = "Indication04";
                //                 break;
                //             case "Az Önemli":
                //                 item.StateCol = "Indication05";
                //                 break;
                //             default:
                //                 item.StateCol = "None";
                //         }
                //     });
                //     oInvoiceModel.setData(data);
                // });
                // this.setModel(oInvoiceModel, "Invoice");

                // enable routing
                this.getRouter().initialize();


            }
        });
    }
);