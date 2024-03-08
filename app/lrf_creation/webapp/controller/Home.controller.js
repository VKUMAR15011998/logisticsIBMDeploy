sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("projectlnc.controller.Home", {
            onInit: function () {
                var oModel = new JSONModel({
                    "po_nos": [{
                        "Key": "123",
                        "Name": "123"
                    },
                    {
                        "Key": "456",
                        "Name": "456"
                    }, {
                        "Key": "789",
                        "Name": "789"
                    }]
                });

                this.getView().setModel(oModel, "po_list");
            },
            onGenerateLRF:function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var ref_obj = this.getView().byId("ref_lrf").getValue();
                var lrf_obj = this.getView().byId("saved_lrf").getValue();
                var ref=""
                var lrf=""
                if(!ref_obj || !this.getView().byId("ref_lrf").getVisible()) ref = "None";
                else ref = ref_obj;
                if(!lrf_obj || !this.getView().byId("saved_lrf").getVisible()) lrf = "None";
                else lrf = lrf_obj;
                oRouter.navTo("ImportLRF",{
                    refno: ref,
                    lrftype: lrf
                    });
                    location.reload();
            },
            onSelectLRF: function(e){
                if (e.getSource().getButtons()[e.getParameter("selectedIndex")].getText() == "New LRF" && this.getView().byId("Refradio").getButtons()[0].getSelected()) {
                    this.getView().byId("RefLabel").setVisible(true);
                    this.getView().byId("Refradio").setVisible(true);
                    this.getView().byId("saved_lrf").setVisible(false);
                    this.getView().byId("ref_lrf").setVisible(false);
                }
                else if (e.getSource().getButtons()[e.getParameter("selectedIndex")].getText() == "New LRF" && this.getView().byId("Refradio").getButtons()[1].getSelected()) {
                    this.getView().byId("RefLabel").setVisible(true);
                    this.getView().byId("Refradio").setVisible(true);
                    this.getView().byId("saved_lrf").setVisible(false);
                    this.getView().byId("ref_lrf").setVisible(true);
                }
                else {
                    this.getView().byId("RefLabel").setVisible(false);
                    this.getView().byId("Refradio").setVisible(false);
                    this.getView().byId("saved_lrf").setVisible(true);
                    this.getView().byId("ref_lrf").setVisible(false);
                }
            },
            onSelectRef: function(e){
                if (e.getSource().getButtons()[e.getParameter("selectedIndex")].getText() == "Reference LRF" && this.getView().byId("lrf_Type").getButtons()[0].getSelected()) {
                    this.getView().byId("ref_lrf").setVisible(true);
                }
                else {
                    this.getView().byId("ref_lrf").setVisible(false);
                }
            },
            onValueHelpRequest: function (oEvent) {
                if (!this._DialogEmployee) {
                    this._DialogEmployee = sap.ui.xmlfragment("projectlnc.view.RefvalueHelp", this);
                    this.getView().addDependent(this._DialogEmployee);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployee);
                this._DialogEmployee.open();
            },
            _handleValueHelpSearchRef: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue                ;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Lrf_No", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmRef: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    console.log(oSelectedItem)
                    var productInput = this.getView().byId("ref_lrf");
                    productInput.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            onValueHelpRequestSave: function (oEvent) {
                if (!this._DialogEmployeesave) {
                    this._DialogEmployeesave = sap.ui.xmlfragment("projectlnc.view.SavevalueHelp", this);
                    this.getView().addDependent(this._DialogEmployeesave);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave);
                this._DialogEmployeesave.open();
            },
            _handleValueHelpSearchSave: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue                ;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Lrf_No", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmSave: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    console.log(oSelectedItem)
                    var productInput = this.getView().byId("saved_lrf");
                    productInput.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            _handleValueHelpClose: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter();
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
        })
    })