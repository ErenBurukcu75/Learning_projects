sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library"

], function (Controller, fioriLibrary) {
    "use strict";
    return Controller.extend("todo.project.controller.Detail", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oModel = this.getOwnerComponent().getModel("employeeList");

            this.oRouter.getRoute("detail").attachPatternMatched(this._onEmployeeMatched, this);
        },

        _onEmployeeMatched: function (oEvent) {
            var sEmployeePath = oEvent.getParameter("arguments").employeePath;
            this.getView().bindElement({
                path: "/employeeList/" + sEmployeePath,
                model: "employeeList"
            });
        },

        handleClose: function () {
            this.oView = this.getView();
            var oFCL = this.oView.getParent().getParent();

           
            oFCL.setLayout(fioriLibrary.LayoutType.OneColumn);
        },
    
 
       });
    }
);