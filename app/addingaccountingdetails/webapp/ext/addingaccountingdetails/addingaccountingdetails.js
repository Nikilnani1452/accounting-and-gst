sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        addingaccountingdetails: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
