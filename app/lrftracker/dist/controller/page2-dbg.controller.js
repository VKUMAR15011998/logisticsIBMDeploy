sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",

], function (Controller,MessageBox) {
	"use strict";
	var cc,cc1;
	return Controller.extend("lrftracker.controller.page2", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("page2").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			cc = oEvent.getParameter("arguments").LRF_Master_ID;
			cc1 = oEvent.getParameter("arguments").Lrf_No;

			var that=this;
			var oModel = this.getView().getModel();
			oModel.metadataLoaded().then(function(){
				var sPath = "/per_Adani_Logistics_LRF_Master(guid'"+cc+"')";
				that.getView().bindElement({ path: sPath,
				events:{
					dataReceived: function(data){
						console.log(data);
					}
				},
				parameters: {
					expand: "To_PackingDoc,To_MaterialDesc,To_CkeckList,To_Draft,To_Final,To_DeliveryDetails,To_FF_Shipment,To_FF_Documents"
				}});
			})

			this.OdataGet(cc, cc1);
		},
		onAfterRendering:function(){
		},

		OdataGet: function (cc, cc1) {
			var url = this.getOwnerComponent().getModel().sServiceUrl;
			var that = this;
				url = url + "/per_Adani_Logistics_LRF_Master(guid'" + cc +"')";
			jQuery.ajax({
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
					// console.log(sap.ui.getCore().getModel("objectModel"));
					// sap.ui.getCore().getModel("objectModel").refresh(true);

				}.bind(this),
				error: function (oError) {
					console.error("PATCH request failed: " + oError.responseText);
					alert(oError.responseText);
				}.bind(this)
			});
		},
		onDeliveryDetailsPage: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DeliveryDetails", {
				LRF_Master_ID: cc,
				Lrf_No: cc1
			});
		},

		onFFDetailsPage: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("FFDetails", {
				LRF_Master_ID: cc,
				Lrf_No: cc1
			});
		},

		onAccept: function(){
			var data1 = {
				"LogisticsMPL_Comments":this.getView().byId("mpl_comment").getValue(),
				"LogisticsMPL_Status":"Accept",
				"Submit_Flag":"YES"
			}
            var oModel = this.getView().getModel();
            var sServiceUrl = oModel.sServiceUrl;
            var sEntitySet = "/per_Adani_Logistics_LRF_Master";
            var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
            var sRequestUrl = sServiceUrl + sEntitySet + "(guid'" + sEntityKey +"')";
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
                    MessageBox.success("Successfully Accepted LRF");
					location.reload();
                },
                error: function (oError) {
                    console.error("PATCH request failed: " + oError.responseText);
                    alert(oError.responseText);
                }
            });
		},
		emptyComment: function(){
			if(!this.getView().byId("mpl_comment").getValue()){
				this.getView().byId("mpl_comment").setValueState("Error");
			}
			else{
				this.getView().byId("mpl_comment").setValueState("None");
			}
		},
		onReturn: function(){
			if(!this.getView().byId("mpl_comment").getValue()){
				this.getView().byId("mpl_comment").setValueState("Error");
				return;
			}
			var data1 = {
				"LogisticsMPL_Comments":this.getView().byId("mpl_comment").getValue(),
				"LogisticsMPL_Status":"Return",
				"Submit_Flag": "No"
			}
            var oModel = this.getView().getModel();
            var sServiceUrl = oModel.sServiceUrl;
            var sEntitySet = "/per_Adani_Logistics_LRF_Master";
            var sEntityKey = sap.ui.getCore().getModel("objectModel").getData().LRF_Master_ID;
            var sRequestUrl = sServiceUrl + sEntitySet + "(guid'" + sEntityKey +"')";
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
                    MessageBox.success("Successfully Returned LRF");
					location.reload();
                },
                error: function (oError) {
                    console.error("PATCH request failed: " + oError.responseText);
                    alert(oError.responseText);
                }
            });
		},
		onEdit: function(){
			window.open(`https://port4004-workspaces-ws-7mhdt.ap11.applicationstudio.cloud.sap/project_lnc/webapp/index.html#/importlrf/${cc1}/None`);
		}
	});
});