sap.ui.define(
    [
        "vesaprem/controller/BaseController",
        "sap/ui/core/Fragment",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
    ],
    function (
        BaseController,
        Fragment,
        JSONModel,
        MessageToast,
        Filter,
        FilterOperator
    ) {
        "use strict";
        var oCompanyName;

        return BaseController.extend("vesaprem.controller.Home", {
            onInit: function () {
                this.getOwnerComponent().getRouter().initialize();
                //Kontrol amaçlı
                console.log("Component initialized.");
                var that = this;
            },

            onAfterRendering: function () {
                this.onRequestButtonPress();
            },

            helloworld: function () {
                MessageToast.show("Hello World");
            },

            onRequestButtonPress: function () {
                var Processname = "GetCustLet";
                var Jsondata = {};
                var that = this;

                return this.request(Processname, Jsondata)
                    .then(function (result) {
                        var custLetMap = {};
                        var sirketlerMap = []; 

                        result.forEach(function (item) {
                            if (!custLetMap[item.custLet]) {
                                custLetMap[item.custLet] = {
                                    custLet: item.custLet,
                                    custx: [], 
                                };
                            }

                          
                            if (!Array.isArray(item.custx)) {
                                item.custx = [item.custx];
                            }

                            item.custx.forEach(function (custxItem) {
                               
                                custLetMap[item.custLet].custx.push({ name: custxItem, custid: item.custid });

                                
                                if (!sirketlerMap.includes(custxItem)) {
                                    sirketlerMap.push({ sirketAdi: custxItem, custid: item.custid });
                                }
                            });
                        });

                        
                        var uniqueResults = Object.keys(custLetMap)
                            .sort()
                            .map(function (key) {
                                return custLetMap[key];
                            });

                        
                        var oModel = new JSONModel();
                        oModel.setData({
                            veriler: uniqueResults,
                            sirketler: sirketlerMap, 
                        });
                        that.getView().setModel(oModel, "Musteriler");

                        
                        var veriler = that.getView().getModel("Musteriler").getProperty("/veriler");
                        var sirketler = that.getView().getModel("Musteriler").getProperty("/sirketler");

                        console.log("%cİlk Gelen Model (Düzenlenmemiş) : ","color: blue; font-weight: bold;", result);                            
                        console.log("%cVeriler Modeli: (TabBar için) : ","color: blue; font-weight: bold;", veriler);
                        console.log("%cSirketler Modeli (SearchField İçin): ", "color: blue; font-weight: bold;", sirketler);

                        
                        
                    })
                    .catch(function (error) {
                        console.error("Request error: ", error);
                        MessageToast.show("Request failed: " + JSON.stringify(error));
                    });
            },

            openDetailsPopover: function (oEvent) {
                var oItem = oEvent.getParameter("listItem");
                

                if (!oItem) {
                    console.error("List item is null or undefined.");
                    return;
                }

                var oBindingContext = oItem.getBindingContext("deneme");
    

                if (!oBindingContext) {
                    console.error("Binding context is null or undefined.");
                    return;
                }

                this._currentListItemContext = oBindingContext;

                if (!this.byId("detailsPopover")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "vesaprem.view.fragments.TabBar",
                        controller: this,
                    })
                        .then(
                            function (oPopover) {
                                this.getView().addDependent(oPopover);
                                this._oDetailPopover = oPopover;
                                this._openPopover(oPopover, oItem);
                            }.bind(this)
                        )
                        .catch(function (oError) {
                            console.error("Error loading fragment:", oError);
                        });
                } else {
                    this._openPopover(this._oDetailPopover, oItem);
                }
            },

            _openPopover: function (oPopover, oItem) {
                var oBindingContext = oItem.getBindingContext("deneme");
                

                if (!oBindingContext) {
                    console.error("Binding context undefined veya null dönüyor");
                    return;
                }
                

               oPopover.setBindingContext(oBindingContext);
               oPopover.openBy(oItem);
            },
            openListOfCompanies: function (oEvent) {
                var oButton = oEvent.getSource();
                var sCustLet = oButton.getText();
                var oModel = this.getView().getModel("Musteriler");
                var aData = oModel.getProperty("/veriler");

                // Filtreleme işlemi
                var oFilteredData = aData.find(function (item) {
                    return item.custLet === sCustLet;
                });

                // Eğer oFilteredData varsa custx dizisini JSON model olarak ekliyoruz
                var oPopoverModel = new JSONModel(
                    oFilteredData ? { custx: oFilteredData.custx } : { custx: [] }
                );
                console.log("Filtered Data:", oFilteredData); // Filtrelenmiş veriyi kontrol edin
                

                var oView = this.getView();

                if (!this.byId("listOfCompaniesPopover")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "vesaprem.view.fragments.ListofCompanies",
                        controller: this,
                    }).then(
                        function (oPopover) {
                            oView.addDependent(oPopover);
                            oPopover.setModel(oPopoverModel, "deneme");
                            oPopover.openBy(oButton);
                        }.bind(this)
                    );
                } else {
                    var oPopover = this.byId("listOfCompaniesPopover");
                    oPopover.setModel(oPopoverModel, "deneme");
                    oPopover.openBy(oButton);
                }
            },


            onVPNPress: function () {
                if (this._currentListItemContext) {
                    var sCompanyName = this._currentListItemContext.getProperty("name"); 
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("vpn", {
                        companyName: sCompanyName,
                    });

                    console.log(sCompanyName);
                } else {
                    console.error("Şirket bilgisi alınamadı.");
                }
            },

            _openAddTileDialog: function () {
                if (!this._oAddTileDialog) {
                    Fragment.load({
                        name: "vesaprem.view.fragments.AddTileDialog",
                        controller: this,
                    }).then(
                        function (oDialog) {
                            this._oAddTileDialog = oDialog;
                            this.getView().addDependent(this._oAddTileDialog);
                            this._oAddTileDialog.open();
                        }.bind(this)
                    );
                } else {
                    this._oAddTileDialog.open();
                }
            },

            onAddTile: function () {
                var oModel = this.getView().getModel();
                var aSelectedCompanyCards = oModel.getProperty("/selectedCompanyCards");
                var sTitle = sap.ui.getCore().byId("newTileTitle").getValue();
                var sDescription = sap.ui
                    .getCore()
                    .byId("newTileDescription")
                    .getValue();
                var newCard = {
                    title: sTitle,
                    description: sDescription,
                };
                aSelectedCompanyCards.push(newCard);
                oModel.setProperty("/selectedCompanyCards", aSelectedCompanyCards);

                var oTileContainer = this.byId("companyTileContainer");
                var newItem = new sap.m.GenericTile({
                    header: newCard.title,
                    subheader: newCard.description,
                    size: "Auto",
                    tileContent: new sap.m.TileContent({
                        content: new sap.m.Text({ text: newCard.description }),
                    }),
                    press: function () {
                        this._openTilePopup(newCard);
                    }.bind(this),
                });
                newItem.addStyleClass("sapUiTinyMargin");
                oTileContainer.addItem(newItem);

                this._oAddTileDialog.close();
            },

            onCloseDialog: function () {
                if (this._oAddTileDialog) {
                    this._oAddTileDialog.close();
                }
            },

            _addNewCard: function () {
                var oModel = this.getView().getModel();
                var aSelectedCompanyCards = oModel.getProperty("/selectedCompanyCards");

                // Yeni kart ekliyoruz
                var newCard = {
                    title: "New Card",
                    description: "New Description",
                };
                aSelectedCompanyCards.push(newCard);
                oModel.setProperty("/selectedCompanyCards", aSelectedCompanyCards);

                // Tile Container'ı güncelle
                var oTileContainer = this.byId("companyTileContainer");
                var newItem = new sap.m.GenericTile({
                    header: newCard.title,
                    subheader: newCard.description,
                    size: "Auto",
                    tileContent: new sap.m.TileContent({
                        content: new sap.m.Text({ text: newCard.description }),
                    }),
                    press: function () {
                        this._openTilePopup(newCard);
                    }.bind(this),
                });
                newItem.addStyleClass("sapUiTinyMargin");
                oTileContainer.addItem(newItem);
            },

            onSystemInfoPress: function () {
                if (this._currentListItemContext) {
                    var sCompanyName = this._currentListItemContext.getProperty("name"); // Şirket ismini al
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("vsqvsp", {
                        companyName: sCompanyName,
                    });

                    console.log(sCompanyName);
                } else {
                    console.error("Şirket bilgisi alınamadı.");
                }
            },

            updateTile: function (sHeader, sNewTitle, sNewDescription) {
                var oTileContainer = this.byId("companyTileContainer");
                var aTiles = oTileContainer.getItems();
                aTiles.forEach(function (tile) {
                    if (tile.getHeader() === sHeader) {
                        tile.setHeader(sNewTitle);
                        tile.setSubheader(sNewDescription);
                        tile.getTileContent()[0].getContent().setText(sNewDescription);
                    }
                });
            },

            _openTilePopup: function (card) {
                var oModel = new sap.ui.model.json.JSONModel(card);
                if (!this._oTilePopup) {
                    this._oTilePopup = new sap.m.Dialog({
                        title: "Tile Details",
                        content: [
                            new sap.m.VBox({
                                items: [
                                    new sap.m.Text({ text: "{/title}" }),
                                    new sap.m.Text({ text: "{/description}" }),
                                ],
                            }),
                        ],
                        buttons: [
                            new sap.m.Button({
                                text: "Close",
                                press: function () {
                                    this._oTilePopup.close();
                                }.bind(this),
                            }),
                            new sap.m.Button({
                                text: "Update Tile",
                                press: function () {
                                    var sNewTitle = "Updated " + card.title;
                                    var sNewDescription = "Updated Description";
                                    this.updateTile(card.title, sNewTitle, sNewDescription);
                                    this._oTilePopup.close();
                                }.bind(this),
                            }),
                        ],
                    });
                    this.getView().addDependent(this._oTilePopup);
                }
                this._oTilePopup.setModel(oModel);
                this._oTilePopup.open();
            },

            editTile: function (oEvent) {
                var oButton = oEvent.getSource();
                var oTile = oButton.getParent().getParent().getParent().getParent();
                var oBindingContext = oTile.getBindingContext(); // Bağlamı elde etme

                if (oBindingContext) {
                    var oTileData = oBindingContext.getObject(); // oTileData değişkenini elde ediyoruz

                    // Dialog nesnesini oluşturma
                    if (!this._oDialog) {
                        this._oDialog = new sap.m.Dialog({
                            title: "Düzenle",
                            content: [
                                new sap.m.Label({ text: "Title" }),
                                new sap.m.Input({
                                    value: oTileData.title,
                                    liveChange: function (oEvent) {
                                        oTileData.title = oEvent.getParameter("value");
                                    },
                                }),
                                new sap.m.Label({ text: "Description" }),
                                new sap.m.Input({
                                    value: oTileData.description,
                                    liveChange: function (oEvent) {
                                        oTileData.description = oEvent.getParameter("value");
                                    },
                                }),
                            ],
                            beginButton: new sap.m.Button({
                                text: "Kaydet",
                                press: function () {
                                    oTile.getModel().refresh(true); // Güncellenmiş verileri modele kaydet ve yenile
                                    this._oDialog.close();
                                }.bind(this),
                            }),
                            endButton: new sap.m.Button({
                                text: "İptal",
                                press: function () {
                                    this._oDialog.close();
                                }.bind(this),
                            }),
                        });
                    } else {
                        // Dialog içeriğini güncelle
                        this._oDialog.getContent()[1].setValue(oTileData.title);
                        this._oDialog.getContent()[3].setValue(oTileData.description);
                    }

                    this._oDialog.open();
                } else {
                    sap.m.MessageBox.error("Veri bağlamı bulunamadı.");
                }
            },

            makeHocusPokus: function () {
                var oDetailsContainer = this.byId("detailsContainer");
                var oCompanyTileContainer = this.byId("companyTileContainer");

                if (oDetailsContainer.getVisible() === true) {
                    oDetailsContainer.setVisible(false);
                    oCompanyTileContainer.setVisible(true);
                    console.log("AAA");
                }
            },

            navToChooseSection: function (oEvent) {
                var sCompanyName = oEvent.getParameter("selectedItem").getText();
                console.log(sCompanyName);
                if (sCompanyName) {
                    // Model oluştur ve veri set et
                    var oCompanyModel = new sap.ui.model.json.JSONModel({
                        name: sCompanyName,
                    });
                    this.getView().setModel(oCompanyModel, "company");

                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("chooseSection", {
                        companyName: sCompanyName,
                    });
                } else {
                    sap.m.MessageToast.show("Lütfen bir müşteri seçiniz.");
                }
            },

            getVPNTest: function () {
                var Processname= "GetVpnData";
                var Jsondata={};
                var that = this;


                return this.request(Processname, Jsondata)
                .then((result) => {
                    var oModel = new sap.ui.model.json.JSONModel(result);
                    that.getView().setModel(oModel, "asdasd");
                    console.log(oModel)
                    
                    console.log("%cVpn Bilgileri : ","color: blue; font-weight: bold;" ,result )
                
                })
                .catch((error) => {
                    console.error("Request atılırken hata oluştu :", error);
                });

            }


           
        });
    }
);
