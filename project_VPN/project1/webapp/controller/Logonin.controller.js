sap.ui.define([
    "vesaprem/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    
   
], function (BaseController, History, JSONModel, MessageToast, Filter, FilterOperator) {
    "use strict";
    var counter = 0;

    return BaseController.extend("vesaprem.controller.Logonin", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("logonin").attachPatternMatched(this._onObjectMatched, this);
            // Gerekli başlangıç işlemleri buraya eklenebilir
            var oModel = new JSONModel({
                "items" :  [
                  {
                    Baslik: "Azersun",
                    KullaniciAdi: "kullanici1",
                    Parola: "Parola123!",
                    Not: "Ilk kullanici icin ornek notgdfgfdgdfgdfgdfgdfgdfg."
                  },
                  {
                    Baslik: "Oyak",
                    KullaniciAdi: "kullanici2",
                    Parola: "Parola456!",
                    Not: "lorem ipsum dolor sit amet. lorem ipsum dolor sit amet"
                  },
                  {
                    Baslik: "AKFEN",
                    KullaniciAdi: "kullanici3",
                    Parola: "Parola789!",
                    Not: "Ucuncu kullanici icin ornek not."
                  },
                  {
                    Baslik: "Pasha",
                    KullaniciAdi: "kullanici4",
                    Parola: "Parola101!",
                    Not: "Dorduncu kullanici icin ornek not."
                  },
                  {
                    Baslik: "AKFEN",
                    KullaniciAdi: "kullanici3",
                    Parola: "Parola789!",
                    Not: "Ucuncu kullanici icin ornek not."
                  },
                  {
                    Baslik: "Pasha",
                    KullaniciAdi: "kullanici4",
                    Parola: "Parola101!",
                    Not: "Dorduncu kullanici icin ornek not."
                  },
                  {
                    Baslik: "AKFEN",
                    KullaniciAdi: "kullanici3",
                    Parola: "Parola789!",
                    Not: "Ucuncu kullanici icin ornek not."
                  },
                  {
                    Baslik: "Pasha",
                    KullaniciAdi: "kullanici4",
                    Parola: "Parola101!",
                    Not: "Dorduncu kullanici icin ornek not."
                  },
                  {
                    Baslik: "AKFEN",
                    KullaniciAdi: "kullanici3",
                    Parola: "Parola789!",
                    Not: "Ucuncu kullanici icin ornek not."
                  },
                  {
                    Baslik: "Pasha",
                    KullaniciAdi: "kullanici4",
                    Parola: "Parola101!",
                    Not: "Dorduncu kullanici icin ornek not."
                  }
                ]
            }
              );
              this.getView().setModel(oModel, "users");
              var oModelLog = new JSONModel({
                "items" :  [
                  
                    {
                      tarih: "01.01.2023",
                      saat: "09:00",
                      degisiklik: "Kullanıcı parolası değiştirildi"
                    },
                    {
                      tarih: "02.01.2023",
                      saat: "10:15",
                      degisiklik: "Yeni kullanıcı eklendi"
                    },
                    {
                      tarih: "03.01.2023",
                      saat: "11:30",
                      degisiklik: "Kullanıcı silindi"
                    },
                    {
                      tarih: "04.01.2023",
                      saat: "12:45",
                      degisiklik: "Kullanıcı rolü güncellendi"
                    },
                    {
                      tarih: "05.01.2023",
                      saat: "14:00",
                      degisiklik: "Kullanıcı parolası sıfırlandı"
                    },
                    {
                      tarih: "06.01.2023",
                      saat: "15:15",
                      degisiklik: "Kullanıcı bilgileri güncellendi"
                    },
                    {
                      tarih: "07.01.2023",
                      saat: "16:30",
                      degisiklik: "Yeni kullanıcı eklendi"
                    },
                    {
                      tarih: "08.01.2023",
                      saat: "17:45",
                      degisiklik: "Kullanıcı hesabı kilitlendi"
                    },
                    {
                      tarih: "09.01.2023",
                      saat: "18:00",
                      degisiklik: "Kullanıcı hesabı etkinleştirildi"
                    },
                    {
                      tarih: "10.01.2023",
                      saat: "19:00",
                      degisiklik: "Kullanıcı rolü güncellendi"
                    },
                    {
                      tarih: "11.01.2023",
                      saat: "20:00",
                      degisiklik: "Kullanıcı bilgileri güncellendi"
                    },
                    {
                      tarih: "12.01.2023",
                      saat: "21:00",
                      degisiklik: "Yeni kullanıcı eklendi"
                    },
                    {
                      tarih: "13.01.2023",
                      saat: "22:00",
                      degisiklik: "Kullanıcı parolası değiştirildi"
                    },
                    {
                      tarih: "14.01.2023",
                      saat: "23:00",
                      degisiklik: "Kullanıcı silindi"
                    },
                    {
                      tarih: "15.01.2023",
                      saat: "08:30",
                      degisiklik: "Kullanıcı rolü güncellendi"
                    },
                    {
                      tarih: "16.01.2023",
                      saat: "09:45",
                      degisiklik: "Yeni kullanıcı eklendi"
                    },
                    {
                      tarih: "17.01.2023",
                      saat: "11:00",
                      degisiklik: "Kullanıcı parolası sıfırlandı"
                    },
                    {
                      tarih: "18.01.2023",
                      saat: "12:15",
                      degisiklik: "Kullanıcı bilgileri güncellendi"
                    },
                    {
                      tarih: "19.01.2023",
                      saat: "13:30",
                      degisiklik: "Kullanıcı hesabı kilitlendi"
                    },
                    {
                      tarih: "20.01.2023",
                      saat: "14:45",
                      degisiklik: "Kullanıcı hesabı etkinleştirildi"
                    },
                    {
                      tarih: "21.01.2023",
                      saat: "15:00",
                      degisiklik: "Kullanıcı rolü güncellendi"
                    },
                    {
                      tarih: "22.01.2023",
                      saat: "16:00",
                      degisiklik: "Yeni kullanıcı eklendi"
                    },
                    {
                      tarih: "23.01.2023",
                      saat: "17:00",
                      degisiklik: "Kullanıcı parolası değiştirildi"
                    },
                    {
                      tarih: "24.01.2023",
                      saat: "18:00",
                      degisiklik: "Kullanıcı silindi"
                    },
                    {
                      tarih: "25.01.2023",
                      saat: "19:00",
                      degisiklik: "Kullanıcı rolü güncellendi"
                    },
                    {
                      tarih: "26.01.2023",
                      saat: "20:00",
                      degisiklik: "Kullanıcı bilgileri güncellendi"
                    },
                    {
                      tarih: "27.01.2023",
                      saat: "21:00",
                      degisiklik: "Yeni kullanıcı eklendi"
                    },
                    {
                      tarih: "28.01.2023",
                      saat: "22:00",
                      degisiklik: "Kullanıcı parolası değiştirildi"
                    },
                    {
                      tarih: "29.01.2023",
                      saat: "23:00",
                      degisiklik: "Kullanıcı silindi"
                    },
                    {
                      tarih: "30.01.2023",
                      saat: "08:00",
                      degisiklik: "Kullanıcı rolü güncellendi"
                    },
                    
                      {
                        tarih: "01.01.2023",
                        saat: "09:00",
                        degisiklik: "Kullanıcı parolası değiştirildi"
                      },
                      {
                        tarih: "02.01.2023",
                        saat: "10:15",
                        degisiklik: "Yeni kullanıcı eklendi"
                      },
                      {
                        tarih: "03.01.2023",
                        saat: "11:30",
                        degisiklik: "Kullanıcı silindi"
                      },
                      {
                        tarih: "04.01.2023",
                        saat: "12:45",
                        degisiklik: "Kullanıcı rolü güncellendi"
                      },
                      {
                        tarih: "05.01.2023",
                        saat: "14:00",
                        degisiklik: "Kullanıcı parolası sıfırlandı"
                      },
                      {
                        tarih: "06.01.2023",
                        saat: "15:15",
                        degisiklik: "Kullanıcı bilgileri güncellendi"
                      },
                      {
                        tarih: "07.01.2023",
                        saat: "16:30",
                        degisiklik: "Yeni kullanıcı eklendi"
                      },
                      {
                        tarih: "08.01.2023",
                        saat: "17:45",
                        degisiklik: "Kullanıcı hesabı kilitlendi"
                      },
                      {
                        tarih: "09.01.2023",
                        saat: "18:00",
                        degisiklik: "Kullanıcı hesabı etkinleştirildi"
                      },
                      {
                        tarih: "10.01.2023",
                        saat: "19:00",
                        degisiklik: "Kullanıcı rolü güncellendi"
                      },
                      {
                        tarih: "11.01.2023",
                        saat: "20:00",
                        degisiklik: "Kullanıcı bilgileri güncellendi"
                      },
                      {
                        tarih: "12.01.2023",
                        saat: "21:00",
                        degisiklik: "Yeni kullanıcı eklendi"
                      },
                      {
                        tarih: "13.01.2023",
                        saat: "22:00",
                        degisiklik: "Kullanıcı parolası değiştirildi"
                      },
                      {
                        tarih: "14.01.2023",
                        saat: "23:00",
                        degisiklik: "Kullanıcı silindi"
                      },
                      {
                        tarih: "15.01.2023",
                        saat: "08:30",
                        degisiklik: "Kullanıcı rolü güncellendi"
                      },
                      {
                        tarih: "16.01.2023",
                        saat: "09:45",
                        degisiklik: "Yeni kullanıcı eklendi"
                      },
                      {
                        tarih: "17.01.2023",
                        saat: "11:00",
                        degisiklik: "Kullanıcı parolası sıfırlandı"
                      },
                      {
                        tarih: "18.01.2023",
                        saat: "12:15",
                        degisiklik: "Kullanıcı bilgileri güncellendi"
                      },
                      {
                        tarih: "19.01.2023",
                        saat: "13:30",
                        degisiklik: "Kullanıcı hesabı kilitlendi"
                      },
                      {
                        tarih: "20.01.2023",
                        saat: "14:45",
                        degisiklik: "Kullanıcı hesabı etkinleştirildi"
                      },
                      {
                        tarih: "21.01.2023",
                        saat: "15:00",
                        degisiklik: "Kullanıcı rolü güncellendi"
                      },
                      {
                        tarih: "22.01.2023",
                        saat: "16:00",
                        degisiklik: "Yeni kullanıcı eklendi"
                      },
                      {
                        tarih: "23.01.2023",
                        saat: "17:00",
                        degisiklik: "Kullanıcı parolası değiştirildi"
                      },
                      {
                        tarih: "24.01.2023",
                        saat: "18:00",
                        degisiklik: "Kullanıcı silindi"
                      },
                      {
                        tarih: "25.01.2023",
                        saat: "19:00",
                        degisiklik: "Kullanıcı rolü güncellendi"
                      },
                      {
                        tarih: "26.01.2023",
                        saat: "20:00",
                        degisiklik: "Kullanıcı bilgileri güncellendi"
                      },
                      {
                        tarih: "27.01.2023",
                        saat: "21:00",
                        degisiklik: "Yeni kullanıcı eklendi"
                      },
                      {
                        tarih: "28.01.2023",
                        saat: "22:00",
                        degisiklik: "Kullanıcı parolası değiştirildi"
                      },
                      {
                        tarih: "29.01.2023",
                        saat: "23:00",
                        degisiklik: "Kullanıcı silindi"
                      },
                      {
                        tarih: "30.01.2023",
                        saat: "08:00",
                        degisiklik: "Kullanıcı rolü güncellendi"
                      }
                    
                    
                  
                  
                ]
              })
              this.getView().setModel(oModelLog, "log");

              var oModelLogon = new JSONModel({
                veriler: {
                  tanım : "Tanım",
                  uygulamaSunucusu : "Uygulama Sunucusu",
                  birimNumarasi: "Birim Numarası",
                  sistemTanımı: "Sistem Tanımı",
                  logonSunucusu: "Logon Sunucusu",
              }
              })
              this.getView().setModel(oModelLogon, "logon");
              
              
        },

        _onObjectMatched: function (oEvent) {
          var sCompanyName = oEvent.getParameter("arguments").companyName;
          var sTileName = oEvent.getParameter("arguments").tileName;
          
          var oCompanyModel = new sap.ui.model.json.JSONModel({
              title: sCompanyName,
              tileName: sTileName
          });
          this.getView().setModel(oCompanyModel, "company");

          console.log("%cYönlendirme başarılı, Şirket ismi : " + this.getView().getModel("company").getProperty("/title"), "color: green; font-weight: bold;");
          console.log("%cYönlendirme başarılı, Tile ismi : " + this.getView().getModel("company").getProperty("/tileName"), "color: green; font-weight: bold;");

         
      },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("home", {}, true);
            }
        },

        helloworld: function () {
            MessageToast.show("Başarılı şekilde kaydedildi.");
            console.log(this.getView().getModel("logon").getProperty("/veriler/tanım"));
            this.byId("saveLogonButton").setVisible(false);
            this.setEditableInputs();
        },

        testdeneme: function (oEvent){
          var text = oEvent.getParameter("value");
          var deneme = this.getView().getModel("logon").getProperty("/veriler/tanım");
          
          if (deneme != text) {
            this.byId("saveLogonButton").setVisible(true);
          }

          if(deneme == text){
            this.byId("saveLogonButton").setVisible(false);
          }
          console.log(text);
          console.log(deneme);
        },

        setEditableInputs: function () {
          counter++;
          
          if(counter %2 == 1){
          this.byId("tanim").setEditable(true);
          this.byId("uygulamaSunucusu").setEditable(true);
          this.byId("birimNumarasi").setEditable(true);
          this.byId("sistemTanimi").setEditable(true);
          this.byId("logonSunucusu").setEditable(true);
          }
          else if(counter %2 == 0){
            this.byId("tanim").setEditable(false);
            this.byId("uygulamaSunucusu").setEditable(false);
            this.byId("birimNumarasi").setEditable(false);
            this.byId("sistemTanimi").setEditable(false);
            this.byId("logonSunucusu").setEditable(false);
          }
        },
        onSearch: function (oEvent) {
          var sQuery = oEvent.getParameter("query");
          var oList = this.byId("loginDatas");
          var oBinding = oList.getBinding("items");
          var aFilters = [];

          if(sQuery){
              aFilters.push(new Filter("Baslik", FilterOperator.Contains, sQuery));

          }

          oBinding.filter(new Filter("Baslik", FilterOperator.Contains, sQuery));
      },
    });
});
