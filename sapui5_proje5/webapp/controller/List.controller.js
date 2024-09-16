sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "sap/m/MessageToast",
	"sap/m/MessageBox",
], function (Controller, JSONModel, Sorter, Filter, FilterOperator, FilterType, MessageToast, MessageBox) {
    "use strict";

    function sortProductsById(aProducts) {
        return aProducts.sort(function(a, b) {
            return a.ProductId.localeCompare(b.ProductId);
        });
    }

           // Sıralama sayacı
         var sortCounter = 0;
           // Seçme sayacı
         var selectCounter  = 0;
          // Edit sayacı
         var editCounter = 0;

    return Controller.extend("sapui5proje2.controller.List", {
        onInit: function () {
        

           var sPath = jQuery.sap.getModulePath("sapui5proje2", "/model/mockdata/products.json");
           var oModel = new JSONModel(sPath);
           
           this.getView().setModel(oModel, "mainModel")

           var model = this.getView().getModel("mainModel"); 
           console.log("model", model)
          
           
        },

        onSearch: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                var filter = new Filter("Name", FilterOperator.Contains, sQuery);
                aFilters.push(filter);

    
            }
            var oList = this.byId("peopleList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters, "Application");
        },

        onRefresh: function () {
            var oList = this.byId("peopleList");
            var oBinding = oList.getBinding("items");
            if (oBinding) {
            
                var oModel = this.getView().getModel("mainModel");
                var aData = oModel.getProperty("/products");
        
              
                oModel.setProperty("/products", aData);
        
               
                oBinding.refresh(true); 
        
            
                oList.setModel(oModel);
                oList.bindItems({
                    path: "mainModel>/products",
                    template: oList.getBindingInfo("items").template
                });
        
                MessageToast.show("Liste yenilendi");
            }
        },

        

        onCreate: function () {
            this.byId("createDialog").open();
        },

        
        

        onCancel: function () {
            this.byId("createDialog").close();
        },

    
        onCreateConfirm: function () {
            var oModel = this.getView().getModel("mainModel");
            var aProducts = oModel.getProperty("/products");
        
            var sProductId = this.byId("productIdInput").getValue();
            var sProductName = this.byId("productNameInput").getValue();
            var sCategory = this.byId("categoryInput").getValue();
        
            var oNewProduct = {
                ProductId: sProductId,
                Name: sProductName,
                Category: sCategory
            };
        
      
            aProducts.unshift(oNewProduct);
            oModel.setProperty("/products", aProducts);

            aProducts = sortProductsById(aProducts);
            oModel.setProperty("/products", aProducts);
        
         
            var oList = this.byId("peopleList");
            oList.setModel(oModel);
            oList.bindItems({
                path: "mainModel>/products",
                template: oList.getBindingInfo("items").template
            });
        
            oList.getBinding("items").refresh();
        
            this.byId("createDialog").close();
            MessageToast.show("Yeni ürün eklendi");
        },


        onSort: function () {
            var oList = this.byId("peopleList");
            var oBinding = oList.getBinding("items");
        
            var sSortField;
            var mesaj;
            if (sortCounter === 0) {
                sSortField = "ProductId";
                mesaj = "Liste Product ID alanına göre sıralandı";
                sortCounter++;

            } else if (sortCounter === 1) {
                sSortField = "Name";
                mesaj = "Liste Product Name alanına göre sıralandı";
                sortCounter++;
            } else {
                sSortField = "Category";
                mesaj = "Liste Category alanına göre sıralandı";
                sortCounter = 0;
            }
        
            oBinding.sort(new Sorter(sSortField, false));
        
            
        
            MessageToast.show(mesaj);
        },

        onSelectionChange : function (oEvent) {

            var oTable = oEvent.getSource();
            var aSelectedItems = oTable.getSelectedItems();
            var oDeleteButton = this.byId("deleteIcon");
            var oConfirmScreen = this.byId("overFlowToolbar");

        
            if (aSelectedItems.length > 0) {
                oDeleteButton.setEnabled(true);
                oConfirmScreen.setVisible(true);
            } else {
                oConfirmScreen.setVisible(false);
            }
        },
        
        onConfirmDelete: function () {
            var oTable = this.byId("peopleList");
            var aSelectedItems = oTable.getSelectedItems();
            var oModel = this.getView().getModel("mainModel");
            var aProducts = oModel.getProperty("/products");
        
            var aDeletedProducts = [];
            for (var i = 0; i < aSelectedItems.length; i++) {
                var oItem = aSelectedItems[i];
                var sProductId = oItem.getBindingContext("mainModel").getObject().ProductId;
                aDeletedProducts.push(sProductId);
                aProducts = aProducts.filter(function (product) {
                    return product.ProductId !== sProductId;
                });
            }
        
            oModel.setProperty("/products", aProducts);
            oModel.refresh();

            oTable.removeSelections(true);

            MessageToast.show("Seçili ürünler silindi");

            var oConfirmScreen = this.byId("overFlowToolbar");


            oConfirmScreen.setVisible(false);
            oTable.setMode("None");
            //Sayaç Kontrol 
            selectCounter++;
        
      
            

        },

       
        onEnableMultiSelect: function () {
            var oTable = this.byId("peopleList");
            var oConfirmScreen = this.byId("overFlowToolbar");

            selectCounter++;

            if (selectCounter % 2 === 1) {
            oTable.setMode("MultiSelect");
            MessageToast.show("Çoklu seçim modu aktif");
            } else {
        
            oTable.setMode("None");
            MessageToast.show("Çoklu seçim modu devre dışı");
               if (oConfirmScreen.getVisible() === true) {
                oConfirmScreen.setVisible(false);
               }
            }
        },

        doNothing: function () {

            var oConfirmScreen = this.byId("overFlowToolbar");
            var oTable = this.byId("peopleList");

            oConfirmScreen.setVisible(false);
            oTable.setMode("None");
            selectCounter++;

            MessageToast.show("Silme İşlemi İptal edildi");
        },

        
        onEditPress: function (oEvent) {
            var oItem = oEvent.getSource().getParent();
            var oContext = oItem.getBindingContext("mainModel");
            var oProduct = oContext.getObject();
        
            // Düzenleme işlemleri burada yapılabilir
            sap.m.MessageToast.show("Düzenlenecek ürün: " + oProduct.Name);
            var oDialog = this.byId("createEdit");

            this.byId("productNameInputEdit").setValue(oProduct.Name);
            this.byId("productIdInputEdit").setValue(oProduct.ProductId);
            this.byId("categoryInputEdit").setValue(oProduct.Category);

            oDialog.open();
        },

        onEditConfirm: function (oEvent) {

            var oTable = this.byId("peopleList");
            var aItems = oTable.getItems();
            var oDialog = this.byId("createEdit");
            var oInputName = this.byId("productNameInputEdit");
            var oInputId = this.byId("productIdInputEdit");
            var oInputCategory = this.byId("categoryInputEdit");
            var oModel = this.getView().getModel("mainModel");
            var aProducts = oModel.getProperty("/products");
            var sProductId = oInputId.getValue();
            var sProductName = oInputName.getValue();
            var sProductCategory = oInputCategory.getValue();
            
            var oProduct = aProducts.find(function (product) {
                return product.ProductId === sProductId;
            });

            if (!oProduct) {
                MessageToast.show("Ürün bulunamadı");
                return;
            }

            oProduct.Name = sProductName;
            oProduct.Category = sProductCategory;

            // Edit Sütununu kapatma
            var oEditColumn = this.byId("forEdit");
            editCounter++;


            if (editCounter % 2 === 1) {
                oEditColumn.setVisible(true);
            } else {
                oEditColumn.setVisible(false);
            }

            oModel.setProperty("/products", aProducts);
            oModel.refresh();
            oDialog.close();
            MessageToast.show("Urun Düzenlendi");

        },

        onCancelEdit: function () {
            this.byId("createEdit").close();
        },

        
        onEditOpen: function () {
            var oTable = this.byId("peopleList");
            var aItems = oTable.getItems();
            var oEditColumn = this.byId("forEdit");
            editCounter++;


            if (editCounter % 2 === 1) {
                oEditColumn.setVisible(true);
            } else {
                oEditColumn.setVisible(false);
            }


            aItems.forEach(function (oItem) {
            var oEditButton = oItem.getCells().find(function (oCell) {
            return oCell.getMetadata().getName() === "sap.m.Button" && oCell.getIcon() === "sap-icon://edit";
        });
 
        

        if (oEditButton && (editCounter % 2 === 1)) {
            oEditButton.setVisible(true);
        } else {
            oEditButton.setVisible(false);
        }
            });
        }
        
        
        
    });
});
