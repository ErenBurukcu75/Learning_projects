sap.ui.define([
    "project1/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "project1/formatter"
 ],
 function (BaseController, MessageToast, JSONModel, formatter) {
     "use strict";
 
     return BaseController.extend("project1.controller.Home", {
        formatter: formatter,
 
         onInit: function() {
             this.getOwnerComponent().getRouter().initialize();
             //Kontrol amaçlı
             console.log("Component initialized.");
            

            
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

        onOpenDialog: function () {
            this.byId("employeeDialog").open();
            
            //
            var tb = this.getView().byId("employeeTable1");
            var rows = tb.getAggregation("rows"); 
            var pernrData = [];
            
            rows.forEach(function(row) {
                var cells = row.getCells();
                if (!cells[0].getText() || !cells[3].getText()) { 
                    // ID ve Sicil No boş ise eklemesin (Boş satır için)
                } else {
                var enameValue = cells[0].getText(); // İlk sütun
                var pernrValue = cells[3].getText(); // Dördüncü sütun
                pernrData.push({ key: pernrValue, text: enameValue + " (" + pernrValue + ")" });
            }
            });
            // --------------------------------
            // setValue(Null) yapmak için var ile değer atadık
            var comboBox = this.byId("managerNumber");
            var startDate = this.byId("employeeStartDate");
            var ename = this.byId("employeeName");
            var plntx = this.byId("employeeDept");

            // -------------------------------
            comboBox.destroyItems();

                pernrData.forEach(function(item) {
                    comboBox.addItem(new sap.ui.core.Item({
                        key: item.key,
                        text: item.text
                    }));
                });
  
            // -------------------------------
            // Her açılışta eski değerler gözükmesin diye sıfırlıyoruz
                comboBox.setSelectedKey(null);
                startDate.setValue(null);
                ename.setValue(null);
                plntx.setValue(null);
            // --------------------------------    

            console.log(pernrData);
            //
        },

        onCloseDialog: function () {
            this.byId("employeeDialog").close();
        },

        onAddEmployee: function () {

        var Processname = "AddEmployee";
        var ename = this.byId("employeeName").getValue();
            var plntx = this.byId("employeeDept").getValue();
            var begda = this.byId("employeeStartDate").getValue();
            var mangr = this.byId("managerNumber").getValue();

            var Jsondata = {
                ename: ename,
                plntx: plntx,
                begda: begda,
                mangr: mangr
            };

            var that = this;
            
            try {
                let result = this.request(Processname, Jsondata);
                MessageToast.show("Çalışan başarıyla eklendi.");
                console.log("Employee added successfully:", result);
                setTimeout(function() {
            
                    that.onRequestButtonPress();
                }, 500);
            } catch (error) {
                MessageToast.show("Çalışan eklenirken bir hata oluştu.");
                console.error("Error adding employee:", error);
            }

            this.byId("employeeDialog").close();
           
           
            
        },

        onDeleteEmployee: function () {
            var Processname = "DelEmployee";
            
            //pernr çekmek için
            var tb = this.getView().byId("employeeTable1");
            var rowids = tb.getSelectedIndices();
            var pernrList = [];
            var delay = 1000;
            var that = this;
            
            
            for (var i = 0; i < rowids.length; i++) {
                var row = tb.getRows()[rowids[i]];
                var cells = row.getCells();
                var pernrValue = cells[3].getText(); // Dördüncü sütun(pernr sütun)

                pernrList.push(pernrValue);
                
            }

            for (var i = 0; i < pernrList.length; i++) {
                (function (i) {
                    setTimeout(function() {
               
                var Jsondata = {
                    pernr: pernrList[i]
                };
            //
            
            console.log(Jsondata);
            
            
    try {
        let result =  that.request.bind(that)(Processname, Jsondata);
        MessageToast.show("Çalı1şan başarıyla silindi.");
        console.log("Employee deleted successfully:", result);
        console.log("AAAA")
        setTimeout(function() {
            
            that.onRequestButtonPress();
        }, 500);
       
    } catch (error) {
        MessageToast.show("Çalışan silinirken bir hata oluştu.");
        console.error("Error deleting employee:", error);
        }
       }, delay);
      }) (i);
     }   
    },



        onRequestButtonPress: function () {
            // her tıklanıldığında güncel veriyi çeker 
            var Processname = "GetList"; 
            var Jsondata = {};
            var that = this;
            this.request("GetList", Jsondata)
                .then(function(result) {
                var oModel = new JSONModel();
                // result.forEach((element,i,arr) =>{

                //     arr[i].new = "X"
                // });
                oModel.setData({ veriler: result});
                that.getView().setModel(oModel);
                console.log("Request başarılı: " + JSON.stringify(result));
                })
                .catch(function(error) {
                MessageToast.show("Request başarısız: " + JSON.stringify(error));
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
 