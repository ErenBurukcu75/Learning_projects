/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project1/model/models",
        "sap/ui/model/odata/v2/ODataModel"
    ],
    function (UIComponent, Device, models, ODataModel) {
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

                // enable routing
                this.getRouter().initialize();

                var oModel = new ODataModel("https://fioridev.vesa-tech.com/sap/opu/odata/sap/ZIHS_EDUCATION_SRV/", {
                    json : true,
                    loadMetadataAsync: true
                });

                oModel.attachRequestCompleted(function() {
                    console.log("OData request completed successfully.");
                  });
            
                  oModel.attachRequestFailed(function() {
                    console.error("OData request failed.");
                  });


            this.setModel(oModel);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);