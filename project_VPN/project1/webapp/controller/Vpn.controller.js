sap.ui.define([
    "vesaprem/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    
    
], function (BaseController, Fragment, UIComponent, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("vesaprem.controller.Vpn", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("vpn").attachPatternMatched(this._onObjectMatched, this);

            const oData = {
                 items: [
                	{
					   title: "TEST",
                       subtitle: "VSQ",
                       description: "great description",
					},
				
				]
			};

			const oModel1 = new JSONModel(oData);

            this.getView().setModel(oModel1, "test");

			this.getView().setModel(oModel);
            var oModel = new sap.ui.model.json.JSONModel({
                tiles: [],
                existingVpns: [{
                    title: "VPN1",
                    id: "ZVes345@123",
                    password: "D7!@Ahdq35.",
                    note: "-"
                },
                {
                    title: "2025NEW ",
                    id: "ZVes345",
                    password: "D7!@Ahdq35.",
                    note: "-"
                },
                {
                    title: "fioriuser",
                    id: "ZVes345",
                    password: "D7!@Ahdq35.",
                    note: "-"
                },
                {
                    title: "MergeSort",
                    id: "ZVes345",
                    password: "D7!@Ahdq35.",
                    note: "-"
                },
                {
                    title: "BubbleSort",
                    id: "ZVes345",
                    password: "D7!@Ahdq35.",
                    note: "-"
                },
                ],
                veriler: []
            });
            this.getView().setModel(oModel, "vpn");

        },
        
        _onObjectMatched: function (oEvent) {
        
            var sCompanyName = oEvent.getParameter("arguments").companyName;

            var oCompanyModel = new sap.ui.model.json.JSONModel({
               
                name: sCompanyName
            });
            this.getView().setModel(oCompanyModel, "company");
        },

        onAfterRendering: function () {
                var Processname = "GetCustCon";
                var Jsondata = {};
            
                this.request(Processname, Jsondata)
                    .then((result) => {
                        
                        this.getView().getModel("vpn").setProperty("/veriler", result);
                        console.log("%cVpn Bilgileri : ","color: blue; font-weight: bold;" ,result )
                    
                    })
                    .catch((error) => {
                        console.error("Request atılırken hata oluştu :", error);
                    });
            

        },

       
        


        testFunction : function () {
           MessageToast.show("Hello World!");
           console.log("AA")
        },

        testFunction2 : function () {
           MessageToast.show("Hello World22!");
        },

     

        onAddTilePress: function () {
            if (!this._oDialog) {
                Fragment.load({
                    name: "vesaprem.view.fragments.AddTile",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    this.getView().addDependent(this._oDialog);
                    this._oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },

        onSaveTilePress: function () {
            var oModel = this.getView().getModel("test");
            var aTiles = oModel.getProperty("/items");

            // Yeni kart verisi
            var sTitle = sap.ui.getCore().byId("inputTileTitle").getValue();
            var sSubTitle = sap.ui.getCore().byId("inputTileSubTitle").getValue();
            var sDescription = sap.ui.getCore().byId("inputTileDescription").getValue();

            if(sTitle === "") {
                sap.m.MessageToast.show("Kart adı boş bırakılamaz!");
              return;
            }
            if(sSubTitle === "") {
                sap.m.MessageToast.show("Alt kart adı boş bırakılamaz!");
              return;
            }
            if(sDescription === "") {
                sap.m.MessageToast.show("Kart açıklaması boş bırakılamaz!");
              return;
            }
            
            var oNewTile = {
                title: sTitle,
                subtitle: sSubTitle,
                description: sDescription
            };

            // Yeni kartı listeye ekleyelim
            aTiles.push(oNewTile);
            oModel.setProperty("/items", aTiles);

            

            this._oDialog.close();
            sap.m.MessageToast.show("Yeni kart eklendi!");
        },

        

        onCloseTilePress: function () {
            this._oDialog.close();
        },

        

        onDeleteTilePress: function(oTileData) {
            var oModel = this.getView().getModel("vpn");
            var aTiles = oModel.getProperty("/tiles");
        
            
            var iIndex = aTiles.findIndex(function(tile) {
                return tile.title === oTileData.title && tile.description === oTileData.description;
            });
        
            if (iIndex > -1) {
                aTiles.splice(iIndex, 1); 
                oModel.setProperty("/tiles", aTiles); 
        
                
                this._removeTileFromContainer(oTileData);
        
                
                this._updateIllustratedMessageVisibility();
                
                sap.m.MessageToast.show("Kart silindi!");
            }
        },
        
        _removeTileFromContainer: function(oTileData) {
            var oFlexBox = this.byId("tileContainer"); 
            var aItems = oFlexBox.getItems();
        
            
            for (var i = 0; i < aItems.length; i++) {
                var oTile = aItems[i];
                if (oTile.getHeader() === oTileData.title && oTile.getSubheader() === oTileData.description) {
                    oFlexBox.removeItem(oTile); 
                    break;
                }
            }
        },

        editTile: function (oEvent) {
            var oButton = oEvent.getSource();
            var oTile = oButton.getParent().getParent().getParent().getParent();
            var oTileData = oTile.getBindingContext("vpn").getObject();

            if (!this._oDialog) {
                this._oDialog = new sap.m.Dialog({
                    title: "Düzenle",
                    content: [
                        new sap.m.Label({ text: "Title" }),
                        new sap.m.Input({ value: oTileData.title, liveChange: function (oEvent) {
                            oTileData.title = oEvent.getParameter("value");
                        }}),
                        new sap.m.Label({ text: "Description" }),
                        new sap.m.Input({ value: oTileData.description, liveChange: function (oEvent) {
                            oTileData.description = oEvent.getParameter("value");
                        }})
                    ],
                    beginButton: new sap.m.Button({
                        text: "Kaydet",
                        press: function () {
                            oTile.getModel("vpn").refresh(true);
                            this._oDialog.close();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "İptal",
                        press: function () {
                            this._oDialog.close();
                        }.bind(this)
                    })
                });
            } else {
                this._oDialog.getContent()[1].setValue(oTileData.title);
                this._oDialog.getContent()[3].setValue(oTileData.description);
            }
            
            this._oDialog.open();
        },
        onTilePress: function (oTileData) {
           if(!this.byId("CompanyCardsDialog")){
                Fragment.load({
                    id: this.getView().getId(),
                    name: "vesaprem.view.fragments.CompanyCards",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    
                    oDialog.open();
                }.bind(this));
            } else {
                this.byId("CompanyCardsDialog").open();
            }
        },

        onCloseDialogPress: function () {
            this.byId("CompanyCardsDialog").close();
        },

        onTogglePasswordVisibility: function (oEvent) {
           
            var sInputId = oEvent.getSource().getCustomData()[0].getValue();
            var oInput = this.byId(sInputId);
            var bVisible = oInput.getType() === "Password";
            
        
            oInput.setType(bVisible ? "Text" : "Password");
        },


        //Vpn ekledikten sonra kayıt bilgilerine aktarmak için
        saveNewVPN: function () {
            var that = this; 

            if(!this.byId("inputTitle").getValue() || !this.byId("inputId").getValue() || !this.byId("passwordInput").getValue() || !this.byId("rePasswordInput").getValue()) {
                sap.m.MessageToast.show("Boş alan bırakmayınız.");
                return;
            } else {
            // Onay penceresini göster
            MessageBox.confirm("Kaydetmek istiyor musunuz?", {
                onClose: function (oAction) {
                    if (oAction === sap.m.MessageBox.Action.OK) {
                        // Kullanıcı "Evet" seçeneğini seçtiyse, kaydetme işlemini gerçekleştir
                        var oModel = that.getView().getModel("vpn");
                        var aExistingVpns = oModel.getProperty("/existingVpns");
                
                        var sTitle = that.byId("inputTitle").getValue();
                        var sId = that.byId("inputId").getValue();
                        var sPassword = that.byId("passwordInput").getValue();
                        var sRePassword = that.byId("rePasswordInput").getValue();
                        var sNote = that.byId("inputNote").getValue();
                
                        if (sPassword !== sRePassword) {
                            sap.m.MessageToast.show("Şifreler Aynı Olmalı!");
                            return;
                        }

                        /*
                        {
                          ek kontroller eklenebilir
                        }
                        */ 
                
                        var oNewVpn = {
                            title: sTitle,
                            id: sId,
                            password: sPassword,
                            note: sNote
                        };
                
                        aExistingVpns.push(oNewVpn);
                        oModel.setProperty("/existingVpns", aExistingVpns);
                        oModel.refresh(); // Modelin güncellenmesini sağla
        
                        that.byId("inputTitle").setValue("");
                        that.byId("inputId").setValue("");
                        that.byId("passwordInput").setValue("");
                        that.byId("rePasswordInput").setValue("");
                        that.byId("inputNote").setValue("");
                    } // Kullanıcı "Hayır" seçeneğini seçtiyse, hiçbir şey yapma
                }
            
            });
        }
        },

        editVSQ: function (oEvent) {
            var oButton = oEvent.getSource();
            var oItem = oButton.getParent().getParent(); 
            var oContext = oItem.getBindingContext("test"); 
        
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
        
            
            oDialog.close();
        },

        onCloseEditPress: function () {
            this.byId("VSQEdit").close();
        },

        //

        deleteClientFragment: function (oEvent) {
            var oButton = oEvent.getSource();
            var oItem = oButton.getParent().getParent(); 
            var oContext = oItem.getBindingContext("test"); 
        
            if (!this.byId("deleteCardDialog")) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "vesaprem.view.fragments.deleteCard",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
        
                    
                    oDialog.setBindingContext(oContext, "test");
        
                    console.log("Dialog yüklendi ve context bağlandı: ", oContext);
                    oDialog.open();
                }.bind(this));
            } else {
                var oDialog = this.byId("deleteCardDialog");
        
               
                oDialog.setBindingContext(oContext, "test");
        
                console.log("Mevcut dialog ve context bağlandı: ", oContext);
                oDialog.open();
            }
        },
        
        onCloseCardPress: function () {
            this.byId("deleteCardDialog").close();
        },
        
        onDeleteCardPress: function () {
            var oDialog = this.byId("deleteCardDialog");
            var oContext = oDialog.getBindingContext("test"); 
        
            if (oContext) {
                var oModel = oContext.getModel(); 
                var titleToDelete = oContext.getProperty("title"); 
        
               
                oModel.getData().items = oModel.getData().items.filter(function(item) {
                    return item.title !== titleToDelete; 
                });
        
                oModel.refresh(true); 
        
                
                console.log( titleToDelete + " başlıklı kart silindi.");
            } else {
                console.error("Context alınamadı.");
            }
        
            // Dialogu kapat
            oDialog.close();
        },
        /******************************************************************/
        // Delete Kart fragment

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oList = this.byId("existingVpnContainer");
            var oBinding = oList.getBinding("items");
            var aFilters = [];

            if(sQuery){
                aFilters.push(new Filter("title", FilterOperator.Contains, sQuery));

            }

            oBinding.filter(new Filter("title", FilterOperator.Contains, sQuery));
        },
        
    });
});
