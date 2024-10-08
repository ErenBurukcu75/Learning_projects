
sap.ui.define([
    "project1/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "project1/formatter",
    "sap/f/library"

 ],
 function (BaseController, MessageToast, JSONModel, formatter, fioriLibrary) {
    formatter = formatter;
     "use strict";
 
     return BaseController.extend("project1.controller.Home", {
        formatter: formatter,
 
         onInit:  function() {
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

      

        onEdit: function (oEvent) {
            var oButton = oEvent.getSource();
            var oItem = oButton.getParent();
            var oTable = this.byId("employeeTable");
            var oContext = oItem.getBindingContext();

            var sId = oContext.getProperty("islemId");
            var sPernr = oContext.getProperty("pernr");
            var sName = oContext.getProperty("calisanAdi");
            var sDepartman = oContext.getProperty("departman");
            var sMusteri = oContext.getProperty("musteri");
            var sBegDate = oContext.getProperty("baslama");
            var sEndDate = oContext.getProperty("asilBitis");
            var sIslem = oContext.getProperty("islem");
            var sIsDetay = oContext.getProperty("isDetay");
            var sMusteriYorumu = oContext.getProperty("musteriYorumu");
            var sPersonelYorumu = oContext.getProperty("personelYorumu");
            var sDurum = oContext.getProperty("durum");
            var sEfor = oContext.getProperty("efor");

            this.byId("dialogId").setValue(sId);
            this.byId("dialogPernr").setValue(sPernr);
            this.byId("dialogName").setValue(sName);
            this.byId("dialogDepartman").setValue(sDepartman);
            this.byId("dialogMusteri").setValue(sMusteri);
            this.byId("dialogBegDate").setValue(sBegDate);
            this.byId("dialogEndDate").setValue(sEndDate);
            this.byId("dialogIslem").setSelectedKey(sIslem);
            this.byId("dialogIsDetay").setValue(sIsDetay);
            this.byId("dialogMusteriYorumu").setValue(sMusteriYorumu);
            this.byId("dialogPersonelYorumu").setValue(sPersonelYorumu);
            this.byId("dialogDurum").setSelectedKey(sDurum);
            this.byId("dialogEfor").setValue(sEfor);
            

            this._oSelectedItem = oItem;
            
            this.byId("myDialog1").open();
            
        
        },

        onSetPopup: function () {
            var sId = this.byId("dialogId").getValue();
            var sName = this.byId("dialogName").getValue();
            var sPernr = this.byId("dialogPernr").getValue();
            var sDepartman = this.byId("dialogDepartman").getValue();
            var sMusteri = this.byId("dialogMusteri").getValue();
            var sBegDate = this.byId("dialogBegDate").getDateValue();
            sBegDate.setHours(12,12,0)
            var sEndDate = this.byId("dialogEndDate").getDateValue();
            sEndDate.setHours(12,12,0)
            var sIslem = this.byId("dialogIslem").getSelectedKey();
            var sIsDetay = this.byId("dialogIsDetay").getValue();
            var sDurum = this.byId("dialogDurum").getSelectedKey();
            var sEfor = this.byId("dialogEfor").getValue();
            var sMusteriYorumu = this.byId("dialogMusteriYorumu").getValue();
            var sPersonelYorumu = this.byId("dialogPersonelYorumu").getValue();
            var that = this;

            var Processname ="ChangeActivity";

            var Jsondata ={
                islem_id : sId,
                pernr : sPernr,
                
                departman : sDepartman,
                musteri : sMusteri,
               
                baslama : sBegDate,
                asil_bitis : sEndDate,
                isDetay : sIsDetay,
                islem : sIslem,
                durum : sDurum,
                efor : sEfor,
                musteri_yorumu : sMusteriYorumu,
                personel_yorumu : sPersonelYorumu,
            }

            try{
                let result = that.request.bind(that)(Processname, Jsondata);
                MessageToast.show("Ekleme Başarılı");
                console.log("Eklendi", result);
                setTimeout(function() {
                    that.onRequestButtonPress();
                }, 500);
            } catch(error)  {
                MessageToast.show("Eklenemedi");
                console.error("Eklenemedi", error);
            }

            this.byId("myDialog1").close();
            
        },

        onClosePopup: function () {
            this.byId("myDialog1").close();
        },

       

        

        onSearch: function (oEvent) {
            
            var sValue = oEvent.getParameter("query");
    var oTable = this.byId("employeeTable");
    var oBinding = oTable.getBinding("items");

    if(sValue){
    var aFilters = [
        // new sap.ui.model.Filter("islemId", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("pernr", sap.ui.model.FilterOperator.Contains, sValue.toString()),

        new sap.ui.model.Filter("calisanAdi", sap.ui.model.FilterOperator.Contains, sValue),
        // new sap.ui.model.Filter("Müşteri", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("baslama", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("asilBitis", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("musteriYorumu", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("personelYorumu", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("isDetay", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("onemlilik", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("Efor", sap.ui.model.FilterOperator.Contains, sValue.toString()),
        // new sap.ui.model.Filter("islemDurumu", sap.ui.model.FilterOperator.Contains, sValue.toString()),
    ];

    
    var oCombinedFilter = new sap.ui.model.Filter({
        filters: aFilters,
        and: false
    });

    
    oBinding.filter([oCombinedFilter]);
} else {
    oBinding.filter([]);
}
        },
        
        openPopover: function (oEvent) {
            var oButton = oEvent.getSource();
            if (!this._oPopover) {
                this._oPopover = this.byId("sortPopover")
                this.getView().addDependent(this._oPopover);
            }
            this._oPopover.openBy(oButton);
        },

        onRadioButtonSelect: function (oEvent) {
            var oRadioButton = oEvent.getSource();
            this._selectedSortOption = oRadioButton.getText();
            if(this._selectedSortOption == "İsim"){
                this._selectedSortOption = "Name";
                
            }
        },
        
        onOkPress: function () {
            if (this._selectedSortOption) {
                this._sortTable(this._selectedSortOption);
                this._oPopover.close();
            } else {
                sap.m.MessageToast.show("Lütfen bir seçenek seçin.");
            }
        },

        onColumnHeaderPress: function (oEvent) {
            var sColumnKey = oEvent.getSource().getCustomData()[0].getValue();
            this._sortTable(sColumnKey);
        },
        
        _sortTable: function (sColumn) {
            var oTable = this.byId("employeeTable"); 
            var oBinding = oTable.getBinding("items");
            var oSorter = new sap.ui.model.Sorter(sColumn);
            oBinding.sort(oSorter);
        },

        onRowSelect: async function (oEvent) {
            var oTable = this.byId("employeeTable");
            var item = oEvent.getParameter("listItem");
            var context = item.getBindingContext();
            var row = context.getObject();
            var sicilNo = row.islemId;

            var Processname = "GetLog"; 
            var Jsondata = { sicilNo : sicilNo };
            var that = this;
            var logModel;

            var res = this.getImageUrlOfPersonnel(sicilNo);
            console.log(res)
            row.img = res;
            console.log("ROW",row)


            await this.request(Processname, Jsondata)
                .then(function(result) {
                logModel = new JSONModel();
                logModel.setData({ log: result});
                that.getView().setModel(logModel, "logModel");
                console.log("Request başarılı: " + JSON.stringify(result));
                })
                .catch(function(error) {
                MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });

          

            var oView = this.getView();
            var oFCL = oView.getParent().getParent();

            var oModel = new JSONModel(row);
            
            this.getView().setModel(oModel, "selectedRow");

            
            var oDetailViewId = "detailView";
            var oDetailView = sap.ui.getCore().byId(oDetailViewId);
            if (oDetailView) { // eğer mevcut ise modeli güncelle
               oDetailView.setModel(oModel, "selectedRow");
               oDetailView.setModel(logModel, "logModel");
            } else {
             // Yosak eğer detail view'ı yükleyin ve model'i geçir
            oDetailView = sap.ui.view({
                id: oDetailViewId,
                viewName: "project1.view.Detail",
                type: sap.ui.core.mvc.ViewType.XML
            });
            oDetailView.setModel(oModel, "selectedRow");
            oDetailView.setModel(logModel, "logModel");
            oFCL.addMidColumnPage(oDetailView);
            }


            oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsBeginExpanded);
            oFCL.to(oDetailView.getId(), "MidColumn");

            oTable.removeSelections(true);
            
        },
        onRequestButtonPress: async function () {
            // her tıklanıldığında güncel veriyi çeker 
            var Processname = "GetList"; 
            var Jsondata = {};
            var that = this;
            await this.request(Processname, Jsondata)
                .then(function(result) {
                var oModel = new JSONModel();
                oModel.setData({ veriler: result});
                that.getView().setModel(oModel);
                console.log("Request başarılı: " + JSON.stringify(result));
                })
                .catch(function(error) {
                MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });
        },
        onAdd: function () {
            if (!this.byId("addDialog")) {
                this.loadFragment({
                    name: "project1.view.AddDialog"
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this.byId("addDialog").open();
            }
        },

        onCancel: function () {
            this.byId("addDialog").close();
        },

        onAddConfirm: function () {
            var oView = this.getView();
            var oModel = oView.getModel("/Veriler");

            var oBegDate = oView.byId("inputBegDate").getDateValue();
            var oEndDate = oView.byId("inputEndDate").getDateValue();

            if (!oBegDate || !oEndDate) {
                MessageToast.show("Lütfen başlangıç ve bitiş tarihlerini seçin.");
                return;
            }

            if (oEndDate < oBegDate) {
                MessageToast.show("Bitiş tarihi, başlangıç tarihinden önce olamaz.");
                return;
            }

            var oNewEntry = {
                ID: oView.byId("inputID").getValue(),
                Pernr : oView.byId("inputPernr").getValue(),
                Name: oView.byId("inputName").getValue(),
                departman : oView.byId("inputDepartman").getValue(),
                Müşteri: oView.byId("inputMusteri").getValue(),
                BegDate: oView.byId("inputBegDate").getDateValue(),
                EndDate: oView.byId("inputEndDate").getDateValue(),
                isDetay: oView.byId("inputIsDetay").getValue(),
                MüşteriYorumu: oView.byId("inputMusteriYorumu").getValue(),
                PersonelYorumu: oView.byId("inputPersonelYorumu").getValue(),
                Durum: oView.byId("inputDurum").getSelectedKey(),
                Islem: oView.byId("inputIslem").getSelectedKey(),
                Efor: oView.byId("inputEfor").getValue()
            };

            var that = this;
            var Processname = "CreateActivity";

            var Jsondata ={
                islemId : oNewEntry.ID,
                pernr : oNewEntry.Pernr,
                calisanAdi :oNewEntry.Name,
                departman : oNewEntry.departman,
                musteri : oNewEntry.Müşteri,
               
                baslama : oNewEntry.BegDate,
                asil_bitis : oNewEntry.EndDate,
                is_detay : oNewEntry.isDetay,
                islem : oNewEntry.Islem,
                durum : oNewEntry.Durum,
                efor : oNewEntry.Efor,
                musteriYorumu : oNewEntry.MüşteriYorumu,
                personelYorumu : oNewEntry.PersonelYorumu,
            }

            try{
                let result = that.request.bind(that)(Processname, Jsondata);
                MessageToast.show("Ekleme Başarılı");
                console.log("Eklendi", result);
                setTimeout(function() {
                    that.onRequestButtonPress();
                }, 500);
            } catch(error)  {
                MessageToast.show("Eklenemedi");
                console.error("Eklenemedi", error);
            }

          
        

            this.byId("addDialog").close();
            MessageToast.show("New entry added!");
        },

        deleteRow: function (oEvent) {
            //Düzenlenicek
            var Processname = "DeleteActivity";
            var oTable = this.byId("employeeTable");
           var item = oEvent.getSource().getParent();
           var context = item.getBindingContext();
           var row = context.getObject();
           var id = row.islemId;
            var that = this;
            //

            var Jsondata = {
                id : id
            }

            try{
                let result = that.request.bind(that)(Processname, Jsondata);
                MessageToast.show("Silindi");
                console.log("Silindi", result);
                setTimeout(function() {
                    that.onRequestButtonPress();
                }, 500);
            } catch(error)  {
                MessageToast.show("silinemedi");
                console.error("silinmedi", error);
            }
        },

       

     });
 });
 