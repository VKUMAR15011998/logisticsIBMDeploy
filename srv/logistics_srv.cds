using app.logistics from '../db/logistics1';
using { PODetails } from './external/PODetails.csn';
using app.CdsViews from '../db/CDSViews';

service Logistics_Service  
   
   {
      
     
    
    entity per_Adani_Logistics_LRF_Master as projection on CdsViews.per_Adani_Logistics_LRF_Master;
     entity PAdani_Logistics_Packing_Doc as projection on CdsViews.PAdani_Logistics_Packing_Doc;
     entity PAdani_Logistics_Material_Desc as projection on CdsViews.PAdani_Logistics_Material_Desc;
     entity PAdani_Logistics_Check_List as projection on CdsViews.PAdani_Logistics_Check_List;
     entity PAdani_Logistics_Draft as projection on CdsViews.PAdani_Logistics_Draft;
     entity PAdani_Logistics_Final as projection on CdsViews.PAdani_Logistics_Final;
    
     entity PAdani_Logistics_Delivery_Details as projection on CdsViews.PAdani_Logistics_Delivery_Details;
     entity PAdani_Logistics_FF_Ship_Details as projection on CdsViews.PAdani_Logistics_FF_Ship_Details;
     entity PAdani_Logistics_FF_Doc_Upload as projection on CdsViews.PAdani_Logistics_FF_Doc_Upload;
    
   
    entity PODetailsSercive as select from PODetails.PODetailsSet{
        Ponumber,
        Vendormail,
        Vendoraddress,
       Vendorname,
       Poinco,
        Importer,
        Vendorcountry
     };
     
}

