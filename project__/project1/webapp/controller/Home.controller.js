
sap.ui.define([
    "project1/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "project1/formatter",
    "sap/f/library",
  

 ],
 function (BaseController, MessageToast, JSONModel, formatter, fioriLibrary,) {
    formatter = formatter;
     "use strict";
     var sortCounter = 0; // sort için gerekli  counter
 
     return BaseController.extend("project1.controller.Home", {
        formatter: formatter,
 
         onInit: function() {
             this.getOwnerComponent().getRouter().initialize();
             //Kontrol amaçlı
             console.log("Component initialized.");
             
           
      

         },

    

         onAfterRendering: async function () {
            var that = this;
            var oBusyIndicator = this.byId("busyIndicatorContainer")

            if(oBusyIndicator){
                oBusyIndicator.setVisible(true);
            }
        
            console.log("onAfterRendering başladı");
            // GetList request'i
            var ProcessnameList = "GetList"; 
            var JsondataList = {};
            
            await new Promise(resolve => setTimeout(resolve, 250)); // 1 saniyelik delay
            await that.request(ProcessnameList, JsondataList)
                .then(function(result) {
                    console.log("Request başarılı: ", result);
        
                    var oModel = new JSONModel();
                    oModel.setData({ veriler: result });
                    that.getView().setModel(oModel);

                    var favMembers = result.filter(function(member) {
                        return member.fav === "1";
                    });
                    console.log("Filtrelenmiş favoriler: ", favMembers);

                    var oFavModel = new JSONModel();
                    oFavModel.setData({ favourites: favMembers });
                    that.getView().setModel(oFavModel, "favourites");
                    that.updateFavouriteIcons();
        

                // Favoriler modelinin ayarlandığını hemen kontrol et
                var oFavouritesModel = that.getView().getModel("favourites");
                console.log("Favoriler modeli ayarlandı: ", oFavouritesModel.getData());
                    console.log("Model ayarlandı: ", that.getView().getModel().getData());

                    that.applyInitialFilters();
                   
                })
                .catch(function(error) {
                    console.error("Request başarısız: ", error);
                    MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });
                
            // GetClientList request'i
            var ProcessnameClient = "GetClientList"; 
            var JsondataClient = {};
            
            await new Promise(resolve => setTimeout(resolve, 250)); // 1 saniyelik delay
            await that.request(ProcessnameClient, JsondataClient)
                .then(function(result) {
                    console.log("Request başarılı: " + JSON.stringify(result));
                    
                    var oClientModel = new JSONModel();
                    oClientModel.setData({ clients: result });
                    that.getView().setModel(oClientModel, "clientModel");
        
                    // Müşteri ComboBox'larına verileri bağlayın
                    ["inputMusteri", "dialogMusteri"].forEach(function(comboBoxId) {
                        var oComboBox = that.byId(comboBoxId);
                        oComboBox.bindItems({
                            path: "clientModel>/clients",
                            template: new sap.ui.core.ListItem({
                                key: "{clientModel>musteriId}",
                                text: "{clientModel>musteriAd}"
                            })
                        });
                    });
                })
                .catch(function(error) {
                    MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });

                console.log("--------------------------------")
                var ProcessnameClient = "GetName";
                var JsondataClient = {
        
                }


                await new Promise(resolve => setTimeout(resolve, 250)); // 1 saniyelik delay
                await that.request(ProcessnameClient, JsondataClient)
                .then(function(result) {
                    console.log("Request başarılı: " + JSON.stringify(result));
            
                    var oClientModel = new JSONModel();
                    oClientModel.setData({ clients: result });
                    that.getView().setModel(oClientModel, "musteriModel");
            
                   
                    ["inputPernr", "dialogPernr"].forEach(function(comboBoxId) {
                        var oComboBox = that.byId(comboBoxId);
                        oComboBox.bindItems({
                            path: "musteriModel>/clients", 
                            template: new sap.ui.core.ListItem({
                                key: "{musteriModel>pernr}",
                                text: "({musteriModel>pernr}) {musteriModel>ename} " 
                            })
                        });
                    });
                })
                .catch(function(error) {
                    MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });

              

                var oDialog = this.byId("addDialog");

                if (oDialog) {
                    oDialog.addStyleClass("sapUiInvisibleText");
                    
                    setTimeout(function() {
                        oDialog.removeStyleClass("sapUiInvisibleText");
                        oDialog.setVisible(true); // Başlangıçta görünmez olan dialogu görünür yap (bug fix)
                        console.log("Dialog başlangıçta kapalı");
                    }, 0);
                }

                if (oBusyIndicator) {
                    oBusyIndicator.setVisible(false);
                }
            
            
            console.log("onAfterRendering bitti");
        },

        addFavourite: function(oEvent) {
            var oButton = oEvent.getSource();
            var sIcon = oButton.getIcon();
            var Processname, Jsondata;
        
            if (sIcon === "sap-icon://unfavorite") {
                Processname = "ChangeActivity";
                Jsondata = {
                    islemId: oEvent.getSource().getBindingContext().getObject().islemId,
                    pernr: oEvent.getSource().getBindingContext().getObject().pernr,
                    calisanAdi: oEvent.getSource().getBindingContext().getObject().calisanAdi,
                    musteri: oEvent.getSource().getBindingContext().getObject().musteri,
                    baslama: oEvent.getSource().getBindingContext().getObject().baslama,
                    asil_bitis: oEvent.getSource().getBindingContext().getObject().asil_bitis,
                    isDetay: oEvent.getSource().getBindingContext().getObject().isDetay,
                    islem: oEvent.getSource().getBindingContext().getObject().islem,
                    durum: oEvent.getSource().getBindingContext().getObject().durum,
                    efor: oEvent.getSource().getBindingContext().getObject().efor,
                    musteri_yorumu: oEvent.getSource().getBindingContext().getObject().musteri_yorumu,
                    personel_yorumu: oEvent.getSource().getBindingContext().getObject().personel_yorumu,
                    fav: 1
                };
                MessageToast.show("Favorilere eklendi");
            } else {
                Processname = "ChangeActivity";
                Jsondata = {
                    islemId: oEvent.getSource().getBindingContext().getObject().islemId,
                    pernr: oEvent.getSource().getBindingContext().getObject().pernr,
                    calisanAdi: oEvent.getSource().getBindingContext().getObject().calisanAdi,
                    musteri: oEvent.getSource().getBindingContext().getObject().musteri,
                    baslama: oEvent.getSource().getBindingContext().getObject().baslama,
                    asil_bitis: oEvent.getSource().getBindingContext().getObject().asil_bitis,
                    isDetay: oEvent.getSource().getBindingContext().getObject().isDetay,
                    islem: oEvent.getSource().getBindingContext().getObject().islem,
                    durum: oEvent.getSource().getBindingContext().getObject().durum,
                    efor: oEvent.getSource().getBindingContext().getObject().efor,
                    musteri_yorumu: oEvent.getSource().getBindingContext().getObject().musteri_yorumu,
                    personel_yorumu: oEvent.getSource().getBindingContext().getObject().personel_yorumu,
                    fav: 0
                };
                MessageToast.show("Favorilerden kaldırıldı");
            }
        
            // Request işlemini ekleyelim
            var that = this;
            this.request(Processname, Jsondata)
                .then(function(result) {
                    console.log("Request başarılı: ", result);
                    
                       
                        that.onRequestButtonPress();
                       
                  
                })
                .catch(function(error) {
                    console.error("Request başarısız: ", error);
                    MessageToast.show("Request başarısız: " + JSON.stringify(error));
        
                
                    oButton.setIcon(sIcon);
                });
        },
        
        
        onOpenFilterPopover: function(oEvent) {
            if (!this._oFilterPopover) {
                this._oFilterPopover = this.byId("filterPopover");
                
            }
            this._oFilterPopover.openBy(oEvent.getSource());
        },

        onFilter: function() {
           this.applyInitialFilters();
        },

        applyInitialFilters: function() {
            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");
        
            var aFilters = [];
           
    var filterBilinmiyor = new sap.ui.model.Filter({
        filters: [
            new sap.ui.model.Filter("islem", sap.ui.model.FilterOperator.EQ, ""),
            new sap.ui.model.Filter("islem", sap.ui.model.FilterOperator.EQ, null),
          
        ],
        and: false
    });

    // Başlanmadı durumu için 0 değeri
    if (this.byId("filterBaslanmadi").getSelected()) {
        aFilters.push(new sap.ui.model.Filter("islem", sap.ui.model.FilterOperator.EQ, "0"));
    }

    // Diğer filtre seçenekleri
    if (this.byId("filterBeklemede").getSelected()) {
        aFilters.push(new sap.ui.model.Filter("islem", sap.ui.model.FilterOperator.EQ, 1));
    }
    if (this.byId("filterDevam").getSelected()) {
        aFilters.push(new sap.ui.model.Filter("islem", sap.ui.model.FilterOperator.EQ, 2));
    }
    if (this.byId("filterTamamlandi").getSelected()) {
        aFilters.push(new sap.ui.model.Filter("islem", sap.ui.model.FilterOperator.EQ, 3));
    }
    if (this.byId("filterBilinmiyor").getSelected()) {
        aFilters.push(filterBilinmiyor);
    }
        
            // Filtreleri birleştirip or (veya) olarak ayarlanıyor
            if (aFilters.length > 0) {
                oBinding.filter(new sap.ui.model.Filter({
                    filters: aFilters,
                    and: false
                }));
            }
            // Tamamlandı olanı eklemiyoruz çünkü false
            var oFinalFilter = new sap.ui.model.Filter(aFilters, false);
            oBinding.filter(oFinalFilter);

            this.updateFavouriteIcons();
        },
        
        onSuggest: function(oEvent) {
            var sValue = oEvent.getParameter("suggestValue");
            var oFilters = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("musteriAd", sap.ui.model.FilterOperator.Contains, sValue)
                ],
                and: false
            });
            oEvent.getSource().getBinding("suggestionItems").filter(oFilters);
        },
        
        onComboBoxChange: function(oEvent) {
            var oComboBox = oEvent.getSource();
            var sPath = oComboBox.getSelectedItem().getBindingContext("musteriModel").getPath();
            var oSelectedItem = oComboBox.getModel("musteriModel").getProperty(sPath);
          

         
            this.getView().byId("inputPernr").setValue(oSelectedItem.pernr);
            this.getView().byId("inputName").setValue(oSelectedItem.ename);

            console.log("aaa")
                   
            
        },

        onComboBoxChange1: function(oEvent) {
            var oComboBox = oEvent.getSource();
            var sPath = oComboBox.getSelectedItem().getBindingContext("musteriModel").getPath();
            var oSelectedItem = oComboBox.getModel("musteriModel").getProperty(sPath);
        
            this.getView().byId("dialogPernr").setValue(oSelectedItem.pernr);
            this.getView().byId("dialogName").setValue(oSelectedItem.ename);
            
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
            // var sDepartman = oContext.getProperty("departman");
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
            // this.byId("dialogDepartman").setValue(sDepartman);
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
            // var sDepartman = this.byId("dialogDepartman").getValue();
            var sMusteri = this.byId("dialogMusteri").getValue();
            var sBegDate = this.byId("dialogBegDate").getDateValue();
            if(sBegDate){
            sBegDate.setHours(12,12,0)
            }
            var sEndDate = this.byId("dialogEndDate").getDateValue();
            if(sBegDate){
            sEndDate.setHours(12,12,0)
            }
            var sIslem = this.byId("dialogIslem").getSelectedKey();
            var sIsDetay = this.byId("dialogIsDetay").getValue();
            var sDurum = this.byId("dialogDurum").getSelectedKey();
            var sEfor = this.byId("dialogEfor").getValue();
            var sMusteriYorumu = this.byId("dialogMusteriYorumu").getValue();
            var sPersonelYorumu = this.byId("dialogPersonelYorumu").getValue();
            var that = this;

            if(sMusteri == ""){
                MessageToast.show("Müşteri adı boş olamaz.");
                return;
            }

            if (!sBegDate || !sEndDate) {
                MessageToast.show("Lütfen başlangıç ve bitiş tarihlerini seçin.");
                return;
            }

            if (sEndDate < sBegDate) {
                MessageToast.show("Bitiş tarihi, başlangıç tarihinden önce olamaz.");
                return;
            }

            var Processname ="ChangeActivity";
            var Jsondata ={
                islem_id : sId,
                pernr : sPernr,
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
                MessageToast.show("Düzenleme Başarılı");
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
            sortCounter++;
            this._sortTable(sColumnKey);
        },
        
        _sortTable: function (sColumn) {
            var oTable = this.byId("employeeTable"); 
            var oBinding = oTable.getBinding("items");

            var bDescending = (sortCounter % 2) === 0;  // tek sayı ise false yani (a-z)
            var oSorter = new sap.ui.model.Sorter(sColumn, bDescending);

            oBinding.sort(oSorter);
        },

        onColumnHeaderPress1: function (oEvent) {
            var sColumnKey = oEvent.getSource().getCustomData()[0].getValue();
            sortCounter++;
            this._sortTable1(sColumnKey);
        },

        _sortTable1: function (sColumn) {
            var oTable = this.byId("miniTable"); 
            var oBinding = oTable.getBinding("items");

            var bDescending = (sortCounter % 2) === 0;  // tek sayı ise false yani (a-z)
            var oSorter = new sap.ui.model.Sorter(sColumn, bDescending);

            oBinding.sort(oSorter);
        },

        onRowSelect: async function (oEvent) {
            var oTable = this.byId("employeeTable");
            var item = oEvent.getParameter("listItem");
            var context = item.getBindingContext();
            var row = context.getObject();
            var sicilNo = row.islemId;
            var pernr = row.pernr;
            console.log(pernr);

            var Processname = "GetLog"; 
            var Jsondata = { sicilNo : sicilNo };
            var that = this;
            var logModel;

            var res = this.getImageUrlOfPersonnel(pernr);
         
            row.img = res;
    

            await this.request(Processname, Jsondata)
                .then(function(result) {
                // `result` verilerini `islemId`'ye göre filtreleme ve güncel logu üstte gösterme .reverse()
            var filteredLogs = result.filter(log => log.islemId ===  sicilNo).reverse();
            console.log("Filtered Logs:", filteredLogs);

                logModel = new JSONModel();
                logModel.setData({ log: filteredLogs});
                that.getView().setModel(logModel, "logModel");
                console.log("Request başarılı: " + JSON.stringify(filteredLogs));
                console.log("logModel Data: ", logModel.getData());
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
             // Yosak eğer detail view'ı yükle ve model'i geçir
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
                    oModel.setData({ veriler: result });
                    that.getView().setModel(oModel);

                    that.applyInitialFilters();
                    
                    // "fav" değeri 1 olanları filtreler ve yeni bir model oluşturur
                    var favMembers = result.filter(function(member) {
                        return member.fav === "1";
                    });
                    var oFavModel = new JSONModel();
                    oFavModel.setData({ favourites: favMembers });
                    that.getView().setModel(oFavModel, "favourites");
        
                    console.log("Request başarılı: " + JSON.stringify(result));
                    console.log("Favoriler modeli ayarlandı: ", that.getView().getModel("favourites").getData());

                    that.updateFavouriteIcons();
                })
                .catch(function(error) {
                    MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });
        },

        updateFavouriteIcons: function() {
            var oTable = this.byId("employeeTable");
            var oItems = oTable.getItems();
            oItems.forEach(function(item) {
                var oContext = item.getBindingContext();
                var favValue = oContext.getProperty("fav");
                var oButton = item.getCells()[0]; // Butonu index'i ile kontrol ediyoruz, güncelleme ile değişiklik gösterebilir diye
        
                if (favValue === "1") {
                    oButton.setIcon("sap-icon://favorite");
                } else {
                    oButton.setIcon("sap-icon://unfavorite");
                }
            });
        },
        
        
        onAdd: function() {
            var oDialog = this.byId("addDialog");
        
            if (oDialog) {
                oDialog.open();
            } else {
                console.error("Dialog bulunamadı.");
            }
        },
        

        
        
        onCancel: function () {

            this.clearInputs();
            this.byId("addDialog").close();
            
            
        },

        onAddConfirm: function () {
            var oView = this.getView();
            var oModel = oView.getModel("/Veriler");

            var oBegDate = oView.byId("inputBegDate").getDateValue();
            var oEndDate = oView.byId("inputEndDate").getDateValue();
            var oMusteri = oView.byId("inputMusteri").getValue();

            if(oMusteri == ""){
               MessageToast.show("Lütfen bir müşteri seçiniz.");
               return;
            }

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
                Pernr : oView.byId("inputPernr").getSelectedKey(),
                Name: oView.byId("inputName").getValue(),
                // departman : oView.byId("inputDepartman").getValue(),
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
                // departman : oNewEntry.departman,
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

          
            this.clearInputs();

            this.byId("addDialog").close();
            
        },

        clearInputs: function () {
            var oView = this.getView();
            oView.byId("inputID").setValue("");
            oView.byId("inputPernr").setValue("");
            oView.byId("inputName").setValue("");
            // oView.byId("inputDepartman").setValue("");
            oView.byId("inputMusteri").setValue("");
            oView.byId("inputBegDate").setValue(null);
            oView.byId("inputEndDate").setValue(null);
            oView.byId("inputIsDetay").setValue("");
            oView.byId("inputMusteriYorumu").setValue("");
            oView.byId("inputPersonelYorumu").setValue("");
            oView.byId("inputDurum").setSelectedKey("");
            oView.byId("inputIslem").setSelectedKey("");
            oView.byId("inputEfor").setValue("");
        },

        deleteRow: function (oEvent) {
            var Processname = "DeleteActivity";
            var oTable = this.byId("employeeTable");
           var item = oEvent.getSource().getParent();
           var context = item.getBindingContext();
           var row = context.getObject();
           var id = row.islemId;
            var that = this;
    
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

        getClient : function(){
            var Processname = "GetClientList"; 
            var Jsondata = {};
             this.request(Processname, Jsondata)
                .then(function(result) {
                
                console.log("Request başarılı: " + JSON.stringify(result));
                })
                .catch(function(error) {
                MessageToast.show("Request başarısız: " + JSON.stringify(error));
                });
            },

            onAddButtonPress: function () {
                this.byId("addClientDialog").open();
            },

            onCloseClient: function () {
                this.byId("addClientDialog").close();
            },

            onAddClient: async function() {
                var oView = this.getView();
                var sName = oView.byId("musteriID").getValue();
                if(sName === ""){
                    MessageToast.show("Müşteri adı boş olamaz.");
                    return;
                }
                console.log(sName);
            
                var Processname = "AddClient";
                var Jsondata = { musteri_ad: sName }
            
                var that = this; 
            
                // Önce mevcut müşteri modelini al ve aynı isimde müşteri olup olmadığını kontrol et
                var oClientModel = that.getView().getModel("clientModel");
                var aClients = oClientModel.getProperty("/clients");
                var lowerCaseName = sName.toLowerCase();
                var existingClient = aClients.find(client => client.musteriAd.toLowerCase() === lowerCaseName);
            
                if (existingClient) {
                    MessageToast.show("Zaten bu müşteri mevcut");
                    return;
                }

               
            
                await this.request(Processname, Jsondata)
                    .then(async function(result) {
                        console.log("Müşteri Eklendi " + JSON.stringify(result));
            
                        // Yeni müşteri bilgilerini ekle
                        aClients.push({ musteriId: result.musteriId, musteriAd: sName });
                        oClientModel.setProperty("/clients", aClients);
            
                        // ComboBox'ları yeniden bağla
                        ["inputMusteri", "dialogMusteri"].forEach(function(comboBoxId) {
                            var oComboBox = that.byId(comboBoxId);
                            oComboBox.bindItems({
                                path: "clientModel>/clients",
                                template: new sap.ui.core.ListItem({
                                    key: "{clientModel>musteriId}",
                                    text: "{clientModel>musteriAd}"
                                })
                            });
                        });
            
                        oView.byId("musteriID").setValue("");

                        oView.byId("inputMusteri").setValue(sName);
            
                        MessageToast.show("Müşteri Eklendi");
                    })
                    .catch(function(error) {
                        MessageToast.show("Request başarısız: " + JSON.stringify(error));
                    });

                this.byId("addClientDialog").close();
            },


            onOpenFavourite: function () {
                var oSplitterLayoutData = this.byId("favouriteSplitter");
                var currentSize = oSplitterLayoutData.getSize();
            
                if (currentSize === "0px") {
                    oSplitterLayoutData.setSize("25%");
                    var ProcessnameList = "GetList";
                    var JsondataList = {};
                    
                    this.request(ProcessnameList, JsondataList)
                        .then(function(result) {
                            console.log("Request başarılı: ", result);
                            
                            var favMembers = result.filter(function(member) {
                                return member.fav === "1";
                            });
                            var oFavModel = new JSONModel();
                            oFavModel.setData({ favourites: favMembers });
                            this.getView().setModel(oFavModel, "favourites");
                            
                            console.log("Favoriler modeli ayarlandı: ", this.getView().getModel("favourites").getData());
                        }.bind(this))
                        .catch(function(error) {
                            console.error("Request başarısız: ", error);
                            MessageToast.show("Request başarısız: " + JSON.stringify(error));
                        });
                } else {
                   
                    oSplitterLayoutData.setSize("0px");
                }
            },
            

            closeSplit: function () {
                var oSplitterLayoutData = this.byId("favouriteSplitter");
                oSplitterLayoutData.setSize("0px");
                

           
            },

     });
 });
 