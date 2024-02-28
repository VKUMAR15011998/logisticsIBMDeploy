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
       
var main_View;
        return Controller.extend("projectlnc.controller.Review", {
            onInit: function () {
                
            },
            onAfterRendering: function(){
                this.getView().getModel("materials").refresh(true);
                console.log("hrello")
             this.getView().byId("uitable").setVisibleRowCount(this.getOwnerComponent().getModel("materials").oData['items'].length);
          
             var add_emails = "";
             main_View = this.getView().getParent().getParent().getParent().getParent().getParent();
             var emails = main_View.byId("subView1").byId("multiInput1").getTokens();
             for (let i = 0; i < emails.length; i++) {
                 if (i == emails.length - 1)
                     add_emails = add_emails + emails[i].getText();

                 else
                     add_emails = add_emails + emails[i].getText() + ", ";
             }
             var pack_type_list=""
             var pack_type = main_View.byId("subView2").byId("pack_type").getSelectedItems();
             for (let i = 0; i < pack_type.length; i++) {
                 if (i == pack_type.length - 1)
                 pack_type_list = pack_type_list + pack_type[i].getText();

                 else
                 pack_type_list = pack_type_list + pack_type[i].getText() + ", ";
             }
             var vh_type_list=""
             var vhicle_type = main_View.byId("subView2").byId("vhicle_type").getSelectedItems();
             for (let i = 0; i < vhicle_type.length; i++) {
                 if (i == vhicle_type.length - 1)
                 vh_type_list = vh_type_list + vhicle_type[i].getText();

                 else
                 vh_type_list = vh_type_list + vhicle_type[i].getText() + ", ";
             }
             var containers_details=""
             var h20 = main_View.byId("subView2").byId("h20").getValue();
             var o20 = main_View.byId("subView2").byId("o20").getValue();
             var f20 = main_View.byId("subView2").byId("f20").getValue();
             var g20 = main_View.byId("subView2").byId("g20").getValue();
             var h40 = main_View.byId("subView2").byId("h40").getValue();
             var o40 = main_View.byId("subView2").byId("o40").getValue();
             var f40 = main_View.byId("subView2").byId("f40").getValue();
             var g40 = main_View.byId("subView2").byId("g40").getValue();
             if(h20!="0"){
                containers_details = containers_details +h20+ ": 20' High Cube\n";
             }
             if(h40!="0"){
                containers_details = containers_details +h40+ ": 40' High Cube\n";
             }if(f20!="0"){
                containers_details = containers_details +f20+ ": 20' Flat Rack\n";
             }if(f40!="0"){
                containers_details = containers_details +f40+ ": 40' Flat Rack\n";
             }if(o20!="0"){
                containers_details = containers_details +o20+ ": 20' Open Top\n";
             }if(o40!="0"){
                containers_details = containers_details +o40+ ": 40' Open Top\n";
             }if(g20!="0"){
                containers_details = containers_details +g20+ ": 20' General Purpose\n";
             }if(g40!="0"){
                containers_details = containers_details +g40+ ": 40' General Purpose\n";
             }
             if(containers_details=="")
               containers_details = "Not Containerised" 

            var pack_fotos = ""
            var pack_photo_files = main_View.byId("subView2").byId("ref_pack_photo").getItems();
            for(let i=0;i<pack_photo_files.length;i++){
                pack_fotos = pack_fotos + pack_photo_files[i].getFileName()+"\n";
            }
            var check_1 = main_View.byId("subView4").byId("check_1").getItems();
            var check_2 = main_View.byId("subView4").byId("check_2").getItems();
            var check_3 = main_View.byId("subView4").byId("check_3").getItems();
            var c1,c2,c3;
            if(check_1.length>0 && main_View.byId("subView4").byId("radio_1").getSelectedButton().getText()=="Yes")  c1 = check_1[0].getFileName();
            if(check_2.length>0 && main_View.byId("subView4").byId("radio_2").getSelectedButton().getText()=="Yes")  c2 = check_2[0].getFileName();
            if(check_3.length>0 && main_View.byId("subView4").byId("radio_3").getSelectedButton().getText()=="Yes")  c3 = check_3[0].getFileName();


            var draft = ""
            var draft_list = main_View.byId("subView4").byId("dcheck_3").getItems();
            for(let i=0;i<draft_list.length;i++){
                draft = draft + draft_list[i].getFileName()+"\n";
            }
            var final = ""
            var final_list = main_View.byId("subView4").byId("fcheck_3").getItems();
            for(let i=0;i<final_list.length;i++){
                final = final + final_list[i].getFileName()+"\n";
            }
             var data = {
                 requision_date: main_View.byId("subView1").byId("req_date").getValue(),
                 po_no: main_View.byId("subView1").byId("po_no").getValue(),
                 ref_lrf: main_View.byId("subView1").byId("ref_lrf").getValue(),
                 lrf_no: "HAHAHA",
                 init_name: main_View.byId("subView1").byId("init_name").getValue(),
                 vendor_name: main_View.byId("subView1").byId("vendor_name").getValue(),
                 project: main_View.byId("subView1").byId("project").getValue(),
                 country_code: main_View.byId("subView1").byId("country_code").getValue().split(" ")[0],
                 init_mobile: main_View.byId("subView1").byId("mobile_no").getValue(),
                 add_country_code: main_View.byId("subView1").byId("add_country_code").getValue().split(" ")[0],
                 add_mobile: main_View.byId("subView1").byId("add_mobile_no").getValue(),
                 init_email: main_View.byId("subView1").byId("init_email").getValue(),
                 extra_email: add_emails,
                 qty:main_View.byId("subView3").byId("total_qty").getText(),
                 net:main_View.byId("subView3").byId("total_net").getText(),
                 gross:main_View.byId("subView3").byId("total_gross").getText(),
                 ready_date: main_View.byId("subView2").byId("ready_date").getDateValue(),
                 org_add:  main_View.byId("subView2").byId("org_add").getValue(),
                 country:  main_View.byId("subView2").byId("country").getValue(),
                 pack_type:  pack_type_list,
                 delivery_terms:  main_View.byId("subView2").byId("delivery_terms").getValue(),
                 inco_terms:  main_View.byId("subView2").byId("inco_terms").getValue(),
                 cpname: main_View.byId("subView2").byId("cpname").getValue(),
                 c_country_code: main_View.byId("subView2").byId("c_country_code").getValue().split(" ")[0],
                 c_mobile_no: main_View.byId("subView2").byId("c_mobile_no").getValue(),
                 cpemail: main_View.byId("subView2").byId("cpemail").getValue(),
                 vhicle_type: vh_type_list,
                 load_port: main_View.byId("subView2").byId("load_port").getValue(),
                 discharge_port_name: main_View.byId("subView2").byId("discharge_port_name").getValue(),
                 containers: containers_details,
                 pack_photo_list : pack_fotos,
                 overall_remark: main_View.byId("subView4").byId("overall_remark").getValue(),
                 spec: main_View.byId("subView4").byId("spec").getValue(),
                 label_1:main_View.byId("subView4").byId("label_1").getText(),
                 label_2:main_View.byId("subView4").byId("label_2").getText(),
                 label_3:main_View.byId("subView4").byId("label_3").getText(),
                 label_4:main_View.byId("subView4").byId("label_4").getText(),
                 label_5:main_View.byId("subView4").byId("label_5").getText(),
                 label_6:main_View.byId("subView4").byId("label_6").getText(),

                 radio_1:main_View.byId("subView4").byId("radio_1").getSelectedButton().getText(),
                 radio_2:main_View.byId("subView4").byId("radio_2").getSelectedButton().getText(),
                 radio_3:main_View.byId("subView4").byId("radio_3").getSelectedButton().getText(),
                 radio_4:main_View.byId("subView4").byId("radio_4").getSelectedButton().getText(),
                 radio_5:main_View.byId("subView4").byId("radio_5").getSelectedButton().getText(),
                 radio_6:main_View.byId("subView4").byId("radio_6").getSelectedButton().getText(),

                 check_1 : c1,
                 check_2: c2,
                 check_3:c3,

                 draft_list:draft,
                    final_list:final

                }

             main_View.getModel("lrf_data").setProperty("/",data );
            },
            go1: function () {
                main_View.byId("iconTabBar").setSelectedKey("one");
            },
            go2: function () {
                main_View.byId("iconTabBar").setSelectedKey("two");

            },
            go3: function () {
                main_View.byId("iconTabBar").setSelectedKey("three");
            },

            go4: function () {
                main_View.byId("iconTabBar").setSelectedKey("four");
            }
        });
    });
