sap.ui.define([
    
], function() {
    return {
        callGetOdata:function(oModel,url){
            return Promise(function(resolve,reject){
                jQuery.ajax({
                    url: url+"?$expand=To_PackingDoc,To_MaterialDesc,To_CkeckList,To_Draft,To_Final,To_DeliveryDetails,To_FF_Shipment,To_FF_Documents",
                    
                    method: "GET", // Set the method explicitly to PATCH
                    headers: {
                        "Content-Type": "application/json",
                        "DataServiceVersion": "2.0",
                        "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                    },

                    success: function (res) {

                        var oModel = new sap.ui.model.json.JSONModel(res);
                        //this.getView().setModel(oModel, "objectModel");
                        this.getOwnerComponent().setModel(oModel, "objectModel");

                    }.bind(this),
                    error: function (oError) {
                        console.error("PATCH request failed: " + oError.responseText);
                        alert(oError.responseText);
                    }.bind(this)
                });
            })
        }
    }
    
});