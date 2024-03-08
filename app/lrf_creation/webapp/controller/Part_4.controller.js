sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    'sap/m/Token',
    "sap/m/MessageToast",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Token, MessageToast, library, Spreadsheet, Sorter, Filter, FilterOperator) {
        "use strict";
        var oSelectedItem = "Draft - BL";
        var oSelectedItemF = "Final - BL";

        return Controller.extend("projectlnc.controller.Part_4", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("ImportLRF").attachPatternMatched(this._onObjectMatched, this);

                var oModel = new JSONModel();
                oModel.loadData({});
                this.getView().setModel(oModel, "docs");


                var oModel = new JSONModel();
                oModel.loadData("model/docs.json");
                this.getView().setModel(oModel, "docs_list");

                // this.getView().byId("pack_photo_type").setFilterFunction(function (sTerm, oItem) {
                //     return oItem.getText().match(new RegExp(sTerm, "i")) || oItem.getKey().match(new RegExp(sTerm, "i"));
                // });



            },
            onAfterRendering: function () {
                const aFilter = [];
                var id = this.getView().getModel("lrf").oData.ID;
                console.log(id)
                id = id.replace(/([0-z]{8})([0-z]{4})([0-z]{4})([0-z]{4})([0-z]{12})/, "$1-$2-$3-$4-$5");
                aFilter.push(new Filter('per_Adani_Logistics_LRF_Master_LRF_Master_ID', FilterOperator.EQ, id));
                const oList = this.byId("dcheck_3");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
                const oList2 = this.byId("fcheck_3");
                const oBinding2 = oList2.getBinding("items");
                oBinding2.filter(aFilter);

                aFilter.push(new Filter('fileName', FilterOperator.Contains, "check_1"));
                const oList3 = this.byId("check_1");
                const oBinding3 = oList3.getBinding("items");
                oBinding3.filter(new Filter(aFilter, true));

                aFilter.pop();
                aFilter.push(new Filter('fileName', FilterOperator.Contains, "check_2"));
                const oList4 = this.byId("check_2");
                const oBinding4 = oList4.getBinding("items");
                oBinding4.filter(new Filter(aFilter, true));

                aFilter.pop();
                aFilter.push(new Filter('fileName', FilterOperator.Contains, "check_3"));
                const oList5 = this.byId("check_3");
                const oBinding5 = oList5.getBinding("items");
                oBinding5.filter(new Filter(aFilter, true));


                // const oList4 = this.byId("check_2");
                // const oBinding4 = oList4.getBinding("items");
                // oBinding4.filter(aFilter);
                // const oList5 = this.byId("check_3");
                // const oBinding5 = oList5.getBinding("items");
                // oBinding5.filter(aFilter);
            },
            _onObjectMatched: function (oEvent) {
                
            },
            radio_check: function (e, id) {
                var text = e.getSource().getButtons()[e.getParameter("selectedIndex")].getText();
                this.getView().getModel("lrf").oData["check" + id] = text;
                if (text == "No") {
                    this.getView().byId("check_" + id).setVisible(false);
                    this.getView().byId("btn_check_" + id).setVisible(false);
                    this.getView().byId("txt_check_" + id).setVisible(false);
                }
                else {
                    this.getView().byId("check_" + id).setVisible(true);
                    this.getView().byId("btn_check_" + id).setVisible(true);
                    this.getView().byId("txt_check_" + id).setVisible(true);
                }
            },

            onSelectItem_draft: function (oEvent) {
                if (oEvent.getSource().getSelectedItem().getText() === "Others") {
                    this.getView().byId("other_draft").setVisible(true);
                    //oSelectedItem = "Draft - " + this.getView().byId("other_draft").getValue();
                }
                else {
                    this.getView().byId("other_draft").setVisible(false);
                }
                oSelectedItem = "Draft - " + oEvent.getSource().getSelectedItem().getText();

                this.getView().byId("dcheck_3").setVisible(true);
            },
            onSelectItem_final: function (oEvent) {
                if (oEvent.getSource().getSelectedItem().getText() === "Others") {
                    this.getView().byId("other_final").setVisible(true);
                    //oSelectedItem = "Final - " + this.getView().byId("other_final").getValue();
                }
                else {
                    this.getView().byId("other_final").setVisible(false);
                }
                oSelectedItemF = "Final - " + oEvent.getSource().getSelectedItem().getText();

                this.getView().byId("fcheck_3").setVisible(true);
            },
           
            onAfterItemAdded: function (oEvent, docid) {
                var item = oEvent.getParameter("item")
                var oFileName = oEvent.mParameters.item.getFileName();
                if (docid === "dcheck_3" || docid === "fcheck_3") {
                    if (docid=="dcheck_3" && oSelectedItem.includes("Others") && oSelectedItem.includes("Draft")) {
                        if (this.getView().byId("other_draft").getValue() == ""){
                            this.getView().byId("other_draft").setValueState("Error");
                        return;
                        }
                        else {
                            this.getView().byId("other_draft").setValueState("None");
                            var oChangeFileName = "Draft - " + this.getView().byId("other_draft").getValue() + " - " + oFileName;

                        }
                    }
                    else if (docid=="fcheck_3" && oSelectedItemF.includes("Others") && oSelectedItemF.includes("Final")) {
                        if (this.getView().byId("other_final").getValue() == ""){
                            this.getView().byId("other_final").setValueState("Error");
                        return;
                        }
                        else {
                            this.getView().byId("other_final").setValueState("None");
                            var oChangeFileName = "Final - " + this.getView().byId("other_final").getValue() + " - " + oFileName;

                        }
                    }
                    else {
                        if(docid === "dcheck_3")
                        var oChangeFileName = oSelectedItem + " - " + oFileName;
                    else
                    var oChangeFileName = oSelectedItemF + " - " + oFileName;

                    }
                }
                else {
                    var oChangeFileName = docid + " - " + oFileName;
                }
                oEvent.mParameters.item.setFileName(oChangeFileName);

                this._createEntity(item, docid)
                    .then((id) => {
                        this._uploadContent(item, id, docid);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            // onAfterItemAddedDraft: function (oEvent) {
            //     var item = oEvent.getParameter("item")
            //     this._createEntity(item)
            //         .then((id) => {
            //             this._uploadContent(item, id);
            //         })
            //         .catch((err) => {
            //             console.log(err);
            //         })
            // },
            onUploadCompleted: function (oEvent, docid) {
                var oUploadSet = this.byId(docid);
                oUploadSet.removeAllIncompleteItems();
                oUploadSet.getBinding("items").refresh();
                if (docid != 'dcheck_3' && docid != 'fcheck_3')
                    oUploadSet.setUploadEnabled(false);
            },
            // onUploadCompleted: function (oEvent) {
            //     var oUploadSet = this.byId("ref_pack_photo");
            //     oUploadSet.removeAllIncompleteItems();
            //     oUploadSet.getBinding("items").refresh();
            // },
            _createEntity: function (item, docid) {
                var doc_url;
                var lid = this.getView().getModel('lrf').oData.ID;
                if (docid == "dcheck_3") {
                    doc_url = "/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(" + lid + ")/To_Draft";
                }
                else if (docid == "fcheck_3") {
                    doc_url = "/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(" + lid + ")/To_Final";
                }
                else {
                    doc_url = "/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(" + lid + ")/To_CkeckList";
                }
                var data = data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName()
                };
                var settings = {
                    url: doc_url,
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }
                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            if (docid == "dcheck_3") {
                                resolve(results.Draft_ID);
                            }
                            else if (docid == "fcheck_3") {
                                resolve(results.Final_ID);
                            }
                            else {
                                resolve(results.Check_ID);
                            }
                        })
                        .fail((err) => {
                            reject(err);
                            console.log("rrr")
                        })
                })
            },

            _uploadContent: function (item, id, docid) {
                var lid = this.getView().getModel('lrf').oData.ID
                var url;
                if (docid == "dcheck_3") {
                    url = `/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(` + lid + `)/To_Draft(${id})/content`;
                }
                else if (docid == "fcheck_3") {
                    url = `/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(` + lid + `)/To_Final(${id})/content`;
                }
                else {
                    url = `/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(` + lid + `)/To_CkeckList(${id})/content`;
                }
                item.setUploadUrl(url);
                var oUploadSet = this.byId(docid);
                oUploadSet.setHttpRequestMethod("PUT")
                oUploadSet.uploadItem(item);
            },
            onOpenPressed: function (oEvent) {
                oEvent.preventDefault();
                var item = oEvent.getSource();
                this._fileName = item.getFileName();
                this._download(item)
                    .then((blob) => {
                        var url = window.URL.createObjectURL(blob);
                        // //open in the browser
                        // window.open(url);

                        //download
                        var link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', this._fileName);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },


            _download: function (item) {
                var settings = {
                    url: item.getUrl(),
                    method: "GET",
                    xhrFields: {
                        responseType: "blob"
                    }
                }
                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((result, textStatus, request) => {
                            resolve(result);
                        })
                        .fail((err) => {
                            reject(err);
                        })
                });
            },

            onRemovePressed: function (oEvent, docid) {
                oEvent.preventDefault();
                var item = oEvent.getSource();
                var id = item.getUrl().split('(')[1].split(')')[0];
                var oUploadSet = this.byId(docid);
                oUploadSet.setHttpRequestMethod("PUT")
                oUploadSet.removeItem(item);
                var url;
                var that = this;
                if (docid == "dcheck_3") {
                    url = `/odata/v4/logistics-/PAdani_Logistics_Draft/${id}`;
                }
                else if (docid == "fcheck_3") {
                    url = `/odata/v4/logistics-/PAdani_Logistics_Final/${id}`;
                }
                else {
                    url = `/odata/v4/logistics-/PAdani_Logistics_Check_List/${id}`;
                }
                console.log(url)
                var settings = {
                    url: url,
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },
                }
                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            if (docid == "dcheck_3") {
                                resolve(results.Draft_ID);
                            }
                            else if (docid == "fcheck_3") {
                                resolve(results.Final_ID);
                            }
                            else {
                                that.byId(docid).setUploadEnabled(true);
                                resolve(results.Check_ID);
                            }
                        })
                        .fail((err) => {
                            reject(err);
                        })
                })
            },
            cEmptyFinal: function(){
                if (this.getView().byId("other_final").getValue() == ""){
                    this.getView().byId("other_final").setValueState("Error");
            }
            else{
                this.getView().byId("other_final").setValueState("None");

            }
        },
            cEmpty: function(){
                if (this.getView().byId("other_draft").getValue() == ""){
                    this.getView().byId("other_draft").setValueState("Error");
            }
            else{
                this.getView().byId("other_draft").setValueState("None");

            }
        }

        });
    });