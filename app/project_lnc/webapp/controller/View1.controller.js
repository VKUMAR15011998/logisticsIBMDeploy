sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    'sap/m/Token',
    "sap/m/MessageToast",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    "sap/m/MessageBox",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Token, MessageToast, library, Spreadsheet, MessageBox) {
        "use strict";
        var turl = "/per_Adani_Logistics_LRF_Master";
        return Controller.extend("projectlnc.controller.View1", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("ImportLRF").attachPatternMatched(this._onObjectMatched, this);

                // this.getView().byId("pack_photo_type").setFilterFunction(function (sTerm, oItem) {
                //     return oItem.getText().match(new RegExp(sTerm, "i")) || oItem.getKey().match(new RegExp(sTerm, "i"));
                // });

            },
            _onObjectMatched: function (oEvent) {
                //console.log(oEvent.getParameter("arguments").refno + "  " + oEvent.getParameter("arguments").lrftype)
                // sap.ushell.Container.getService("UserInfo").getFullName(),
                // if(oEvent.getParameter("arguments").lrftype.includes("Temp") || oEvent.getParameter("arguments").lrftype.includes("None")){
                //      turl = "/Get_Adani_Logistics_LRF_Master";

                // }else{
                //     turl = "/per_Adani_Logistics_LRF_Master";

                // }
                var data = {
                    ID:"",
                    p2:"",
                    p3:"",
                    requision_date: new Date(),
                    po_no: "",
                    ref_lrf: "None",
                    Lrf_No: "",
                    init_name: "bhavin",
                    vendor_name: "bhavin",
                    project: "",
                    init_mobile: "",
                    add_mobile: "",
                    country_code: "",
                    add_country_code: "",
                    // emails:[{"Email":"asd@asd.sd"},{"Email":"aaa@eee.rr"}],
                    emails: [],
                    init_email: "bhavin.email@ibm.com",
                    ready_date: new Date(),
                    vhicle_type: [],
                    pack_type: [],
                    address: "Yes",
                    contact: "Yes",
                    org_add: "Rajkot, India",
                    org_new_add: "",
                    country: "",
                    inco_terms: "",
                    discharge_port_name: "",
                    load_port_name: "",
                    delivery_terms: "FAS",
                    // cpname: "",
                    // c_mobile_no: "",
                    // cpemail: "",
                    // c_country_code: "",
                    new_cpname: "",
                    new_c_mobile_no: "",
                    new_cpemail: "",
                    new_c_country_code: "",
                    containers: "",
                    h20: "0",
                    f20: "0",
                    o20: "0",
                    g20: "0",
                    h40: "0",
                    f40: "0",
                    o40: "0",
                    g40: "0",
                    check1: "No",
                    check2: "No",
                    check3: "No",
                    check4: "No",
                    check5: "No",
                    check6: "No",
                    req: "",
                    remark: "",
                    material: [],
                    total_qty: "",
                    total_net: "",
                    total_gross: "",
                    submit: "No"
                };


                if (oEvent.getParameter("arguments").lrftype === "None" && oEvent.getParameter("arguments").refno !== "None") {
                    // data['ref_lrf'] = oEvent.getParameter("arguments").refno;
                    // data['lrf_no'] = oEvent.getParameter("arguments").lrftype;
                    var that = this;
                    var oModel = this.getView().getModel();
                    var afilters = new Array();
                    var filterByName = new sap.ui.model.Filter("Lrf_No", sap.ui.model.FilterOperator.Contains, oEvent.getParameter("arguments").refno);
                    afilters.push(filterByName);
                    oModel.read(turl, {
                        filters: afilters,
                        urlParameters: {
                            "$expand": "To_MaterialDesc,To_CkeckList",
                        },
                        success: function (oData) {
                            console.log(oData)
                            data = {
                                ID: "",
                                p2:"",
                                p3:"",
                                requision_date: oData['results'][0].Requ_Date,
                                po_no: oData['results'][0].PO_Number,
                                ref_lrf: oEvent.getParameter("arguments").refno,
                                Lrf_No: "",
                                init_name: oData['results'][0].Initiator_Name,
                                vendor_name: oData['results'][0].Vendor_Name,
                                project: oData['results'][0].Project_ID,
                                init_mobile: oData['results'][0].Mobile_No,
                                add_mobile: oData['results'][0].Additional_Mob,
                                country_code: oData['results'][0].Country_code,
                                add_country_code: oData['results'][0].Add_Country_code,
                                init_email: oData['results'][0].Email_Id,
                                emails: oData['results'][0].Additional_MailID,
                                ready_date: oData['results'][0].Ship_ReadDate,
                                vhicle_type: oData['results'][0].TypeOfVehicle,
                                pack_type: oData['results'][0].Packing_Type,
                                address: oData['results'][0].Address_radio,
                                contact: oData['results'][0].Contact_radio,
                                org_add: oData['results'][0].Origin_address,
                                org_new_add: oData['results'][0].Origin_new_address,
                                country: oData['results'][0].Address_country,
                                inco_terms: oData['results'][0].Act_Incoterms,
                                discharge_port_name: oData['results'][0].NameOfDisPort,
                                load_port_name: oData['results'][0].TypeOfLoadPort,
                                delivery_terms: oData['results'][0].PO_Inco_Terms,
                                // cpname: "Foo Bar",
                                // c_mobile_no: "1234567890",
                                // cpemail: "foo@bar.com",
                                // c_country_code: "+1",
                                new_cpname: oData['results'][0].Ship_Cont_Name,
                                new_c_mobile_no: oData['results'][0].Ship_Cont_No,
                                new_cpemail: oData['results'][0].Ship_Email_ID,
                                new_c_country_code: oData['results'][0].Ship_Country_code,
                                containers: oData['results'][0].Contanarised,
                                h20: oData['results'][0].C20_HighCube,
                                f20: oData['results'][0].C20_FlatRack,
                                o20: oData['results'][0].C20_OpenTop,
                                g20: oData['results'][0].C20_GeneralPurpose,
                                h40: oData['results'][0].C40_HighCube,
                                f40: oData['results'][0].C40_FlatRack,
                                o40: oData['results'][0].C40_OpenTop,
                                g40: oData['results'][0].C40_GeneralPurpose,
                                req: oData['results'][0].Sp_Req,
                                remark: oData['results'][0].Remarks,
                                total_qty: oData['results'][0].TotalPackage,
                                total_net: oData['results'][0].TotalNetWeight,
                                total_gross: oData['results'][0].TotalGrossWeight,
                                check1:oData['results'][0].Check1,
                                check2:oData['results'][0].Check2,
                                check3:oData['results'][0].Check3,
                                check4:oData['results'][0].Check4,
                                check5:oData['results'][0].Check5,
                                check6:oData['results'][0].Check6,
                                submit: "No",
                                material: oData['results'][0].To_MaterialDesc.results,

                            }
                            // if (oData['results'][0].To_CkeckList.results.length > 0) {
                            //     data["check1"] = oData['results'][0].To_CkeckList.results[0].Check1;
                            //     data["check2"] = oData['results'][0].To_CkeckList.results[0].Check2;
                            //     data["check3"] = oData['results'][0].To_CkeckList.results[0].Check3;
                            //     data["check4"] = oData['results'][0].To_CkeckList.results[0].Check4;
                            //     data["check5"] = oData['results'][0].To_CkeckList.results[0].Check5;
                            //     data["check6"] = oData['results'][0].To_CkeckList.results[0].Check6;
                            // }
                            var oModel = new JSONModel(data);
                            that.getView().setModel(oModel, "lrf");
                        },
                        error: function (e) {
                            console.log(e)
                        }

                    });
                }
                else if (oEvent.getParameter("arguments").lrftype !== "None") {
                    // data['lrf_no'] = oEvent.getParameter("arguments").lrftype;
                    var that = this;
                    var oModel = this.getView().getModel();
                    var afilters = new Array();
                    var filterByName = new sap.ui.model.Filter("Lrf_No", sap.ui.model.FilterOperator.Contains, oEvent.getParameter("arguments").lrftype);
                    afilters.push(filterByName);
                    oModel.read(turl, {
                        filters: afilters,
                        urlParameters: {
                            "$expand": "To_MaterialDesc,To_CkeckList",
                        },
                        success: function (oData) {
                            console.log(oData)
                            data = {
                                ID: oData['results'][0].LRF_Master_ID,
                                requision_date: oData['results'][0].Requ_Date,
                                po_no: oData['results'][0].PO_Number,
                                ref_lrf: oData['results'][0].Ref_Lrf_No,
                                Lrf_No: oData['results'][0].Lrf_No,
                                init_name: oData['results'][0].Initiator_Name,
                                vendor_name: oData['results'][0].Vendor_Name,
                                project: oData['results'][0].Project_ID,
                                init_mobile: oData['results'][0].Mobile_No,
                                add_mobile: oData['results'][0].Additional_Mob,
                                country_code: oData['results'][0].Country_code,
                                add_country_code: oData['results'][0].Add_Country_code,
                                init_email: oData['results'][0].Email_Id,
                                emails: oData['results'][0].Additional_MailID,

                                ready_date: oData['results'][0].Ship_ReadDate,
                                vhicle_type: oData['results'][0].TypeOfVehicle,
                                pack_type: oData['results'][0].Packing_Type,
                                address: oData['results'][0].Address_radio,
                                contact: oData['results'][0].Contact_radio,
                                org_add: oData['results'][0].Origin_address,
                                org_new_add: oData['results'][0].Origin_new_address,

                                country: oData['results'][0].Address_country,
                                inco_terms: oData['results'][0].Act_Incoterms,
                                discharge_port_name: oData['results'][0].NameOfDisPort,
                                load_port_name: oData['results'][0].TypeOfLoadPort,
                                delivery_terms: oData['results'][0].PO_Inco_Terms,
                                // cpname: "Foo Bar",
                                // c_mobile_no: "1234567890",
                                // cpemail: "foo@bar.com",
                                // c_country_code: "+1",
                                new_cpname: oData['results'][0].Ship_Cont_Name,
                                new_c_mobile_no: oData['results'][0].Ship_Cont_No,
                                new_cpemail: oData['results'][0].Ship_Email_ID,
                                new_c_country_code: oData['results'][0].Ship_Country_code,
                                containers: oData['results'][0].Contanarised,
                                h20: oData['results'][0].C20_HighCube,
                                f20: oData['results'][0].C20_FlatRack,
                                o20: oData['results'][0].C20_OpenTop,
                                g20: oData['results'][0].C20_GeneralPurpose,
                                h40: oData['results'][0].C40_HighCube,
                                f40: oData['results'][0].C40_FlatRack,
                                o40: oData['results'][0].C40_OpenTop,
                                g40: oData['results'][0].C40_GeneralPurpose,
                                req: oData['results'][0].Sp_Req,
                                remark: oData['results'][0].Remarks,
                                total_qty: oData['results'][0].TotalPackage,
                                total_net: oData['results'][0].TotalNetWeight,
                                total_gross: oData['results'][0].TotalGrossWeight,
                                submit: oData['results'][0].Submit_Flag,
                                check1:oData['results'][0].Check1,
                                check2:oData['results'][0].Check2,
                                check3:oData['results'][0].Check3,
                                check4:oData['results'][0].Check4,
                                check5:oData['results'][0].Check5,
                                check6:oData['results'][0].Check6,
                                material: oData['results'][0].To_MaterialDesc.results,
                            }
                            if(oData['results'][0].Address_country!=""){
                                data['p2']="X";
                            }
                            if(oData['results'][0].total_qty!=""){
                                data['p3']="X";
                            }
                            // if (oData['results'][0].To_CkeckList.results.length > 0) {
                            //     data["check1"] = oData['results'][0].To_CkeckList.results[0].Check1;
                            //     data["check2"] = oData['results'][0].To_CkeckList.results[0].Check2;
                            //     data["check3"] = oData['results'][0].To_CkeckList.results[0].Check3;
                            //     data["check4"] = oData['results'][0].To_CkeckList.results[0].Check4;
                            //     data["check5"] = oData['results'][0].To_CkeckList.results[0].Check5;
                            //     data["check6"] = oData['results'][0].To_CkeckList.results[0].Check6;
                            // }
                            console.log(oData['results'][0])
                            console.log(data)
                            var oModel = new JSONModel(data);
                            that.getView().setModel(oModel, "lrf");
                        },
                        error: function (e) {
                            console.log(e)
                        }

                    });
                }
                else {
                    var oModel = new JSONModel(data);
                    this.getView().setModel(oModel, "lrf");
                }
                // this.getView().setModel(oModel, "lrf");
            },
            checkVal: function (oEvent) {
                var cur_key = oEvent.getParameter("previousKey");
                var nxt_key = oEvent.getSource().getSelectedKey();
                switch (nxt_key) {
                    case "one":
                        //if (!this.validate_one()) this.go1();
                        break;
                    case "two":
                        if (!this.validate_one()) {
                            this.go1();
                            MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                        }
                        //else if (!this.validate_two()) this.go2();
                        break;
                    case "three":
                        if (!this.validate_one()) {
                            this.go1();
                            MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                        }
                        else if (!this.validate_two()) {
                            this.go2();
                            MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                        };
                        //else if (!this.validate_three()) this.go3();
                        break;
                    case "four":
                        if (!this.validate_one()) {
                            this.go1();
                            MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                        }
                        else if (!this.validate_two()) {
                            this.go2();
                            MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                        }
                        else if (!this.validate_three()) {
                            this.go3();
                            MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                        }
                        //else if (!this.validate_four()) this.go4();
                        break;
                    default:
                }
            },

            validate_one: function (oEvent) {
                var flag = 0;
                // if (this.getView().byId("master_id").getText() === 'ID : ' || this.getView().byId("lrfno").getText() === 'LRF No. : ') {
                //     flag++;
                // }
                if (this.getView().byId("subView1").byId("po_no").getValue() === "") {
                    this.getView().byId("subView1").byId("po_no").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView1").byId("project").getValue() === "") {
                    this.getView().byId("subView1").byId("project").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView1").byId("country_code").getSelectedKey() === "") {
                    this.getView().byId("subView1").byId("country_code").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView1").byId("mobile_no").getValue().length < 7) {
                    this.getView().byId("subView1").byId("mobile_no").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView1").byId("add_country_code").getSelectedKey() === "" && this.getView().byId("subView1").byId("add_mobile_no").getValue() !== "") {
                    this.getView().byId("subView1").byId("add_country_code").setValueState("Error");
                    if (this.getView().byId("subView1").byId("add_mobile_no").getValue().length < 7)
                        this.getView().byId("subView1").byId("add_mobile_no").setValueState("Error");

                    flag++;
                }
                if (this.getView().byId("subView1").byId("add_country_code").getSelectedKey() !== "" && this.getView().byId("subView1").byId("add_mobile_no").getValue() === "") {
                    this.getView().byId("subView1").byId("add_mobile_no").setValueState("Error");
                    flag++;
                }
                if (flag) {
                    return false
                }
                else {
                    return true;
                }
            },
            validate_two: function (oEvent) {
                var flag = 0;
                if (this.getView().byId("subView2").byId("ready_date").getDateValue() == null) {
                    this.getView().byId("subView2").byId("ready_date").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("country").getSelectedKey() == "") {
                    this.getView().byId("subView2").byId("country").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("pack_type").getSelectedKeys().length == 0) {
                    this.getView().byId("subView2").byId("pack_type").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("inco_terms").getSelectedKey() == "") {
                    this.getView().byId("subView2").byId("inco_terms").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("load_port").getSelectedKey() == "") {
                    this.getView().byId("subView2").byId("load_port").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("discharge_port_name").getSelectedKey() == "") {
                    this.getView().byId("subView2").byId("discharge_port_name").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("vhicle_type").getSelectedKeys().length == 0) {
                    this.getView().byId("subView2").byId("vhicle_type").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("origin_address").getSelectedButton().getText() == "No" && this.getView().byId("subView2").byId("org_new_add").getValue() == "") {
                    this.getView().byId("subView2").byId("org_new_add").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("contact_person").getSelectedButton().getText() == "No" && this.getView().byId("subView2").byId("new_cpname").getValue() == "") {
                    this.getView().byId("subView2").byId("new_cpname").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("contact_person").getSelectedButton().getText() == "No" && this.getView().byId("subView2").byId("new_c_country_code").getSelectedKey() == "") {
                    this.getView().byId("subView2").byId("new_c_country_code").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("contact_person").getSelectedButton().getText() == "No" && this.getView().byId("subView2").byId("new_c_mobile_no").getValue().length < 7) {
                    this.getView().byId("subView2").byId("new_c_mobile_no").setValueState("Error");
                    flag++;
                }
                if (this.getView().byId("subView2").byId("contact_person").getSelectedButton().getText() == "No" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.getView().byId("subView2").byId("new_cpemail").getValue()))) {
                    this.getView().byId("subView2").byId("new_cpemail").setValueState("Error");
                    flag++;
                }
                if (flag) {
                    return false
                }
                else {
                    return true;
                }
            },
            validate_three: function (oEvent) {
                var data = this.getView().getModel("lrf").oData["material"];
                var flag = 0;
                for (let item in Object.keys(data)) {
                    for (let key in data[item]) {
                        if (data[item][key] == "" && key != "Remarks") {
                            flag++;
                            break
                        }
                        if (key == "TypeOfPacking" && !["Loose Material", "Bare", "Gunny Bag", "Wooden Package", "Pallets", "Skid", "Drums"].includes(data[item][key])) {
                            flag++;
                            break
                        }
                    }
                }
                if (flag || data.length < 1) return false;
                else return true;
            },

            validate_four: function (oEvent) {
                var flag = 0;
                if (this.getView().byId("subView4").byId("radio_1").getSelectedButton().getText() == "Yes" && this.getView().byId("subView4").byId("check_1").getItems().length == 0) {
                    flag++;
                }
                if (this.getView().byId("subView4").byId("radio_2").getSelectedButton().getText() == "Yes" && this.getView().byId("subView4").byId("check_2").getItems().length == 0) {
                    flag++;
                }
                if (this.getView().byId("subView4").byId("radio_3").getSelectedButton().getText() == "Yes" && this.getView().byId("subView4").byId("check_3").getItems().length == 0) {
                    flag++;
                }
                if (flag) {
                    return false
                }
                else {
                    return true;
                }
            },

            go1: function () {
                this.getView().byId("iconTabBar").setSelectedKey("one");
            },

            go2: async function () {
                var res = this.validate_one();
                if (res) {
                    this.getView().byId("two").setEnabled(true);
                    var that = this;
                    var oModel = this.getView().getModel();
                    //var oModel = sap.ui.getCore().getModel();
                    var data = this.getView().getModel("lrf").oData;
                    var data1 = {
                        "Submit_Flag": "No",
                        "PO_Number": data['po_no'],
                        "Ref_Lrf_No": data['ref_lrf'],
                        "Project_ID": data['project'],
                        "Additional_MailID": data['emails'],
                        "Requ_Date": data['requision_date'].toLocaleDateString('en-CA'),
                        "Vendor_Name": data['vendor_name'],
                        "Initiator_Name": data['init_name'],
                        "Mobile_No": data['init_mobile'],
                        "Country_code": data['country_code'],
                        "Add_Country_code": data['add_country_code'],
                        "Additional_Mob": data['add_mobile'],
                        "Email_Id": data['init_email'],
                        // "Address_radio": data['address'],
                        // "Contact_radio":data['contact'],
                        // "Contanarised": data['containers'],

                    }
                    console.log(data)
                    console.log(data1)
                    if (data['Lrf_No'] == "") {
                        const oPromise = await new Promise((resolve, reject) => {

                        oModel.create(turl, data1, {
                            success: function (oData, oResponse) {
                                data['ID'] = oData.LRF_Master_ID;
                                data['Lrf_No'] = oData.Lrf_No;

                                var oModel = new JSONModel(data);
                                that.getView().setModel(oModel, "lrf");
                                console.log(that.getView().getModel("lrf").oData);
                                resolve(oData);
                            },
                            error: function (e) {
                                console.log(e)
                                alert(e);
                                resolve(e);

                            }
                        });
                    });
                    }
                    else {
                        var sServiceUrl = oModel.sServiceUrl;
                        var sEntitySet = turl;
                        var sEntityKey = data['ID'];
                        var sRequestUrl = sServiceUrl + sEntitySet + "/" + sEntityKey;
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
                            },
                            error: function (oError) {
                                console.error("PATCH request failed: " + oError.responseText);
                                alert(oError.responseText);
                            }
                        });
                    }

                    this.getView().byId("two").setEnabled(true);
                    this.getView().byId("iconTabBar").setSelectedKey("two");
                }
                else{
                    MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                }
            },
            go3: function () {
                var res = this.validate_two();
                if (res) {
                    this.getView().byId("three").setEnabled(true);
                    var oModel = this.getView().getModel();
                    var data = this.getView().getModel("lrf").oData;

                    var data1 = {
                        "Submit_Flag": "No",
                        "Lrf_No": data['Lrf_No'],
                        "LRF_Master_ID": data['ID'],
                        "Ship_ReadDate": data['ready_date'].toLocaleDateString('en-CA'),
                        "Shipment_Type": "",
                        "Packing_Type": data['pack_type'],
                        "Origin_address": "PO Address",
                        "Origin_new_address": data['org_new_add'],
                        "Address_country": data['country'],
                        "C20_HighCube": parseInt(data['h20']),
                        "C20_FlatRack": parseInt(data['f20']),
                        "C20_OpenTop": parseInt(data['o20']),
                        "C20_GeneralPurpose": parseInt(data['g20']),
                        "C40_HighCube": parseInt(data['h40']),
                        "C40_FlatRack": parseInt(data['f40']),
                        "C40_OpenTop": parseInt(data['o40']),
                        "C40_GeneralPurpose": parseInt(data['g40']),
                        "PO_Inco_Terms": data['delivery_terms'],
                        "Act_Incoterms": data['inco_terms'],
                        "TypeOfVehicle": data['vhicle_type'],
                        "TypeOfLoadPort": data['load_port_name'],
                        "NameOfDisPort": data['discharge_port_name'],
                        "Address_radio": data['address'],
                        "Contact_radio": data['contact'],
                        "Contanarised": data['containers'],
                    }
                    // if (data['address'] === 'Yes') {
                    //     data1["Origin_address"] = "PO address";
                    // }
                    // else {
                    //     data1["Origin_new_address"] = data['org_new_add'];
                    // }
                    if (data['contact'] === 'Yes') {
                        data1["Ship_Cont_Name"] = data['init_name'];
                        data1["Ship_Cont_No"] = data['init_mobile'];
                        data1["Ship_Country_code"] = data['country_code'];
                        data1["Ship_Email_ID"] = data['init_email'];
                    }
                    else {
                        data1["Ship_Cont_Name"] = data['new_cpname'];
                        data1["Ship_Cont_No"] = data['new_c_mobile_no'];
                        data1["Ship_Country_code"] = data['new_c_country_code'];
                        data1["Ship_Email_ID"] = data['new_cpemail'];
                    }
                    console.log(data)
                    console.log(data1)
                    var that = this;
                    var sServiceUrl = oModel.sServiceUrl;
                    var sEntitySet = turl;
                    var sEntityKey = data['ID'];
                    var sRequestUrl = sServiceUrl + sEntitySet + "/" + sEntityKey;
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
                            data['p2'] = "X";
                                var oModel = new JSONModel(data);
                                that.getView().setModel(oModel, "lrf");
                        },
                        error: function (oError) {
                            console.error("PATCH request failed: " + oError.responseText);
                            alert(oError.responseText);
                        }
                    });

                    console.log(this.getView().getModel("lrf").oData);
                    this.getView().byId("three").setEnabled(true);
                    this.getView().byId("iconTabBar").setSelectedKey("three");
                }
                else{
                    MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                }
            },

            go4: function () {
                var res = this.validate_three();
                if (res) {
                    this.getView().byId("four").setEnabled(true);
                    var oModel = this.getView().getModel();
                    var data = this.getView().getModel("lrf").oData;
                    var temp = JSON.parse(JSON.stringify(data));
                    var mat = temp.material;
                    mat = mat.map(function (obj) {
                        obj['PackageNo'] = parseInt(obj['PackageNo']);
                        obj['Length'] = parseInt(obj['Length']);
                        obj['Width'] = parseInt(obj['Width']);
                        obj['Height'] = parseInt(obj['Height']);
                        obj['QtyInNumbers'] = parseInt(obj['QtyInNumbers']);
                        obj['PerPackNetWeight'] = parseInt(obj['PerPackNetWeight']);
                        obj['PerPackGrossWeight'] = parseInt(obj['PerPackGrossWeight']);

                        delete obj['MatID'];
                        delete obj['__metadata'];
                        delete obj['Adani_Logistics_LRF_Master'];
                        delete obj['Adani_Logistics_LRF_Master_LRF_Master_ID'];
                        if(obj['per_Adani_Logistics_LRF_Master'])
                        delete obj['per_Adani_Logistics_LRF_Master'];
                        return obj;
                    });

                    var data1 = {
                        "Submit_Flag": "No",
                        "Lrf_No": data['Lrf_No'],
                        "LRF_Master_ID": data['ID'],
                        "To_MaterialDesc": mat,
                        "TotalNetWeight": data['total_net'],
                        "TotalGrossWeight": data['total_gross'],
                        "TotalPackage": data['total_qty'],
                    };
                    var that = this;
                    var sServiceUrl = oModel.sServiceUrl;
                    var sEntitySet = turl;
                    var sEntityKey = data['ID'];
                    var sRequestUrl = sServiceUrl + sEntitySet + "/" + sEntityKey;
                    // Perform the PATCH request
                    console.log(data1)
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
                            data['p3'] = "X";
                                var oModel = new JSONModel(data);
                                that.getView().setModel(oModel, "lrf");
                        },
                        error: function (oError) {
                            console.error("PATCH request failed: " + oError.responseText);
                            alert(oError.responseText);
                        }
                    });

                    console.log(this.getView().getModel("lrf").oData);
                    this.getView().byId("four").setEnabled(true);
                    this.getView().byId("iconTabBar").setSelectedKey("four");
                }
                else{
                    MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                }
            },

            onSubmit: function () {
                console.log(this.getView().getModel("lrf").oData);
                var res = this.validate_four();
                if (res) {
                    var oModel = this.getView().getModel();
                    var data = this.getView().getModel("lrf").oData;
                    var data1 = {
                        "Submit_Flag": "YES",
                        "Lrf_No": data['Lrf_No'].split("Temp-")[1],
                        "LRF_Master_ID": data['ID'],
                        "Sp_Req": data['req'],
                        "Remarks": data['remark'],
                        // "To_CkeckList": [
                        //     {
                                "Check1": data['check1'],
                                "Check2": data['check2'],
                                "Check3": data['check3'],
                                "Check4": data['check4'],
                                "Check5": data['check5'],
                                "Check6": data['check6'],
                        //     }
                        // ]
                    }
                    console.log(data)
                    console.log(data1)

                    var that = this;
                    var sServiceUrl = oModel.sServiceUrl;
                    var sEntitySet = turl;
                    var sEntityKey = data['ID'];
                    var sRequestUrl = sServiceUrl + sEntitySet + "/" + sEntityKey;
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
                        success: function (res) {
                            console.log("PATCH request successful");
                            //that.onInsertPermData(res.d.LRF_Master_ID);
                            MessageBox.success("Successfully Generated LRF.");
                            //location.reload();
                            window.open(window.location.href.split("#")[0],"_self");
                        },
                        error: function (oError) {
                            console.error("PATCH request failed: " + oError.responseText);
                            alert(oError.responseText);
                        }
                    });
                }
                else {
                    MessageBox.error("Kindly fill all mendatory data and then press 'Next' button.");
                }
            },
            // onInsertPermData: function (ID) {
            //     var oModel = this.getView().getModel();
            //     var sServiceUrl = oModel.sServiceUrl;
            //     var sEntitySet = "/Update_Adani_Logistics_LRF_Master";
            //     var sRequestUrl = sServiceUrl + sEntitySet + "/" + ID + "?$expand=To_PackingDoc,To_MaterialDesc,To_CkeckList,To_Draft,To_Final";
            //     jQuery.ajax({
            //         url: sRequestUrl,
            //         method: "GET", // Set the method explicitly to PATCH
            //         headers: {
            //             "Content-Type": "application/json",
            //             "DataServiceVersion": "2.0",
            //             "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
            //         },
            //         success: function (res) {
            //             console.log("GET request successful");
            //         },
            //         error: function (oError) {
            //             console.error("PATCH request failed: " + oError.responseText);
            //         }
            //     });
            //}
        });
    });
