using app.logistics from '../db/logistics1';
using { PODetails } from './external/PODetails.csn';
using app.CdsViews from '../db/CDSViews';
using db.customLogistics from '../db/customsLogistics';

service Logistics_Service  
  
   {
    entity per_Adani_Logistics_LRF_Master 
      as projection on CdsViews.per_Adani_Logistics_LRF_Master;
     entity PAdani_Logistics_Packing_Doc as projection on CdsViews.PAdani_Logistics_Packing_Doc;
     entity PAdani_Logistics_Material_Desc as projection on CdsViews.PAdani_Logistics_Material_Desc;
     entity PAdani_Logistics_Check_List as projection on CdsViews.PAdani_Logistics_Check_List;
     entity PAdani_Logistics_Draft as projection on CdsViews.PAdani_Logistics_Draft;
     entity PAdani_Logistics_Final as projection on CdsViews.PAdani_Logistics_Final;
    
     entity PAdani_Logistics_Delivery_Details as projection on CdsViews.PAdani_Logistics_Delivery_Details;
     entity PAdani_Logistics_FF_Ship_Details as projection on CdsViews.PAdani_Logistics_FF_Ship_Details;
     entity PAdani_Logistics_FF_Doc_Upload as projection on CdsViews.PAdani_Logistics_FF_Doc_Upload;
     entity PAdani_CHA_Document_upload as projection on CdsViews.PAdani_CHA_Document_upload;
    //Customs Service
    entity Customs_Duty_Advice as projection on CdsViews.Customs_Duty_Advice;
    entity Terminal_handler_charges as projection on CdsViews.Terminal_handler_charges;
   
    entity PODetailsSercive as select from PODetails.PODetailsSet{
        Ponumber,
        Vendormail,
        Vendoraddress,
       Vendorname,
       Poinco,
        Importer,
        Vendorcountry
     };
     entity CountryList as projection on CdsViews.MobileCountryList;
     entity Project as projection on CdsViews.Project;
     entity MobileCountryList as projection on CdsViews.MobileCountryList;
     entity CHA_List as projection on CdsViews.CHA_List;
     entity VehicleTypeName as projection on CdsViews.VehicleTypeName;
     entity Email_List as projection on CdsViews.Email_List;
     entity PortList as projection on CdsViews.PortList;
     entity IncoTerms as projection on CdsViews.IncoTerms;
     entity DocumentsType as projection on CdsViews.DocumentsType;

     //Role Service
     entity Users as projection on CdsViews.Users;
     entity UserRoleSet as projection on customLogistics.UserRoleSet;
     entity MPLLogisticsUsers as projection on CdsViews.MPLLogisticsUsers;
     entity FrightForwaderUsers as projection on CdsViews.FrightForwaderUsers;
     entity CHAgentUsers as projection on CdsViews.CHAgentUsers;
     entity Configuration @(Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: false},
        DeleteRestrictions: {Deletable: false},
        FilterRestrictions: {Filterable: false}
    },)as projection on CdsViews.Configuration;
}

