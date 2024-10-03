sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "todo/project/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/f/library"
],
function (UIComponent, Device, models, JSONModel, FlexibleColumnLayoutSemanticHelper, fioriLibrary) {
    "use strict";

    return UIComponent.extend("todo.project.Component", {
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

            var oModel = new JSONModel();
            this.setModel(oModel);

            var oEmployeeList = new JSONModel("/model/mockdata/employee.json");
            this.setModel(oEmployeeList, "employeeList");

            // enable routing
            this.getRouter().initialize();
            this.oRouter = this.getRouter();

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
        },

        getHelper: function () {
            var oFCL = this.getRootControl().byId('flexibleColumnLayout'),
                oSettings = {
                    defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                    initialColumnsCount: 2
                };
            return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
        }
    });
}
);
