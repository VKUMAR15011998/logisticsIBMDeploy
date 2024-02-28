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
        var EdmType = library.EdmType;
        var uploadFile = "";
        var uploadEvent = "";
        var oSelectedItem;

        return Controller.extend("projectlnc.controller.Part_3", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("ImportLRF").attachPatternMatched(this._onObjectMatched, this);


                var oModel = new JSONModel();
                oModel.loadData("model/package_type.json");
                oModel.setSizeLimit(300)
                this.getView().setModel(oModel, "pt_list");
                // this.getView().setModel(oModel, "materials");
                // this.getView().byId("uitable").setVisibleRowCount(this.getOwnerComponent().getModel("materials").oData['items'].length);
                // this.updateTotal();

            },
            _onObjectMatched: function (oEvent) {
                // if (oEvent.getParameter("arguments").refno !== "None") {
                //     debugger
                //     var data = this.getOwnerComponent().getModel("lrf").oData["material"];
                //     var oModel = new JSONModel({ "items": data });
                //     this.getOwnerComponent().setModel(oModel, "materials");

                //     this.getView().getModel("materials").refresh(true);
                //     this.getOwnerComponent().getModel("materials").refresh(true);

                    // if (this.getView().getModel("lrf").oData['material'].length > 5)
                    //     this.getView().byId("uitable").setVisibleRowCount(5);
                    // else
                    //     this.getView().byId("uitable").setVisibleRowCount(this.getView().getModel("lrf").oData['material'].length);
                    // this.updateTotal();
                // }
            },
            onAfterRendering: function () {
                if (this.getView().getModel("lrf").oData['material'].length > 5)
                    this.getView().byId("uitable").setVisibleRowCount(5);
                else
                    this.getView().byId("uitable").setVisibleRowCount(this.getView().getModel("lrf").oData['material'].length);
                this.updateTotal();
            },
            updateTotal: function () {
                var data = this.getView().getModel("lrf").oData['material'];
                var net = 0, gross = 0, qty = 0;
                for (let i in data) {
                    qty = qty + parseInt(data[i]["QtyInNumbers"]);
                    net = net + (parseInt(data[i]["QtyInNumbers"]) * data[i]["PerPackNetWeight"]);
                    gross = gross + (parseInt(data[i]["QtyInNumbers"]) * data[i]["PerPackGrossWeight"]);
                }
                this.getView().getModel("lrf").oData["total_qty"] = qty;
                this.getView().getModel("lrf").oData["total_net"] = net;
                this.getView().getModel("lrf").oData["total_gross"] = gross;
                this.getView().getModel("lrf").refresh(true);

            },

            uploadExcel: function (oEvent) {
                uploadEvent = oEvent;
                uploadFile = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
                if (uploadFile === "") {
                    MessageToast.show("No file selected")
                }
                else {
                    this._import(uploadFile);
                }
            },
            _import: function (file) {
                var that = this;
                var excelData = {};
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (uploadEvent) {
                        var data = uploadEvent.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        workbook.SheetNames.forEach(function (sheetName) {
                            // Here is your object for every sheet in workbook
                            excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                        });
                        // Setting the data to the local model 
                        //console.log(excelData)
                        //that.getView().byId("uitable").setHeaderText("Asset Data (" + excelData.length + ")")
                        //var data = that.getView().getModel("materials");

                        //var oModel = new JSONModel({ "material": excelData });
                        //that.getView().setModel(oModel, "lrf");
                        that.getView().getModel("lrf").oData["material"] = excelData;

                        // that.getView().getModel("lrf").setData({
                        //     "material": excelData
                        // });
                        that.getView().getModel("lrf").refresh(true);
                       // that.getOwnerComponent().getModel("lrf").refresh(true);

                        if (that.getView().getModel("lrf").oData['material'].length > 5)
                            that.getView().byId("uitable").setVisibleRowCount(5);
                        else
                            that.getView().byId("uitable").setVisibleRowCount(that.getView().getModel("lrf").oData['material'].length);
                        that.updateTotal();

                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }
            },
            createColumnConfig: function () {
                var aCols = [];

                aCols.push({
                    property: "PackageNo",
                    type: EdmType.Number
                });

                aCols.push({
                    property: "HAZ_DG_Cargo",
                    type: EdmType.String,
                });

                aCols.push({
                    property: "Description",
                    type: EdmType.String
                });
                aCols.push({
                    property: "Length",
                    type: EdmType.Number
                });

                aCols.push({
                    property: "Width",
                    type: EdmType.Number
                });

                aCols.push({
                    property: "Height",
                    type: EdmType.Number
                });

                aCols.push({
                    property: "QtyInNumbers",
                    type: EdmType.Number
                });
                aCols.push({
                    property: "PerPackNetWeight",
                    type: EdmType.Number
                });
                aCols.push({
                    property: "PerPackGrossWeight",
                    type: EdmType.Number
                });
                aCols.push({
                    property: "TypeOfPacking",
                    type: EdmType.String
                });
                aCols.push({
                    property: "Stackable",
                    type: EdmType.String
                });
                aCols.push({
                    property: "Remarks",
                    type: EdmType.String
                });
                return aCols;
            },
            templateDWNLD: function () {
                var aCols, oRowBinding, oSettings, oSheet, oTable;

                if (!this._oTable) {
                    this._oTable = this.byId('uitable');
                }

                oTable = this._oTable;
                oRowBinding = oTable.getBinding('items');
                aCols = this.createColumnConfig();
                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: [{}],
                    fileName: 'LRF_Material_Description_Template.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };

                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            },
            onCheckStack: function (e, id) {
                var index = e.getSource().getParent().getIndex();
                var data = this.getView().getModel("lrf").oData['material'];
                if (e.getParameters().selected)
                    data[index][id] = "Y"
                else
                    data[index][id] = "N"
                this.getView().getModel("lrf").oData["material"] = data;
                //var oModel = new JSONModel({ "material": data });
                //this.getView().setModel(oModel, "lrf");
                // this.getView().getModel("lrf").setData({
                //     "material": data
                // });
            },
            BasicPackTypeValidation: function (oEvent) {
                if (oEvent.getSource().getSelectedKey() === '') {
                    oEvent.getSource().setValueState("Error");
                }
                else {
                    oEvent.getSource().setValueState("None");
                }
            },
            addRow: function () {

                var data = this.getView().getModel("lrf").oData['material'];
                var row = {
                    "PackageNo": this.getView().getModel("lrf").oData['material'].length + 1,
                    "HAZ_DG_Cargo": "N",
                    "Description": "",
                    "Length": "",
                    "Width": "",
                    "Height": "",
                    "QtyInNumbers": "",
                    "PerPackNetWeight": "",
                    "PerPackGrossWeight": "",
                    "TypeOfPacking": "",
                    "Stackable": "N",
                    "Remarks": ""
                }
                data.push(row);
                // var oModel = new JSONModel({ "material": data });
                // this.getView().setModel(oModel, "lrf");
                this.getView().getModel("lrf").oData["material"] = data;

                if (this.getView().getModel("lrf").oData['material'].length > 5)
                    this.getView().byId("uitable").setVisibleRowCount(5);
                else
                    this.getView().byId("uitable").setVisibleRowCount(this.getView().getModel("lrf").oData['material'].length);
                this.getView().byId("uitable").setFirstVisibleRow(this.getView().getModel("lrf").oData['material'].length);
                this.updateTotal()
            }

        });
    });