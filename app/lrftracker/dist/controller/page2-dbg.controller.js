sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var cc,cc1;
	return Controller.extend("lrftracker.controller.page2", {
		onInit: async function() {
			var that=this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 oRouter.getRoute("page2").attachPatternMatched(this._onObjectMatched, this);
			var oModel=this.getOwnerComponent().getModel("objectModel");
			
			
		},
		onNavBack: function() {
			history.go(-1);
		},
		_onObjectMatched: function(oEvent) {
			 cc = oEvent.getParameter("arguments").LRF_Master_ID;
			
			 cc1 = oEvent.getParameter("arguments").Lrf_No;
			 
			
		},
		

	});
});