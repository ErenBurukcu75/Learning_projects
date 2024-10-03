sap.ui.define([], function () {
    "use strict";
    return {
        formatDate: function (sDate) {
            if (!sDate) {
                return "";
            }
            var oDate = new Date(sDate);
            var sDay = String(oDate.getDate()).padStart(2, '0');
            var sMonth = String(oDate.getMonth() + 1).padStart(2, '0'); 
            var sYear = oDate.getFullYear();
            return sDay + "." + sMonth + "." + sYear;
        },

        formatMangr: function (sMangr, aEmployees) {

            if (!sMangr || !Array.isArray(aEmployees)) {
                return "Yöneticisi Yok";
            }
        
            for (var i = 0; i < aEmployees.length; i++) {
                if (aEmployees[i].pernr === sMangr) {
                    return aEmployees[i].ename;
                }
            }
        
            return "Hatali";
        },

        formatOnemlilik: function(value) {
            switch (value) {
                case "0":
                    
                    return "Düşük";
                case "1":
                    return "Orta";
                case "2":
                    return "Kritik";
                case "3":
                    return "Çok Kritik";
                default:
                    return "Bilinmiyor";
            }
        },

        formatDurum: function(value) {
            switch (value) {
                case "0":
                    return "Başlanmadı";
                case "1":
                    return "Beklemede"; 
                case "2":
                    return "Devam Ediyor";
                case "3":
                    return "Tamamlandı";
                default :
                    return "Bilinmiyor";             
            }

        }
    };
});
