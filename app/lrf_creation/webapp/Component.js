/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "projectlnc/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("projectlnc.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(new sap.ui.model.json.JSONModel() , "lrf_data");
                this.setModel(new sap.ui.model.json.JSONModel() , "lrf");
               // this.setModel(new sap.ui.model.odata.ODataModel('https://port4004-workspaces-ws-7mhdt.ap11.applicationstudio.cloud.sap/odata/v4/logistics-', true));


                this.setModel(new sap.ui.model.json.JSONModel({"items":[]}) , "materials");

                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
                document.head.appendChild(jQueryScript);
            
            
                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
                document.head.appendChild(jQueryScript);
            }
        });
    }
);