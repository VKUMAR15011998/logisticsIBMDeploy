sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/Token","sap/m/MessageToast","sap/ui/export/library","sap/ui/export/Spreadsheet"],function(e,t,a,r,i,o,l){"use strict";var s=o.EdmType;var n="";var g="";var p;return e.extend("projectlnc.controller.Part_3",{onInit:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("ImportLRF").attachPatternMatched(this._onObjectMatched,this);var a=new t;a.loadData("model/package_type.json");a.setSizeLimit(300);this.getView().setModel(a,"pt_list")},_onObjectMatched:function(e){},onAfterRendering:function(){if(this.getView().getModel("lrf").oData["material"].length>5)this.getView().byId("uitable").setVisibleRowCount(5);else this.getView().byId("uitable").setVisibleRowCount(this.getView().getModel("lrf").oData["material"].length);this.updateTotal()},updateTotal:function(){var e=this.getView().getModel("lrf").oData["material"];var t=0,a=0,r=0;for(let i in e){r=r+parseInt(e[i]["QtyInNumbers"]);t=t+parseInt(e[i]["QtyInNumbers"])*e[i]["PerPackNetWeight"];a=a+parseInt(e[i]["QtyInNumbers"])*e[i]["PerPackGrossWeight"]}this.getView().getModel("lrf").oData["total_qty"]=r;this.getView().getModel("lrf").oData["total_net"]=t;this.getView().getModel("lrf").oData["total_gross"]=a;this.getView().getModel("lrf").refresh(true)},uploadExcel:function(e){g=e;n=e.getParameter("files")&&e.getParameter("files")[0];if(n===""){i.show("No file selected")}else{this._import(n)}},_import:function(e){var t=this;var a={};if(e&&window.FileReader){var r=new FileReader;r.onload=function(e){var r=e.target.result;var i=XLSX.read(r,{type:"binary"});i.SheetNames.forEach(function(e){a=XLSX.utils.sheet_to_row_object_array(i.Sheets[e])});t.getView().getModel("lrf").oData["material"]=a;t.getView().getModel("lrf").refresh(true);if(t.getView().getModel("lrf").oData["material"].length>5)t.getView().byId("uitable").setVisibleRowCount(5);else t.getView().byId("uitable").setVisibleRowCount(t.getView().getModel("lrf").oData["material"].length);t.updateTotal()};r.onerror=function(e){console.log(e)};r.readAsBinaryString(e)}},createColumnConfig:function(){var e=[];e.push({property:"PackageNo",type:s.Number});e.push({property:"HAZ_DG_Cargo",type:s.String});e.push({property:"Description",type:s.String});e.push({property:"Length",type:s.Number});e.push({property:"Width",type:s.Number});e.push({property:"Height",type:s.Number});e.push({property:"QtyInNumbers",type:s.Number});e.push({property:"PerPackNetWeight",type:s.Number});e.push({property:"PerPackGrossWeight",type:s.Number});e.push({property:"TypeOfPacking",type:s.String});e.push({property:"Stackable",type:s.String});e.push({property:"Remarks",type:s.String});return e},templateDWNLD:function(){var e,t,a,r,i;if(!this._oTable){this._oTable=this.byId("uitable")}i=this._oTable;t=i.getBinding("items");e=this.createColumnConfig();a={workbook:{columns:e,hierarchyLevel:"Level"},dataSource:[{}],fileName:"LRF_Material_Description_Template.xlsx",worker:false};r=new l(a);r.build().finally(function(){r.destroy()})},onCheckStack:function(e,t){var a=e.getSource().getParent().getIndex();var r=this.getView().getModel("lrf").oData["material"];if(e.getParameters().selected)r[a][t]="Y";else r[a][t]="N";this.getView().getModel("lrf").oData["material"]=r},BasicPackTypeValidation:function(e){if(e.getSource().getSelectedKey()===""){e.getSource().setValueState("Error")}else{e.getSource().setValueState("None")}},addRow:function(){var e=this.getView().getModel("lrf").oData["material"];var t={PackageNo:this.getView().getModel("lrf").oData["material"].length+1,HAZ_DG_Cargo:"N",Description:"",Length:"",Width:"",Height:"",QtyInNumbers:"",PerPackNetWeight:"",PerPackGrossWeight:"",TypeOfPacking:"",Stackable:"N",Remarks:""};e.push(t);this.getView().getModel("lrf").oData["material"]=e;if(this.getView().getModel("lrf").oData["material"].length>5)this.getView().byId("uitable").setVisibleRowCount(5);else this.getView().byId("uitable").setVisibleRowCount(this.getView().getModel("lrf").oData["material"].length);this.getView().byId("uitable").setFirstVisibleRow(this.getView().getModel("lrf").oData["material"].length);this.updateTotal()}})});