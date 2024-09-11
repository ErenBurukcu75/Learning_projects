sap.ui.define([
	"sap/m/library",
	"sap/ui/core/mvc/Controller"
], (mobileLibrary, Controller) => {
	"use strict";

	return Controller.extend("ui5.databinding.controller.App", {
		formatMail(sFirstName, sLastName , sMail, sHead , sBody) {
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
            const tag = "from " + sFirstName + " "+ sLastName;
        

			return mobileLibrary.URLHelper.normalizeEmail(
				`${sMail}`,
                
				oBundle.getText(sHead),
                //text yerine kendi yazdığımı geçirsin
				oBundle.getText(sBody + "\n\n" + tag + "\n\n Saygılarımla"));
		}
	});
});