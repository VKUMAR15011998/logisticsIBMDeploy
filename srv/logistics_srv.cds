using app.logistics from '../db/logistics1';
using { PODetails } from './external/PODetails';

service Logistics_Service {
    
    // @odata.draft.enabled //Enable Draft
     @cds.redirection.target
     entity Get_Adani_Logistics_LRF_Master as projection on logistics.Adani_Logistics_LRF_Master;
     @insertonly entity Insert_Adani_Logistics_LRF_Master as projection on logistics.Adani_Logistics_LRF_Master;
     @updateonly entity Update_Adani_Logistics_LRF_Master as projection on logistics.Adani_Logistics_LRF_Master;
     entity Adani_Logistics_Packing_Doc as projection on logistics.Adani_Logistics_Packing_Doc;
     entity Adani_Logistics_Material_Desc as projection on logistics.Adani_Logistics_Material_Desc;
     entity Adani_Logistics_Check_List as projection on logistics.Adani_Logistics_Check_List;
     entity Adani_Logistics_Draft as projection on logistics.Adani_Logistics_Draft;
     entity Adani_Logistics_Final as projection on logistics.Adani_Logistics_Final;
     entity Adani_Logistics_Approval as projection on logistics.Adani_Logistics_Approval;
     entity Adani_Logistics_Delivery_Details as projection on logistics.Adani_Logistics_Delivery_Details;
     entity Adani_Logistics_FF_Ship_Details as projection on logistics.Adani_Logistics_FF_Ship_Details;
     entity Adani_Logistics_FF_Doc_Upload as projection on logistics.Adani_Logistics_FF_Doc_Upload;
    
     entity per_Adani_Logistics_LRF_Master as projection on logistics.per_Adani_Logistics_LRF_Master;
     entity PAdani_Logistics_Packing_Doc as projection on logistics.PAdani_Logistics_Packing_Doc;
     entity PAdani_Logistics_Material_Desc as projection on logistics.PAdani_Logistics_Material_Desc;
     entity PAdani_Logistics_Check_List as projection on logistics.PAdani_Logistics_Check_List;
     entity PAdani_Logistics_Draft as projection on logistics.PAdani_Logistics_Draft;
     entity PAdani_Logistics_Final as projection on logistics.PAdani_Logistics_Final;
     entity PAdani_Logistics_Approval as projection on logistics.PAdani_Logistics_Approval;
     entity PAdani_Logistics_Delivery_Details as projection on logistics.PAdani_Logistics_Delivery_Details;
     entity PAdani_Logistics_FF_Ship_Details as projection on logistics.PAdani_Logistics_FF_Ship_Details;
     entity PAdani_Logistics_FF_Doc_Upload as projection on logistics.PAdani_Logistics_FF_Doc_Upload;

    entity LrfTracker2 as projection on logistics.LrfTracker2; 
    @cds.redirection.target
    entity LrfTracker3 as projection on  logistics.LrfTracker3;
    entity PODetailsSercive as select from PODetails.PODetailsSet{
        Ponumber,
        Vendormail,
        Vendoraddress,
       
        Importer,
        Vendorcountry
     };
     //entity PODetailsSercive as projection on logistics.PODetailsSercive;
   @open
    
    
   function LrfTracker() returns array of String;
   function myFunctionImport() returns String;
}

