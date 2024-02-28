sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    'sap/m/Token',
    "sap/m/MessageToast",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Token, MessageToast, library, Spreadsheet) {
        "use strict";

        return Controller.extend("projectlnc.controller.Part_1", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("ImportLRF").attachPatternMatched(this._onObjectMatched, this);

                var oModel = new JSONModel({
                    dDefaultDate: new Date()
                });
                this.getView().setModel(oModel, "req_date");

                // var oModel = new JSONModel({});
                // this.getView().setModel(oModel, "lrf_part_1");

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

                var oModel = new JSONModel({
                    "email_nos": []
                });
                this.getView().setModel(oModel, "email_list");

                var oModel = new JSONModel();
                oModel.loadData("model/mob_country_code.json");
                oModel.setSizeLimit(300)
                this.getView().setModel(oModel, "mo_list");

            },
            _onObjectMatched: function (oEvent) {
                // var oModel = new JSONModel({ "refno": oEvent.getParameter("arguments").refno });
                // this.getView().setModel(oModel, "ref_lrf");
                // var data;
                // if(oEvent.getParameter("arguments").lrftype !== "None"){
                //     this.getView().byId("multiInput1").destroyTokens();

                //     for(let i = 0; i < ["hbds@ads.sd","asiudhsad@assd.fs"].length; i++){
                //              var defToken = new sap.m.Token({
                //                  text: ["hbds@ads.sd","asiudhsad@assd.fs"][i]
                //              });
                //              this.getView().byId("multiInput1").addToken(defToken);
                //         }
                //         this.getView().byId("country_code").setSelectedKey("+355");
                //         this.getView().byId("add_country_code").setSelectedKey("+92");
                //     data={
                //         requision_date: new Date("2024-01-01"),
                //         po_no: "123",
                //         ref_lrf: oEvent.getParameter("arguments").refno,
                //         lrf_no: "Temp-LRF-sadsad",
                //         init_name: "gfdgdgdg",
                //         vendor_name: "ertertret",
                //         project: "456",
                //         init_mobile: "64564355435",
                //         add_mobile: "345435435435",
                //         init_email: "hvads@asd.ds",
                //         submit:false
                //        }
                // }
                // else if(oEvent.getParameter("arguments").refno === "None"){
                //     data = {
                //         requision_date: new Date(),
                //         po_no: "",
                //         ref_lrf: "None",
                //         lrf_no: "",
                //         init_name: sap.ushell.Container.getService("UserInfo").getFullName(),
                //         vendor_name: sap.ushell.Container.getService("UserInfo").getFullName(),
                //         project: "",
                //         country_code: "",
                //         init_mobile: "",
                //         add_country_code: "",
                //         add_mobile: "",
                //         init_email: sap.ushell.Container.getService("UserInfo").getEmail(),
                //         extra_email: "",
                //         submit:false
                //        }
                // }
                // else{
                //     this.getView().byId("multiInput1").destroyTokens();

                //     for(let i = 0; i < ["hbds@ads.sd","asiudhsad@assd.fs"].length; i++){
                //              var defToken = new sap.m.Token({
                //                  text: ["hbds@ads.sd","asiudhsad@assd.fs"][i]
                //              });
                //              this.getView().byId("multiInput1").addToken(defToken);
                //         }
                //         this.getView().byId("country_code").setSelectedKey("+355");
                //         this.getView().byId("add_country_code").setSelectedKey("+92");

                //     data={
                //         requision_date: new Date("2024-01-01"),
                //         po_no: "123",
                //         ref_lrf: oEvent.getParameter("arguments").refno,
                //         lrf_no: "",
                //         init_name: "gfdgdgdg",
                //         vendor_name: "ertertret",
                //         project: "456",
                //         init_mobile: "64564355435",
                //         add_mobile: "345435435435",
                //         init_email: "hvads@asd.ds",
                //         submit:false
                //        }
                // }
                // var oModel = new JSONModel(data);
                // this.getView().setModel(oModel, "lrf_part_1");
            },
            onsubmitEmails: function (e) {
                var oValue = e.getParameter("value");
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(oValue)) {
                    e.getSource().addToken(new Token({ key: oValue, text: oValue }))
                    e.getSource().setValue();
                    e.getSource().focus();
                    this.getView().byId("multiInput1").setValueState("None");
                    this.getView().getModel("lrf").oData["emails"].push(oValue);
                } else {
                    this.getView().byId("multiInput1").setValueState("Error");
                    this.getView().byId("multiInput1").setValueStateText("Invalid Email");

                }

            },
           
            BasicCCValidation: function () {

                if (this.byId("country_code").getSelectedKey() === "") {
                    this.byId("country_code").setValueState("Error");
                }
                else{
                    this.byId("country_code").setValueState("None");
                }
            },
            BasicMOValidation: function () {

                if (this.byId("mobile_no").getValue().length < 7) {
                    this.byId("mobile_no").setValueState("Error");
                }
                else{
                    this.byId("mobile_no").setValueState("None");
                }
            },
            BasicADCCValidation: function () {

                if (this.byId("add_country_code").getSelectedKey() === "" && this.byId("add_mobile_no").getSelectedKey() !== "" ) {
                    this.byId("add_country_code").setValueState("Error");
                }
                else{
                    this.byId("add_country_code").setValueState("None");
                    this.byId("add_mobile_no").setValueState("None");

                }
            },
            BasicADMOValidation: function () {
                if (this.byId("add_country_code").getSelectedKey() !== "" &&(this.byId("add_mobile_no").getValue() ==="" || this.byId("add_mobile_no").getValue().length <7 )) {
                    this.byId("add_mobile_no").setValueState("Error");
                }
                else{
                    this.byId("add_country_code").setValueState("None");
                    this.byId("add_mobile_no").setValueState("None");        
                }

            },

            onValueHelpRequestPO: function (oEvent,id) {
                if (!this._DialogEmployeePO) {
                    this._DialogEmployeePO = sap.ui.xmlfragment("projectlnc.view.POvalueHelp", this);
                    this.getView().addDependent(this._DialogEmployeePO);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeePO);
                this._DialogEmployeePO.open();
            },
            _handleValueHelpSearchPO: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue                ;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmPO: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                   // console.log(oSelectedItem)
                    var productInput = this.getView().byId("po_no");
                    productInput.setValue(oSelectedItem.getTitle());
                    productInput.setValueState("None");
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            onValueHelpRequestPRO: function (oEvent,id) {
                if (!this._DialogEmployee) {
                    this._DialogEmployee = sap.ui.xmlfragment("projectlnc.view.PROvalueHelp", this);
                    this.getView().addDependent(this._DialogEmployee);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployee);
                this._DialogEmployee.open();
            },
            _handleValueHelpSearchPRO: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue                ;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmPRO: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                  //  console.log(oSelectedItem)
                    var productInput = this.getView().byId("project");
                    productInput.setValue(oSelectedItem.getTitle());
                    productInput.setValueState("None");
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            // _handleValueHelpClose:function(oEvent){
            //     debugger
            // }

      
        });
    });
