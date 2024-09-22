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
        }
    };
});
