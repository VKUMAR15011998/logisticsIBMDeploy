sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("lrftracker.controller.LrfTracker", {
            onInit: function () {
                var url = this.getOwnerComponent().getModel().sServiceUrl;
                var that = this;
                jQuery.ajax({
                    url: url + "/LrfTracker2",
                    method: "GET", // Set the method explicitly to PATCH
                    headers: {
                        "Content-Type": "application/json",
                        "DataServiceVersion": "2.0",
                        "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                    },

                    success: function (res) {
                        var oTable = that.getView().byId("abc");
                        var oModel = new sap.ui.model.json.JSONModel(res.value);

                        oTable.setModel(oModel, "modelTrk");
                    },
                    error: function (oError) {
                        console.error("PATCH request failed: " + oError.responseText);
                        alert(oError.responseText);
                    }
                });

            },
            /* to Navigate with parameters */

            onPress: function (oEvent) {


                var oItem = oEvent.getSource();
                var sPath = oItem.getBindingContext('modelTrk').getObject("LRF_Master_ID");
                var sPath1 = oItem.getBindingContext('modelTrk').getObject('Lrf_No');
                var url = this.getOwnerComponent().getModel().sServiceUrl;
                var that = this;
                if (sPath1.includes('Temp')) {
                    url = url + "/Get_Adani_Logistics_LRF_Master/" + sPath;
                } else {
                    url = url + "/per_Adani_Logistics_LRF_Master/" + sPath;
                }
                jQuery.ajax({
                    url: url+"?$expand=To_PackingDoc,To_MaterialDesc,To_CkeckList,To_Draft,To_Final",
                    
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






                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("page2", {
                    LRF_Master_ID: sPath,
                    Lrf_No: sPath1
                });
            },
        });
    });
