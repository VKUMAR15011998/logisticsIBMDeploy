sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageBox",

], function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("lrftracker.controller.DeliveryDetails", {

        onInit: function () {

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("DeliveryDetails").attachPatternMatched(this._onRouteMatched, this);
           // this.getOwnerComponent().getModel("objectModel");

            var oModel = new JSONModel();
            oModel.loadData("model/mob_country_code.json");
            oModel.setSizeLimit(300)
            this.getView().setModel(oModel, "mo_list");


        },
        _onRouteMatched:async function (oEvent) {
            var cc = oEvent.getParameter("arguments").LRF_Master_ID;
			var cc1 = oEvent.getParameter("arguments").Lrf_No;
            var url = this.getOwnerComponent().getModel().sServiceUrl;
			url = url + "/per_Adani_Logistics_LRF_Master(guid'" + cc +"')";
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


            //console.log(sap.ui.getCore().getModel("objectModel").getData());
            var oModel;
            if (sap.ui.getCore().getModel("objectModel").getData().To_DeliveryDetails == undefined) {
                oModel = new JSONModel({ "DAddress_radio": sap.ui.getCore().getModel("objectModel").getData().DAddress_radio });
            }
            else {
                var data = sap.ui.getCore().getModel("objectModel").getData().To_DeliveryDetails;
                oModel = new JSONModel({
                    "DAddress_radio": sap.ui.getCore().getModel("objectModel").getData().DAddress_radio,
                    "Site_Address": data.Site_Address,
                    "DContact_Person": data.DContact_Person,
                    "DContact_No": data.DContact_No,
                    "DCountry_code": data.DCountry_code,
                    "DEmail_ID": data.DEmail_ID,
                    "Ins_Pol_01": data.Ins_Pol_01,
                    "Ins_Pol_No1": data.Ins_Pol_No1,
                    "Ins_Company1": data.Ins_Company1,
                    "Pol_Exp_Date1": data.Pol_Exp_Date1 !== null ? new Date(parseInt(data.Pol_Exp_Date1.replace(/\D/g, ''))) : null,
                    "Ins_Pol_02": data.Ins_Pol_02,
                    "Ins_Pol_No2": data.Ins_Pol_No2,
                    "Ins_Company2": data.Ins_Company2,
                    "Pol_Exp_Date2": data.Pol_Exp_Date2 !== null ? new Date(parseInt(data.Pol_Exp_Date2.replace(/\D/g, ''))) : null,
                    "Ins_Pol_03": data.Ins_Pol_03,
                    "Ins_Pol_No3": data.Ins_Pol_No3,
                    "Ins_Company3": data.Ins_Company3,
                    "Pol_Exp_Date3": data.Pol_Exp_Date3 !== null ? new Date(parseInt(data.Pol_Exp_Date3.replace(/\D/g, ''))) : null,
                    "DSubmit": data.DSubmit
                });
            }
            this.getView().setModel(oModel, "delivery");


        },
        onAfterRendering: function () {

        },
        validate_address: function () {
            if (this.getView().byId("origin_address").getSelectedButton().getText() == "No" && this.getView().byId("org_new_add").getValue() == "") {
                this.getView().byId("org_new_add").setValueState("Error");
                return 0;
            }
            else {
                this.getView().byId("org_new_add").setValueState("None");
                return 1;
            }
        },
        onSelectAdd: function (e) {
            var text = e.getSource().getButtons()[e.getParameter("selectedIndex")].getText();
            this.getView().getModel("delivery").oData["DAddress_radio"] = text;
            if (text == "No") {
                // this.getView().byId("org_add").setValue("");
                // this.getView().byId("org_add").setEnabled(true);
                this.getView().byId("org_add").setVisible(false);
                this.getView().byId("org_new_add").setVisible(true);

            }
            else {
                // this.getView().byId("org_add").setValue(this.getView().getModel("lrf_part_2").oData.org_add);
                // this.getView().byId("org_add").setEnabled(false);
                this.getView().byId("org_add").setVisible(true);
                this.getView().byId("org_new_add").setVisible(false);
            }
        },
        validate_date: function (oEvent) {
            if (this.getView().byId("date1").getDateValue() == null) {
                this.getView().byId("date1").setValueState("Error");
                return 0;
            }
            else {
                this.getView().byId("date1").setValueState("None");
                return 1;
            }
        },
        validate_new_cpname: function () {
            if (this.getView().byId("contact_person").getValue() == "") {
                this.getView().byId("contact_person").setValueState("Error");
                return 0;

            }
            else {
                this.getView().byId("contact_person").setValueState("None");
                return 1;

            }
        },
        validate_new_c_country_code: function () {
            if (this.getView().byId("c_country_code").getSelectedKey() == "") {
                this.getView().byId("c_country_code").setValueState("Error");
                return 0;

            }
            else {
                this.getView().byId("c_country_code").setValueState("None");
                return 1;

            }
        },
        validate_new_c_mobile_no: function () {
            if (this.getView().byId("c_mobile_no").getValue().length < 7) {
                this.getView().byId("c_mobile_no").setValueState("Error");
                return 0;

            }
            else {
                this.getView().byId("c_mobile_no").setValueState("None");
                return 1;

            }
        },
        validate_new_cpemail: function () {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.getView().byId("cemail").getValue()))) {
                this.getView().byId("cemail").setValueState("Error");
                return 0;

            }
            else {
                this.getView().byId("cemail").setValueState("None");
                return 1;

            }
        },
        onSave: function () {
            var data = this.getView().getModel("delivery").oData;
            var del_data = {
                "Site_Address": data.Site_Address,
                "DContact_Person": data.DContact_Person,
                "DCountry_code": data.DCountry_code,
                "DContact_No": data.DContact_No,
                "DEmail_ID": data.DEmail_ID,
                "Ins_Pol_01": data.Ins_Pol_01,
                "Ins_Pol_No1": data.Ins_Pol_No1,
                "Ins_Company1": data.Ins_Company1,
                "Ins_Pol_02": data.Ins_Pol_02,
                "Ins_Pol_No2": data.Ins_Pol_No2,
                "Ins_Company2": data.Ins_Company2,
                "Ins_Pol_03": data.Ins_Pol_03,
                "Ins_Pol_No3": data.Ins_Pol_No3,
                "Ins_Company3": data.Ins_Company3,
            }
            if (data.Pol_Exp_Date1) del_data['Pol_Exp_Date1'] = data.Pol_Exp_Date1.toLocaleDateString('en-CA');
            if (data.Pol_Exp_Date2) del_data['Pol_Exp_Date2'] = data.Pol_Exp_Date2.toLocaleDateString('en-CA');
            if (data.Pol_Exp_Date3) del_data['Pol_Exp_Date3'] = data.Pol_Exp_Date3.toLocaleDateString('en-CA');


            var data1 = {
                "DAddress_radio": data.DAddress_radio,
                "To_DeliveryDetails": del_data
            };
            var that = this;
            var oModel = this.getView().getModel();
            var sServiceUrl = oModel.sServiceUrl;
            if (sap.ui.getCore().getModel("objectModel").getData().To_DeliveryDetails == undefined) {
                var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
            }
            else {
                var sEntitySet = "/PAdani_Logistics_Delivery_Details";
                var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().To_DeliveryDetails.Delivery_ID;
                data1 = del_data;
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
                    MessageBox.success("Successfully saved data");
                    location.reload();
                //    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
                //     window.history.go(-1);

                },
                error: function (oError) {
                    console.error("PATCH request failed: " + oError.responseText);
                    alert(oError.responseText);
                }
            });

        },
        onSubmit: function () {
            if (!this.validate_address() || !this.validate_new_cpname() || !this.validate_new_c_country_code() || !this.validate_new_c_mobile_no() || !this.validate_new_cpemail()) {
                this.validate_address(); this.validate_new_cpname(); this.validate_new_c_country_code(); this.validate_new_c_mobile_no(); this.validate_new_cpemail();
                MessageBox.error("Kindly fill all mendatory data and then press 'Submit' button.");
            }
            else {
                var data = this.getView().getModel("delivery").oData;
                var del_data = {
                    "Site_Address": data.Site_Address,
                    "DContact_Person": data.DContact_Person,
                    "DCountry_code": data.DCountry_code,
                    "DContact_No": data.DContact_No,
                    "DEmail_ID": data.DEmail_ID,
                    "Ins_Pol_01": data.Ins_Pol_01,
                    "Ins_Pol_No1": data.Ins_Pol_No1,
                    "Ins_Company1": data.Ins_Company1,
                    "Ins_Pol_02": data.Ins_Pol_02,
                    "Ins_Pol_No2": data.Ins_Pol_No2,
                    "Ins_Company2": data.Ins_Company2,
                    "Ins_Pol_03": data.Ins_Pol_03,
                    "Ins_Pol_No3": data.Ins_Pol_No3,
                    "Ins_Company3": data.Ins_Company3,
                    "DSubmit": "YES"
                }
                if (data.Pol_Exp_Date1) del_data['Pol_Exp_Date1'] = data.Pol_Exp_Date1.toLocaleDateString('en-CA');
                if (data.Pol_Exp_Date2) del_data['Pol_Exp_Date2'] = data.Pol_Exp_Date2.toLocaleDateString('en-CA');
                if (data.Pol_Exp_Date3) del_data['Pol_Exp_Date3'] = data.Pol_Exp_Date3.toLocaleDateString('en-CA');


                var data1 = {
                    "DAddress_radio": data.DAddress_radio,
                    "To_DeliveryDetails": del_data
                };
                var that = this;
                var oModel = this.getView().getModel();
                var sServiceUrl = oModel.sServiceUrl;
                if (sap.ui.getCore().getModel("objectModel").getData().To_DeliveryDetails == undefined) {
                    var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                    var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
                }
                else {
                    var sEntitySet = "/PAdani_Logistics_Delivery_Details";
                    var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().To_DeliveryDetails.Delivery_ID;
                    data1 = del_data;
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
                    success: function () {
                        console.log("PATCH request successful");
                        MessageBox.success("Successfully submitted data");
                        location.reload();
                    },
                    error: function (oError) {
                        console.error("PATCH request failed: " + oError.responseText);
                        alert(oError.responseText);
                    }
                });

            }

        }
    });

});