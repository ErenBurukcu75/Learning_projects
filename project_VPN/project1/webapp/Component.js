/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "vesaprem/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("vesaprem.Component", {
            metadata: {
                manifest: "json"
            },

            
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

               
            }
        });
    }
);