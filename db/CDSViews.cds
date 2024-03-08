namespace app.CdsViews;
using app.logistics from '../db/logistics1';

define view![per_Adani_Logistics_LRF_Master] as 
    select * from logistics.per_Adani_Logistics_LRF_Master;
define view![PAdani_Logistics_Packing_Doc] as 
    select * from logistics.PAdani_Logistics_Packing_Doc;
define view![PAdani_Logistics_Material_Desc] as 
    select * from logistics.PAdani_Logistics_Material_Desc;
define view![PAdani_Logistics_Draft] as 
    select * from logistics.PAdani_Logistics_Draft;
define view![PAdani_Logistics_Final] as 
    select * from logistics.PAdani_Logistics_Final;
define view![PAdani_Logistics_Delivery_Details] as 
    select * from logistics.PAdani_Logistics_Delivery_Details;
define view![PAdani_Logistics_FF_Ship_Details] as 
    select * from logistics.PAdani_Logistics_FF_Ship_Details;
define view![PAdani_Logistics_FF_Doc_Upload] as 
    select * from logistics.PAdani_Logistics_FF_Doc_Upload;
define view![PAdani_Logistics_Check_List] as 
    select * from logistics.PAdani_Logistics_Check_List;