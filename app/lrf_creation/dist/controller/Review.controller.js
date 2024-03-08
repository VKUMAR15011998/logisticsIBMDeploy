sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/Token","sap/m/MessageToast","sap/ui/export/library","sap/ui/export/Spreadsheet"],function(e,t,b,d,a,i,l){"use strict";var y;return e.extend("projectlnc.controller.Review",{onInit:function(){},onAfterRendering:function(){this.getView().getModel("materials").refresh(true);console.log("hrello");this.getView().byId("uitable").setVisibleRowCount(this.getOwnerComponent().getModel("materials").oData["items"].length);var e="";y=this.getView().getParent().getParent().getParent().getParent().getParent();var t=y.byId("subView1").byId("multiInput1").getTokens();for(let b=0;b<t.length;b++){if(b==t.length-1)e=e+t[b].getText();else e=e+t[b].getText()+", "}var b="";var d=y.byId("subView2").byId("pack_type").getSelectedItems();for(let e=0;e<d.length;e++){if(e==d.length-1)b=b+d[e].getText();else b=b+d[e].getText()+", "}var a="";var i=y.byId("subView2").byId("vhicle_type").getSelectedItems();for(let e=0;e<i.length;e++){if(e==i.length-1)a=a+i[e].getText();else a=a+i[e].getText()+", "}var l="";var o=y.byId("subView2").byId("h20").getValue();var r=y.byId("subView2").byId("o20").getValue();var u=y.byId("subView2").byId("f20").getValue();var I=y.byId("subView2").byId("g20").getValue();var s=y.byId("subView2").byId("h40").getValue();var g=y.byId("subView2").byId("o40").getValue();var n=y.byId("subView2").byId("f40").getValue();var _=y.byId("subView2").byId("g40").getValue();if(o!="0"){l=l+o+": 20' High Cube\n"}if(s!="0"){l=l+s+": 40' High Cube\n"}if(u!="0"){l=l+u+": 20' Flat Rack\n"}if(n!="0"){l=l+n+": 40' Flat Rack\n"}if(r!="0"){l=l+r+": 20' Open Top\n"}if(g!="0"){l=l+g+": 40' Open Top\n"}if(I!="0"){l=l+I+": 20' General Purpose\n"}if(_!="0"){l=l+_+": 40' General Purpose\n"}if(l=="")l="Not Containerised";var V="";var c=y.byId("subView2").byId("ref_pack_photo").getItems();for(let e=0;e<c.length;e++){V=V+c[e].getFileName()+"\n"}var w=y.byId("subView4").byId("check_1").getItems();var m=y.byId("subView4").byId("check_2").getItems();var p=y.byId("subView4").byId("check_3").getItems();var f,h,v;if(w.length>0&&y.byId("subView4").byId("radio_1").getSelectedButton().getText()=="Yes")f=w[0].getFileName();if(m.length>0&&y.byId("subView4").byId("radio_2").getSelectedButton().getText()=="Yes")h=m[0].getFileName();if(p.length>0&&y.byId("subView4").byId("radio_3").getSelectedButton().getText()=="Yes")v=p[0].getFileName();var T="";var x=y.byId("subView4").byId("dcheck_3").getItems();for(let e=0;e<x.length;e++){T=T+x[e].getFileName()+"\n"}var k="";var S=y.byId("subView4").byId("fcheck_3").getItems();for(let e=0;e<S.length;e++){k=k+S[e].getFileName()+"\n"}var B={requision_date:y.byId("subView1").byId("req_date").getValue(),po_no:y.byId("subView1").byId("po_no").getValue(),ref_lrf:y.byId("subView1").byId("ref_lrf").getValue(),lrf_no:"HAHAHA",init_name:y.byId("subView1").byId("init_name").getValue(),vendor_name:y.byId("subView1").byId("vendor_name").getValue(),project:y.byId("subView1").byId("project").getValue(),country_code:y.byId("subView1").byId("country_code").getValue().split(" ")[0],init_mobile:y.byId("subView1").byId("mobile_no").getValue(),add_country_code:y.byId("subView1").byId("add_country_code").getValue().split(" ")[0],add_mobile:y.byId("subView1").byId("add_mobile_no").getValue(),init_email:y.byId("subView1").byId("init_email").getValue(),extra_email:e,qty:y.byId("subView3").byId("total_qty").getText(),net:y.byId("subView3").byId("total_net").getText(),gross:y.byId("subView3").byId("total_gross").getText(),ready_date:y.byId("subView2").byId("ready_date").getDateValue(),org_add:y.byId("subView2").byId("org_add").getValue(),country:y.byId("subView2").byId("country").getValue(),pack_type:b,delivery_terms:y.byId("subView2").byId("delivery_terms").getValue(),inco_terms:y.byId("subView2").byId("inco_terms").getValue(),cpname:y.byId("subView2").byId("cpname").getValue(),c_country_code:y.byId("subView2").byId("c_country_code").getValue().split(" ")[0],c_mobile_no:y.byId("subView2").byId("c_mobile_no").getValue(),cpemail:y.byId("subView2").byId("cpemail").getValue(),vhicle_type:a,load_port:y.byId("subView2").byId("load_port").getValue(),discharge_port_name:y.byId("subView2").byId("discharge_port_name").getValue(),containers:l,pack_photo_list:V,overall_remark:y.byId("subView4").byId("overall_remark").getValue(),spec:y.byId("subView4").byId("spec").getValue(),label_1:y.byId("subView4").byId("label_1").getText(),label_2:y.byId("subView4").byId("label_2").getText(),label_3:y.byId("subView4").byId("label_3").getText(),label_4:y.byId("subView4").byId("label_4").getText(),label_5:y.byId("subView4").byId("label_5").getText(),label_6:y.byId("subView4").byId("label_6").getText(),radio_1:y.byId("subView4").byId("radio_1").getSelectedButton().getText(),radio_2:y.byId("subView4").byId("radio_2").getSelectedButton().getText(),radio_3:y.byId("subView4").byId("radio_3").getSelectedButton().getText(),radio_4:y.byId("subView4").byId("radio_4").getSelectedButton().getText(),radio_5:y.byId("subView4").byId("radio_5").getSelectedButton().getText(),radio_6:y.byId("subView4").byId("radio_6").getSelectedButton().getText(),check_1:f,check_2:h,check_3:v,draft_list:T,final_list:k};y.getModel("lrf_data").setProperty("/",B)},go1:function(){y.byId("iconTabBar").setSelectedKey("one")},go2:function(){y.byId("iconTabBar").setSelectedKey("two")},go3:function(){y.byId("iconTabBar").setSelectedKey("three")},go4:function(){y.byId("iconTabBar").setSelectedKey("four")}})});