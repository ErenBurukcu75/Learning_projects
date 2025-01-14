sap.ui.define([
    
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "vesaprem/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
    
], function (Fragment, UIComponent,BaseController, JSONModel, MessageToast) {
    "use strict";

    return BaseController.extend("vesaprem.controller.Vsqvsp", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("vsqvsp").attachPatternMatched(this._onObjectMatched, this);
            var oModel = new sap.ui.model.json.JSONModel({ tiles: [] });
            this.getView().setModel(oModel, "vpn");

            const oData = {
                sunucular: [
                   {
                       title: "TEST",
                       subtitle: "VSQ",
                       description: "great description",
                   },
               
               ]
           };

           const oModel1 = new JSONModel(oData);

           this.getView().setModel(oModel1, "Sunucu");
            console.log(oModel);

           
        },

       
       
        _onObjectMatched: function (oEvent) {
            
        
            var sCompanyName = oEvent.getParameter("arguments").companyName;

            var oCompanyModel = new sap.ui.model.json.JSONModel({
               
                name: sCompanyName
            });
            this.getView().setModel(oCompanyModel, "company");
        },

        /**************************************************/
        //Add Kart Fragment

        addClient: function () {
            if (!this.byId("VSQAdder")) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "vesaprem.view.fragments.Vsqdialog",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this.byId("VSQAdder").open();
            }
        },



        onSaveTilePress: function () {
            var oModel = this.getView().getModel("Sunucu");
            var aTiles = oModel.getProperty("/sunucular");

            var sTitle = this.byId("inputVSQTitle").getValue();
            var sSubTitle = this.byId("inputVSQSubTitle").getValue();
            var sDescription = this.byId("inputVSQDescription").getValue();

            if(sTitle === "") {
                sap.m.MessageToast.show("Başlık alanı boş bırakılamaz!");
                return;
            } else if(sSubTitle === "") {
                sap.m.MessageToast.show("Alt başlık alanı boş bırakılamaz!");
                return;
            } else if(sDescription === "") {
                sap.m.MessageToast.show("Açıklama alanı boş bırakılamaz!");
                return;
            }

            var oNewTile = {
                title: sTitle,
                subtitle: sSubTitle,
                description: sDescription
            };

            aTiles.push(oNewTile);
            oModel.setProperty("/sunucular", aTiles);

            this.byId("inputVSQTitle").setValue("");
            this.byId("inputVSQSubTitle").setValue("");
            this.byId("inputVSQDescription").setValue("");

            this.byId("VSQAdder").close();
            sap.m.MessageToast.show("Yeni kart eklendi!");
        },

        onCloseTilePress: function () {
            this.byId("VSQAdder").close();
        },

        //Add Kart Fragment
        /**************************************************/
       

        

        

        /*******************************************/
        //Edit Kart Fragment

        editVSQ: function (oEvent) {
            var oButton = oEvent.getSource();
            var oItem = oButton.getParent().getParent(); 
            var oContext = oItem.getBindingContext("Sunucu"); 
        
            if (!oContext) {
                console.error("Context alınamadı. Binding modelini kontrol edin.");
                return;
            }
        
            
            var setDialogValues = function(oDialog) {
                var sTitle = oContext.getProperty("title");
                var sSubTitle = oContext.getProperty("subtitle");
                var sDescription = oContext.getProperty("description");
        
                this.byId("editVSQTitle").setValue(sTitle);
                this.byId("editVSQSubTitle").setValue(sSubTitle);
                this.byId("editVSQDescription").setValue(sDescription);
        
                
                oDialog.setBindingContext(oContext, "Sunucu");
        
               
                console.log("Context başarıyla bağlandı: ", oContext);
        
                oDialog.open();
            }.bind(this);
        
            
            if (!this.byId("VSQEdit")) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "vesaprem.view.fragments.Vsqeditdialog",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    setDialogValues(oDialog);
                }.bind(this));
            } else {
                setDialogValues(this.byId("VSQEdit")); 
            }
        },
        
        

        onSaveEditPress: function () {
            var sTitle = this.byId("editVSQTitle").getValue();
            var sSubTitle = this.byId("editVSQSubTitle").getValue();
            var sDescription = this.byId("editVSQDescription").getValue();
        
            var oDialog = this.byId("VSQEdit"); 
            var oContext = oDialog.getBindingContext("Sunucu"); 
        
            if (oContext) {
                var sPath = oContext.getPath(); 
        
                
                oContext.getModel().setProperty(sPath + "/title", sTitle);
                oContext.getModel().setProperty(sPath + "/subtitle", sSubTitle);
                oContext.getModel().setProperty(sPath + "/description", sDescription);
        
               
                console.log("Güncellenen veri:", {
                    title: sTitle,
                    subtitle: sSubTitle,
                    description: sDescription
                });
                MessageToast.show("Kart bilgileri güncellendi.");
            } else {
                console.error("Context alınamadı.");
            }
        
            // Dialogu kapat
            oDialog.close();
        },
        

        onCloseEditPress: function () {
            this.byId("VSQEdit").close();
        },

        //Edit Kart Fragment
        /*******************************************/
        

        /* Logonin sayfasına gönder */
        onTilePress: function (oEvent) {
            var oItem = oEvent.getSource(); 
            var sPath = oItem.getBindingContextPath();
            var oModel = this.getView().getModel("Sunucu"); 
            var sTile = oModel.getProperty(sPath + "/title"); 

            var oModel2 = this.getView().getModel("company");
            var sCompanyName = oModel2.getProperty("/name");
            


        
            if (sTile) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("logonin", {
                    tileName: sTile, 
                    companyName: sCompanyName
                });
            } else {
                console.error("%cŞirket bilgisi alınamadı.", "color: red; font-weight: bold;");
            }
        }
        ,
        
 

        /******************************************************************/
        // Delete Kart fragment

        deleteClientFragment: function (oEvent) {
            var oButton = oEvent.getSource();
            var oItem = oButton.getParent().getParent(); // CustomListItem'a erişim
            var oContext = oItem.getBindingContext("Sunucu"); // Sunucu modeline bağlı Context al
        
            if (!this.byId("deleteCardDialog")) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "vesaprem.view.fragments.deleteCard",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
        
                    // Context'i dialoga bağla
                    oDialog.setBindingContext(oContext, "Sunucu");
        
                    console.log("Dialog yüklendi ve context bağlandı: ", oContext);
                    oDialog.open();
                }.bind(this));
            } else {
                var oDialog = this.byId("deleteCardDialog");
        
                // Context'i dialoga bağla
                oDialog.setBindingContext(oContext, "Sunucu");
        
                console.log("Mevcut dialog ve context bağlandı: ", oContext);
                oDialog.open();
            }
        },
        
        onCloseCardPress: function () {
            this.byId("deleteCardDialog").close();
        },
        
        onDeleteCardPress: function (oEvent) {
            var oDialog = this.byId("deleteCardDialog");
            var oContext = oDialog.getBindingContext("Sunucu"); // Dialogun bağlı context'ini al
        
            if (oContext) {
                var oModel = oContext.getModel(); // Modeli al
                var titleToDelete = oContext.getProperty("title"); // Silinecek öğenin başlığını al
        
                // Veriyi modelden kaldır
                oModel.getData().sunucular = oModel.getData().sunucular.filter(function(item) {
                    return item.title !== titleToDelete; // Eşleşen başlığı olan öğeyi çıkar
                });
        
                oModel.refresh(true); // Modeli yenileyerek UI'yi güncelle
        
                // Silme işlemini doğrulamak için log yaz
                console.log( titleToDelete + " başlıklı kart silindi.");
            } else {
                console.error("Context alınamadı.");
            }
        
            // Dialogu kapat
            oDialog.close();
        },
        /******************************************************************/
        // Delete Kart fragment
        
    });
});
