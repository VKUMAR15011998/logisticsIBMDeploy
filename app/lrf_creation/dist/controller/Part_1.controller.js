sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/Token","sap/m/MessageToast","sap/ui/export/library","sap/ui/export/Spreadsheet"],function(e,t,i,a,o,l,s){"use strict";return e.extend("projectlnc.controller.Part_1",{onInit:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("ImportLRF").attachPatternMatched(this._onObjectMatched,this);var i=new t({dDefaultDate:new Date});this.getView().setModel(i,"req_date");var i=new t({po_nos:[{Key:"123",Name:"123"},{Key:"456",Name:"456"},{Key:"789",Name:"789"}]});this.getView().setModel(i,"po_list");var i=new t({email_nos:[]});this.getView().setModel(i,"email_list");var i=new t;i.loadData("model/mob_country_code.json");i.setSizeLimit(300);this.getView().setModel(i,"mo_list")},_onObjectMatched:function(e){},onsubmitEmails:function(e){var t=e.getParameter("value");if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(t)){e.getSource().addToken(new a({key:t,text:t}));e.getSource().setValue();e.getSource().focus();this.getView().byId("multiInput1").setValueState("None");this.getView().getModel("lrf").oData["emails"].push(t)}else{this.getView().byId("multiInput1").setValueState("Error");this.getView().byId("multiInput1").setValueStateText("Invalid Email")}},BasicCCValidation:function(){if(this.byId("country_code").getSelectedKey()===""){this.byId("country_code").setValueState("Error")}else{this.byId("country_code").setValueState("None")}},BasicMOValidation:function(){if(this.byId("mobile_no").getValue().length<7){this.byId("mobile_no").setValueState("Error")}else{this.byId("mobile_no").setValueState("None")}},BasicADCCValidation:function(){if(this.byId("add_country_code").getSelectedKey()===""&&this.byId("add_mobile_no").getSelectedKey()!==""){this.byId("add_country_code").setValueState("Error")}else{this.byId("add_country_code").setValueState("None");this.byId("add_mobile_no").setValueState("None")}},BasicADMOValidation:function(){if(this.byId("add_country_code").getSelectedKey()!==""&&(this.byId("add_mobile_no").getValue()===""||this.byId("add_mobile_no").getValue().length<7)){this.byId("add_mobile_no").setValueState("Error")}else{this.byId("add_country_code").setValueState("None");this.byId("add_mobile_no").setValueState("None")}},onValueHelpRequestPO:function(e,t){if(!this._DialogEmployeePO){this._DialogEmployeePO=sap.ui.xmlfragment("projectlnc.view.POvalueHelp",this);this.getView().addDependent(this._DialogEmployeePO)}jQuery.sap.syncStyleClass("sapUiSizeCompact",this.getView(),this._DialogEmployeePO);this._DialogEmployeePO.open()},_handleValueHelpSearchPO:function(e){var t=[];var i=e.getSource()._sSearchFieldValue;if(i&&i.length>0){var a=new sap.ui.model.Filter("Name",sap.ui.model.FilterOperator.Contains,i);t.push(a)}var o=e.getSource().getBinding("items");o.filter(t)},_handleValueHelpConfirmPO:function(e){var t=e.getParameter("selectedItem");if(t){var i=this.getView().byId("po_no");i.setValue(t.getTitle());i.setValueState("None")}e.getSource().getBinding("items").filter([])},onValueHelpRequestPRO:function(e,t){if(!this._DialogEmployee){this._DialogEmployee=sap.ui.xmlfragment("projectlnc.view.PROvalueHelp",this);this.getView().addDependent(this._DialogEmployee)}jQuery.sap.syncStyleClass("sapUiSizeCompact",this.getView(),this._DialogEmployee);this._DialogEmployee.open()},_handleValueHelpSearchPRO:function(e){var t=[];var i=e.getSource()._sSearchFieldValue;if(i&&i.length>0){var a=new sap.ui.model.Filter("Name",sap.ui.model.FilterOperator.Contains,i);t.push(a)}var o=e.getSource().getBinding("items");o.filter(t)},_handleValueHelpConfirmPRO:function(e){var t=e.getParameter("selectedItem");if(t){var i=this.getView().byId("project");i.setValue(t.getTitle());i.setValueState("None")}e.getSource().getBinding("items").filter([])}})});