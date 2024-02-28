sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
	"use strict";
	return BlockBase.extend("lrftracker.view.blocks.MatInfoBlock", {
		metadata: {
			onBindingChange: function(oEvent) {
				this.getView().byId("myTable").setVisibleRowCount(oEvent.getSource().getLength());
			}
		},
		
	});
});
