sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("lrftracker.controller.BLrfTracker", {
            onInit: function () {

                var oModel = new sap.ui.model.json.JSONModel();
                oModel.loadData("model/UserData.json");
                this.getView().setModel(oModel, "EmailModel");
            },
           
            onPress: function (oEvent) {
                var oItem = oEvent.getSource();
                var sPath = oItem.getBindingContext().getObject("LRF_Master_ID");
                var sPath1 = oItem.getBindingContext().getObject('Lrf_No');

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("page2", {
                    LRF_Master_ID: sPath,
                    Lrf_No: sPath1
                });
            },
    
  /*    onBeforeRebindTable: function(oSource){
                var binding = oSource.getParameter("bindingParams");
                var oFilter = new sap.ui.model.Filter("Lrf_No", sap.ui.model.FilterOperator.NotContains, "Temp-");
                binding.filters.push(oFilter);
            } , */
            onSelectAssignMPL: function (oEvent) {

                if (!this._DialogEmployeesave4) {
                    this._DialogEmployeesave4 = sap.ui.xmlfragment("lrftracker.view.MPL_Email", this);
                    this.getView().addDependent(this._DialogEmployeesave4);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave4);
                this._DialogEmployeesave4.open();
            },
            onSelectAssignFF: function (oEvent) {
                if (!this._DialogEmployeesave5) {
                    this._DialogEmployeesave5 = sap.ui.xmlfragment("lrftracker.view.FF_Email", this);
                    this.getView().addDependent(this._DialogEmployeesave5);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave5);
                this._DialogEmployeesave5.open();
            },
            onSelectAssignCHA: function (oEvent) {
                if (!this._DialogEmployeesave6) {
                    this._DialogEmployeesave6 = sap.ui.xmlfragment("lrftracker.view.CHA_Email", this);
                    this.getView().addDependent(this._DialogEmployeesave6);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave6);
                this._DialogEmployeesave6.open();
            },

            _handleValueHelpSearchMPL: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Email", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpSearchFF: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Email", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpSearchCHA: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Email", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmMPL: function (oEvent) {
                var oSelectedEmail = oEvent.getParameter("selectedItem").getTitle();
                var LRF_Master_ID = this.getView().byId("mtable").getSelectedItem().getBindingContext().getObject().LRF_Master_ID;
                var sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var dataMail = {
                    "LogisticsMPL_AssignEmail_Id": oSelectedEmail,
                    "LogisticsMPL_Allocation_Date": new Date().toLocaleDateString('en-CA')
                }
                var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                var sRequestUrl = sServiceUrl + sEntitySet + "(guid'" + LRF_Master_ID+"')";
                var that = this;
                // Perform the PATCH request
                jQuery.ajax({
                    url: sRequestUrl,
                    method: "PATCH", // Set the method explicitly to PATCH
                    headers: {
                        "Content-Type": "application/json",
                        "DataServiceVersion": "2.0",
                        "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                    },
                    data: JSON.stringify(dataMail),
                    success: function () {
                        console.log("PATCH request successful");
                        that.getView().byId('idTokensTable').rebindTable();
                    },
                    error: function (oError) {
                        console.error("PATCH request failed: " + oError.responseText);
                        alert(oError.responseText);
                    }
                });

            },
            _handleValueHelpConfirmFF: function (oEvent) {
                var oSelectedEmail = oEvent.getParameter("selectedItem").getTitle();
                var LRF_Master_ID = this.getView().byId("mtable").getSelectedItem().getBindingContext().getObject().LRF_Master_ID;
                var sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var dataMail = {
                    "FF_AssignEmail_Id": oSelectedEmail,
                    "FF_Allocation_Date": new Date().toLocaleDateString('en-CA')

                }
                var sEntitySet = "/per_Adani_Logistics_LRF_Master";

                var sRequestUrl = sServiceUrl + sEntitySet + "(guid'" + LRF_Master_ID+"')";
                var that=this;
                // Perform the PATCH request
                jQuery.ajax({
                    url: sRequestUrl,
                    method: "PATCH", // Set the method explicitly to PATCH
                    headers: {
                        "Content-Type": "application/json",
                        "DataServiceVersion": "2.0",
                        "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                    },
                    data: JSON.stringify(dataMail),
                    success: function () {
                        console.log("PATCH request successful");
                        that.getView().byId('idTokensTable').rebindTable();
                    },
                    error: function (oError) {
                        console.error("PATCH request failed: " + oError.responseText);
                        alert(oError.responseText);
                    }
                });

            },
            _handleValueHelpConfirmCHA: function (oEvent) {
                var oSelectedEmail = oEvent.getParameter("selectedItem").getTitle();
                var LRF_Master_ID = this.getView().byId("mtable").getSelectedItem().getBindingContext().getObject().LRF_Master_ID;
                var sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var dataMail = {
                    "CHA_AssignEmail_Id": oSelectedEmail,
                    "CHA_Allocation_Date": new Date().toLocaleDateString('en-CA')
                }
                var sEntitySet = "/per_Adani_Logistics_LRF_Master";

                var sRequestUrl = sServiceUrl + sEntitySet + "(guid'" + LRF_Master_ID+"')";
                var that=this;
                // Perform the PATCH request
                jQuery.ajax({
                    url: sRequestUrl,
                    method: "PATCH", // Set the method explicitly to PATCH
                    headers: {
                        "Content-Type": "application/json",
                        "DataServiceVersion": "2.0",
                        "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                    },
                    data: JSON.stringify(dataMail),
                    success: function () {
                        console.log("PATCH request successful");
                        that.getView().byId('idTokensTable').rebindTable();
                    },
                    error: function (oError) {
                        console.error("PATCH request failed: " + oError.responseText);
                        alert(oError.responseText);
                    }
                });

            },
            _handleValueHelpClose: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter();
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            onSelectRadio: function (oEvent) {
                var status = this.getView().byId("mtable").getSelectedItem().getBindingContext().getObject();
                this.getView().byId("iBtnMPL").setEnabled(true);
                if (status.LogisticsMPL_Status === "Accept")
                    this.getView().byId("iBtnFF").setEnabled(true);
                else
                this.getView().byId("iBtnFF").setEnabled(false);

                if (status.FF_Status === "Accept")
                    this.getView().byId("iBtnCHA").setEnabled(true);
                else
                this.getView().byId("iBtnCHA").setEnabled(false);
            }
        });
    });
