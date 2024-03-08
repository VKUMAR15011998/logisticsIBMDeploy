sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageBox",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (Controller, JSONModel, MessageBox, Sorter, Filter, FilterOperator) {
    "use strict";
    var oSelectedItem = "Freight Certificate";

    return Controller.extend("lrftracker.controller.FFDetails", {
        onInit: function () {

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("FFDetails").attachPatternMatched(this._onRouteMatched, this);

            this.getOwnerComponent().getModel("objectModel");
            var oModel = new JSONModel({
                "ff_docs_nos": [{
                    "Key": "Freight Certificate",
                    "Name": "Freight Certificate"
                },
                {
                    "Key": "Vessel Certificate",
                    "Name": "Vessel Certificate"
                }, {
                    "Key": "Marine Certificate",
                    "Name": "Marine Certificate"
                },
                {
                    "Key": "Others",
                    "Name": "Others"
                }]
            });

            this.getView().setModel(oModel, "ff_docs_list");
            var oModel = new JSONModel();
            oModel.loadData("model/vhicle.json");
            this.getView().setModel(oModel, "vh_list");
        },
        _onRouteMatched: async function (oEvent) {
            var cc = oEvent.getParameter("arguments").LRF_Master_ID;
            var cc1 = oEvent.getParameter("arguments").Lrf_No;
            var url = this.getOwnerComponent().getModel().sServiceUrl;
            url = url + "/per_Adani_Logistics_LRF_Master(guid'" + cc + "')";
            await jQuery.ajax({
                url: url + "?$expand=To_PackingDoc,To_MaterialDesc,To_CkeckList,To_Draft,To_Final,To_DeliveryDetails,To_FF_Shipment,To_FF_Documents",

                method: "GET", // Set the method explicitly to PATCH
                headers: {
                    "Content-Type": "application/json",
                    "DataServiceVersion": "2.0",
                    "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                },

                success: function (res) {
                    var oModel = new sap.ui.model.json.JSONModel(res.d);
                    this.getOwnerComponent().setModel(oModel, "objectModel");
                    sap.ui.getCore().setModel(oModel, "objectModel");

                }.bind(this),
                error: function (oError) {
                    console.error("PATCH request failed: " + oError.responseText);
                    alert(oError.responseText);
                }.bind(this)
            });

            const aFilter = [];
            var id = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
            id = id.replace(/([0-z]{8})([0-z]{4})([0-z]{4})([0-z]{4})([0-z]{12})/, "$1-$2-$3-$4-$5");

            aFilter.push(new Filter('per_Adani_Logistics_LRF_Master_LRF_Master_ID', FilterOperator.EQ, id));

            const oList = this.byId("ff_docs");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
         
            var oModel;
            var t = sap.ui.getCore().getModel("objectModel").getData().FF_Allocation_Date !== null ?new Date(parseInt(sap.ui.getCore().getModel("objectModel").getData().FF_Allocation_Date.replace(/\D/g, ''))):null;
            if (sap.ui.getCore().getModel("objectModel").getData().To_FF_Shipment == undefined) {
                oModel = new JSONModel({
                    "Allocation_Date":t,
                    "lines_name": sap.ui.getCore().getModel("objectModel").getData().FF_AssignEmail_Id
                });
            }
            else {
                var data = sap.ui.getCore().getModel("objectModel").getData().To_FF_Shipment;
                oModel = new JSONModel({
                    "lines_name": sap.ui.getCore().getModel("objectModel").getData().FF_AssignEmail_Id,
                    "Foriegn_Agent_Details": data.Foriegn_Agent_Details,
                    "Trans_Dir": data.Trans_Dir,
                    "No_Containers": data.No_Containers,
                    "Vessel_Name": data.Vessel_Name,
                    "Ship_Mode": data.Ship_Mode,
                    "Courier_Name": data.Courier_Name,
                    "Docket_No": data.Docket_No,
                    "Docket_Date": data.Docket_Date !== null ? new Date(parseInt(data.Docket_Date.replace(/\D/g, ''))) : null,
                    "BL_No": data.BL_No,
                    "Allocation_Date": t,
                    "BL_Rel_Date": data.BL_Rel_Date !== null ? new Date(parseInt(data.BL_Rel_Date.replace(/\D/g, ''))) : null,
                    "ETD_Plan": data.ETD_Plan !== null ? new Date(parseInt(data.ETD_Plan.replace(/\D/g, ''))) : null,
                    "ETA_Plan": data.ETA_Plan != null ? new Date(parseInt(data.ETA_Plan.replace(/\D/g, ''))) : null,
                    "Delivery_Date": data.Delivery_Date != null ? new Date(parseInt(data.Delivery_Date.replace(/\D/g, ''))) : null,
                    "Arrival_Date": data.Arrival_Date != null ? new Date(parseInt(data.Arrival_Date.replace(/\D/g, ''))) : null,
                    "LC_Issuing_Bank": data.LC_Issuing_Bank,
                    "LC_Control_No": data.LC_Control_No,
                    "LC_Expiry_Date": data.LC_Expiry_Date != null ? new Date(parseInt(data.LC_Expiry_Date.replace(/\D/g, ''))) : null,
                    "DEmpty_Container_Pickup": data.DEmpty_Container_Pickup != null ? new Date(parseInt(data.DEmpty_Container_Pickup.replace(/\D/g, ''))) : null,
                    "DContainer_Handed_Over_to_Shipper": data.DContainer_Handed_Over_to_Shipper != null ? new Date(data.DContainer_Handed_Over_to_Shipper) : null,
                    "DContainer_Stuffing": data.DContainer_Stuffing != null ? new Date(parseInt(data.DContainer_Stuffing.replace(/\D/g, ''))) : null,
                    "DLoaded_Container_Movement_to_Factory": data.DLoaded_Container_Movement_to_Factory != null ? new Date(parseInt(data.DLoaded_Container_Movement_to_Factory.replace(/\D/g, ''))) : null,
                    "DLoaded_Container_Arrival_Terminal": data.DLoaded_Container_Arrival_Terminal != null ? new Date(parseInt(data.DLoaded_Container_Arrival_Terminal.replace(/\D/g, ''))) : null,
                    "DExport_Clearance": data.DExport_Clearance != null ? new Date(parseInt(data.DExport_Clearance.replace(/\D/g, ''))) : null,
                    "DDocument_Cutoff": data.DDocument_Cutoff != null ? new Date(parseInt(data.DDocument_Cutoff.replace(/\D/g, ''))) : null,
                    "DGatein_Cutoff": data.DGatein_Cutoff != null ? new Date(parseInt(data.DGatein_Cutoff.replace(/\D/g, ''))) : null,
                    "DVessel_ETA_at_Origin": data.DVessel_ETA_at_Origin != null ? new Date(parseInt(data.DVessel_ETA_at_Origin.replace(/\D/g, ''))) : null,
                    "DContainer_Loaded_on_Vessel": data.DContainer_Loaded_on_Vessel != null ? new Date(parseInt(data.DContainer_Loaded_on_Vessel.replace(/\D/g, ''))) : null,
                    "DContainer_Offloaded_from_Vessel": data.DContainer_Offloaded_from_Vessel !== null ? new Date(parseInt(data.DContainer_Offloaded_from_Vessel.replace(/\D/g, ''))) : null,
                    "FFSubmit": data.FFSubmit
                });
            }
            console.log(oModel)
            this.getView().setModel(oModel, "ff");
        },
        onAfterRendering: function () {


        },
        onSelectMode: function (e) {
            var text = e.getSource().getButtons()[e.getParameter("selectedIndex")].getText();
            this.getView().getModel("ff").oData["Trans_Dir"] = text;
        },
        onSave: function () {
            var data = this.getView().getModel("ff").oData;
            console.log(data);
            var ff_data = {
                "Foriegn_Agent_Details": data.Foriegn_Agent_Details,
                "Trans_Dir": data.Trans_Dir,
                "No_Containers": data.No_Containers,
                "Vessel_Name": data.Vessel_Name,
                "Ship_Mode": data.Ship_Mode,
                "Courier_Name": data.Courier_Name,
                "Docket_No": data.Docket_No,
                "BL_No": data.BL_No,
                "LC_Issuing_Bank": data.LC_Issuing_Bank,
                "LC_Control_No": data.LC_Control_No
            }
            if (data.Docket_Date) ff_data['Docket_Date'] = data.Docket_Date.toLocaleDateString('en-CA');
            if (data.BL_Rel_Date) ff_data['BL_Rel_Date'] = data.BL_Rel_Date.toLocaleDateString('en-CA');
            if (data.ETD_Plan) ff_data['ETD_Plan'] = data.ETD_Plan.toLocaleDateString('en-CA');
            if (data.ETA_Plan) ff_data['ETA_Plan'] = data.ETA_Plan.toLocaleDateString('en-CA');
            if (data.Delivery_Date) ff_data['Delivery_Date'] = data.Delivery_Date.toLocaleDateString('en-CA');
            if (data.Arrival_Date) ff_data['Arrival_Date'] = data.Arrival_Date.toLocaleDateString('en-CA');
            if (data.LC_Expiry_Date) ff_data['LC_Expiry_Date'] = data.LC_Expiry_Date.toLocaleDateString('en-CA');
            if (data.DEmpty_Container_Pickup) ff_data['DEmpty_Container_Pickup'] = data.DEmpty_Container_Pickup.toLocaleDateString('en-CA');
            if (data.DContainer_Handed_Over_to_Shipper) ff_data['DContainer_Handed_Over_to_Shipper'] = data.DContainer_Handed_Over_to_Shipper.toLocaleDateString('en-CA');
            if (data.DContainer_Stuffing) ff_data['DContainer_Stuffing'] = data.DContainer_Stuffing.toLocaleDateString('en-CA');
            if (data.DLoaded_Container_Movement_to_Factory) ff_data['DLoaded_Container_Movement_to_Factory'] = data.DLoaded_Container_Movement_to_Factory.toLocaleDateString('en-CA');
            if (data.DLoaded_Container_Arrival_Terminal) ff_data['DLoaded_Container_Arrival_Terminal'] = data.DLoaded_Container_Arrival_Terminal.toLocaleDateString('en-CA');
            if (data.DExport_Clearance) ff_data['DExport_Clearance'] = data.DExport_Clearance.toLocaleDateString('en-CA');
            if (data.DDocument_Cutoff) ff_data['DDocument_Cutoff'] = data.DDocument_Cutoff.toLocaleDateString('en-CA');
            if (data.DGatein_Cutoff) ff_data['DGatein_Cutoff'] = data.DGatein_Cutoff.toLocaleDateString('en-CA');
            if (data.DVessel_ETA_at_Origin) ff_data['DVessel_ETA_at_Origin'] = data.DVessel_ETA_at_Origin.toLocaleDateString('en-CA');
            if (data.DContainer_Loaded_on_Vessel) ff_data['DContainer_Loaded_on_Vessel'] = data.DContainer_Loaded_on_Vessel.toLocaleDateString('en-CA');
            if (data.DContainer_Offloaded_from_Vessel) ff_data['DContainer_Offloaded_from_Vessel'] = data.DContainer_Offloaded_from_Vessel.toLocaleDateString('en-CA');


            var data1 = {
                "To_FF_Shipment": ff_data
            };
            var that = this;
            var oModel = this.getView().getModel();
            var sServiceUrl = oModel.sServiceUrl;
            if (sap.ui.getCore().getModel("objectModel").getData().To_FF_Shipment == undefined) {
                var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
            }
            else {
                var sEntitySet = "/PAdani_Logistics_FF_Ship_Details";
                var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().To_FF_Shipment.FF_Ship_ID;
                data1 = ff_data;
            } var sRequestUrl = sServiceUrl + sEntitySet + "(guid'" + sEntityKey + "')";
            // Perform the PATCH request
            jQuery.ajax({
                url: sRequestUrl,
                method: "PATCH", // Set the method explicitly to PATCH
                headers: {
                    "Content-Type": "application/json",
                    "DataServiceVersion": "2.0",
                    "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                },
                data: JSON.stringify(data1),
                success: async function () {
                    console.log("PATCH request successful");
                    MessageBox.success("Successfully Saved data");
                    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec

                    window.history.go(-1);
                },
                error: function (oError) {
                    console.error("PATCH request failed: " + oError.responseText);
                    alert(oError.responseText);
                }
            });
        },
        onSubmit: function () {
            // if (!this.validate_address() || !this.validate_new_cpname() || !this.validate_new_c_country_code() || !this.validate_new_c_mobile_no() || !this.validate_new_cpemail()) {
            //     this.validate_address(); this.validate_new_cpname(); this.validate_new_c_country_code(); this.validate_new_c_mobile_no(); this.validate_new_cpemail();
            //     MessageBox.error("Kindly fill all mendatory data and then press 'Submit' button.");
            // }
            // else {
            var data = this.getView().getModel("ff").oData;
            console.log(data);
            var ff_data = {
                "Foriegn_Agent_Details": data.Foriegn_Agent_Details,
                "Trans_Dir": data.Trans_Dir,
                "No_Containers": data.No_Containers,
                "Vessel_Name": data.Vessel_Name,
                "Ship_Mode": data.Ship_Mode,
                "Courier_Name": data.Courier_Name,
                "Docket_No": data.Docket_No,
                "BL_No": data.BL_No,
                "LC_Issuing_Bank": data.LC_Issuing_Bank,
                "LC_Control_No": data.LC_Control_No,
                "FFSubmit": "YES"
            }
            if (data.Docket_Date) ff_data['Docket_Date'] = data.Docket_Date.toLocaleDateString('en-CA');
            if (data.BL_Rel_Date) ff_data['BL_Rel_Date'] = data.BL_Rel_Date.toLocaleDateString('en-CA');
            if (data.ETD_Plan) ff_data['ETD_Plan'] = data.ETD_Plan.toLocaleDateString('en-CA');
            if (data.ETA_Plan) ff_data['ETA_Plan'] = data.ETA_Plan.toLocaleDateString('en-CA');
            if (data.Delivery_Date) ff_data['Delivery_Date'] = data.Delivery_Date.toLocaleDateString('en-CA');
            if (data.Arrival_Date) ff_data['Arrival_Date'] = data.Arrival_Date.toLocaleDateString('en-CA');
            if (data.LC_Expiry_Date) ff_data['LC_Expiry_Date'] = data.LC_Expiry_Date.toLocaleDateString('en-CA');
            if (data.DEmpty_Container_Pickup) ff_data['DEmpty_Container_Pickup'] = data.DEmpty_Container_Pickup.toLocaleDateString('en-CA');
            if (data.DContainer_Handed_Over_to_Shipper) ff_data['DContainer_Handed_Over_to_Shipper'] = data.DContainer_Handed_Over_to_Shipper.toLocaleDateString('en-CA');
            if (data.DContainer_Stuffing) ff_data['DContainer_Stuffing'] = data.DContainer_Stuffing.toLocaleDateString('en-CA');
            if (data.DLoaded_Container_Movement_to_Factory) ff_data['DLoaded_Container_Movement_to_Factory'] = data.DLoaded_Container_Movement_to_Factory.toLocaleDateString('en-CA');
            if (data.DLoaded_Container_Arrival_Terminal) ff_data['DLoaded_Container_Arrival_Terminal'] = data.DLoaded_Container_Arrival_Terminal.toLocaleDateString('en-CA');
            if (data.DExport_Clearance) ff_data['DExport_Clearance'] = data.DExport_Clearance.toLocaleDateString('en-CA');
            if (data.DDocument_Cutoff) ff_data['DDocument_Cutoff'] = data.DDocument_Cutoff.toLocaleDateString('en-CA');
            if (data.DGatein_Cutoff) ff_data['DGatein_Cutoff'] = data.DGatein_Cutoff.toLocaleDateString('en-CA');
            if (data.DVessel_ETA_at_Origin) ff_data['DVessel_ETA_at_Origin'] = data.DVessel_ETA_at_Origin.toLocaleDateString('en-CA');
            if (data.DContainer_Loaded_on_Vessel) ff_data['DContainer_Loaded_on_Vessel'] = data.DContainer_Loaded_on_Vessel.toLocaleDateString('en-CA');
            if (data.DContainer_Offloaded_from_Vessel) ff_data['DContainer_Offloaded_from_Vessel'] = data.DContainer_Offloaded_from_Vessel.toLocaleDateString('en-CA');


            var data1 = {
                "To_FF_Shipment": ff_data
            };
            var that = this;
            var oModel = this.getView().getModel();
            var sServiceUrl = oModel.sServiceUrl;
            if (sap.ui.getCore().getModel("objectModel").getData().To_FF_Shipment == undefined) {
                var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
            }
            else {
                var sEntitySet = "/PAdani_Logistics_FF_Ship_Details";
                var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().To_FF_Shipment.FF_Ship_ID;
                data1 = ff_data;
            } var sRequestUrl = sServiceUrl + sEntitySet + "(guid'" + sEntityKey + "')";
            // Perform the PATCH request
            jQuery.ajax({
                url: sRequestUrl,
                method: "PATCH", // Set the method explicitly to PATCH
                headers: {
                    "Content-Type": "application/json",
                    "DataServiceVersion": "2.0",
                    "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                },
                data: JSON.stringify(data1),
                success: async function () {
                    console.log("PATCH request successful");
                    MessageBox.success("Successfully submitted data");
                    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec

                    window.history.go(-1);
                },
                error: function (oError) {
                    console.error("PATCH request failed: " + oError.responseText);
                    alert(oError.responseText);
                }
            });

            // }

        },
        onSelectItem: function (oEvent) {
            if (oEvent.getSource().getSelectedItem().getText() === "Others") {
                this.getView().byId("other_docs").setVisible(true);
            }
            else {
                this.getView().byId("other_docs").setVisible(false);
            }
            oSelectedItem = oEvent.getSource().getSelectedItem().getText();

            //   this.getView().byId("dcheck_3").setVisible(true);
        },
        onAfterItemAdded: function (oEvent) {
            var item = oEvent.getParameter("item")
            var oFileName = oEvent.mParameters.item.getFileName();
            if (oSelectedItem.includes("Others")) {
                if (this.getView().byId("other_docs").getValue() == "") {
                    this.getView().byId("other_docs").setValueState("Error");
                    return;
                }
                else {
                    this.getView().byId("other_docs").setValueState("None");
                    var oChangeFileName = this.getView().byId("other_docs").getValue() + " - " + oFileName;
                }
            }
            else {
                var oChangeFileName = oSelectedItem + " - " + oFileName;
            }

            oEvent.mParameters.item.setFileName(oChangeFileName);

            this._createEntity(item)
                .then((id) => {
                    this._uploadContent(item, id);
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        onUploadCompleted: function (oEvent) {
            var oUploadSet = this.byId("ff_docs");
            oUploadSet.removeAllIncompleteItems();
            oUploadSet.getBinding("items").refresh();
        },

        _createEntity: function (item) {
            var lid = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;

            var doc_url = "/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(" + lid + ")/To_FF_Documents";

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
                        resolve(results.FF_DocUpload_ID);

                    })
                    .fail((err) => {
                        reject(err);
                        console.log("rrr")
                    })
            })
        },

        _uploadContent: function (item, id) {
            var lid = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
            var url = `/odata/v4/logistics-/per_Adani_Logistics_LRF_Master(` + lid + `)/To_FF_Documents(${id})/content`;

            item.setUploadUrl(url);
            var oUploadSet = this.byId("ff_docs");
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

        onRemovePressed: function (oEvent) {
            oEvent.preventDefault();
            var item = oEvent.getSource();
            var id = item.getUrl().split('(')[1].split(')')[0];
            var oUploadSet = this.byId("ff_docs");
            oUploadSet.setHttpRequestMethod("PUT")
            oUploadSet.removeItem(item);
            var that = this;

            var url = `/odata/v4/logistics-/PAdani_Logistics_FF_Doc_Upload/${id}`;

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

                        resolve(results.FF_DocUpload_ID);

                    })
                    .fail((err) => {
                        reject(err);
                    })
            })
        },
        cEmptyFinal: function () {
            if (this.getView().byId("other_docs").getValue() == "") {
                this.getView().byId("other_docs").setValueState("Error");
            }
            else {
                this.getView().byId("other_docs").setValueState("None");

            }
        },
        validate_date: function (oEvent,id) {
            if (this.getView().byId(id).getDateValue() == null) {
                this.getView().byId(id).setValueState("Error");
                return 0;
            }
            else {
                this.getView().byId(id).setValueState("None");
                return 1;
            }
        },
    });
});