namespace app.CdsViews;
using app.logistics from '../db/logistics1';
using  db.customLogistics  from './customsLogistics';

define view![per_Adani_Logistics_LRF_Master] as 
    select * from logistics.per_Adani_Logistics_LRF_Master;
define view![PAdani_Logistics_Packing_Doc] as 
    select * from logistics.PAdani_Logistics_Packing_Doc;
define view![PAdani_Logistics_Material_Desc] as 
    select * from logistics.PAdani_Logistics_Material_Desc;
define view![PAdani_Logistics_Draft] as 
    select * from logistics.PAdani_Logistics_Draft;
define view![PAdani_CHA_Document_upload] as 
    select * from logistics.PAdani_CHA_Document_upload;
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
define view![Customs_Duty_Advice] as 
    select * from customLogistics.Customs_Duty_Advice;
define view![Customs_Duty_Advice_Join] as 
    select  
        CDA.*, 
        LRF.Lrf_No, 
        LRF.Supplier, 
        LRF.BL_No, 
        LRF.BL_Date, 
        LRF.Vessel_No, 
        LRF.FF_Name, 
        LRF.To, 
        LRF.From_Vessel, 
        LRF.Shipment_Ref,
        LRF.Cargo_Description,
        LRF.Importer
    from 
        customLogistics.Customs_Duty_Advice as CDA
    left outer join 
        per_Adani_Logistics_LRF_Master as LRF 
    on 
        CDA.per_Adani_Logistics_LRF_Master.LRF_Master_ID = LRF.LRF_Master_ID;
define view![Terminal_handler_charges] as 
    select * from customLogistics.Terminal_handler_charges;
define view![Terminal_handler_charges_Join] as 
    select THC.*,LRF.Lrf_No,LRF.Supplier,LRF.BL_No,LRF.BL_Date,LRF.Vessel_No,LRF.FF_Name,LRF.To,LRF.From_Vessel,LRF.Shipment_Ref,
    LRF.Cargo_Description,LRF.Importer
     from customLogistics.Terminal_handler_charges
    as THC left outer join per_Adani_Logistics_LRF_Master  as LRF on
    THC.per_Adani_Logistics_LRF_Master.LRF_Master_ID=LRF.LRF_Master_ID;
define view![Transporter_Details_Join] as 
    select TD.Transporter_Name,TD.Transporter_Code,FFS.BL_No,LRF.Lrf_No,LRF.LRF_Master_ID,LRF.BOE_No,DSR.SrNo,DSR.Invoice_No,
          DSR.Loading_Point,
          DSR.Delivery_Point,
         DSR.Material,
          DSR.CONT_Cargo_Weight,
         DSR.Container_No,
          DSR.Vehicle_No,
          DSR.Eway_Bill_No,
          DSR.Sales_Order_No,
          DSR.DO_Number,
          DSR.DO_Expiry_date,
          DSR.DO_Date,
          DSR.Free_D_End_Date,
          DSR.Date_Dispatch_date,
          DSR.Receipt_at_Site,
          DSR.Date_unloading,
          DSR.Container_Ret_date,
          DSR.Status,
          DSR.Remark_LR

     from customLogistics.TransporterAssign
    as TD left outer join per_Adani_Logistics_LRF_Master  as LRF on
    TD.per_Adani_Logistics_LRF_Master.LRF_Master_ID =LRF.LRF_Master_ID 
    left outer join logistics.PAdani_Logistics_FF_Ship_Details as FFS on
    FFS.per_Adani_Logistics_LRF_Master.LRF_Master_ID =LRF.LRF_Master_ID
    left outer join customLogistics.TransporterDetails as DSR on
    DSR.LRF_Master_ID =TD.per_Adani_Logistics_LRF_Master.LRF_Master_ID 
    and DSR.Transporter_Code=TD.Transporter_Code;
define view![Project] as 
    select * from customLogistics.Project;
define view![PortList] as 
    select * from customLogistics.PortList;
define view![MobileCountryList] as 
    select * from customLogistics.MobileCountryList;
define view![CHA_List] as 
    select * from customLogistics.CHA_List;
define view![Email_List] as 
    select * from customLogistics.Email_List;
define view![VehicleTypeName] as 
    select * from customLogistics.VehicleTypeName;
define view![IncoTerms] as 
    select * from customLogistics.IncoTerms;
define view![InsurancePolicy] as 
    select * from customLogistics.InsurancePolicy;
define view![DocumentsType] as 
    select * from customLogistics.DocumentsType;
define view![TransporterDetails] as 
    select * from customLogistics.TransporterDetails;

define view![TransporterAssign] as 
    select * from customLogistics.TransporterAssign;
define view![DocumentsConfig] as 
    select * from customLogistics.DocumentsConfig;
 define view Users as
        select from customLogistics.UserSet as u {
            key u.userid       as UserId,
                u.firstName    as FirstName,
                u.lastName     as LastName,
                u.middleName   as MiddleName,
                CONCAT(
                    concat(
                        COALESCE(
                            u.firstName, ''
                        ), concat(
                            ' ', COALESCE(
                                u.middleName, ''
                            )
                        )
                    ), CONCAT(
                        ' ', COALESCE(
                            u.lastName, ''
                        )
                    )
                )              as UserName : String,
                u.email        as Email,
                u.address      as Address,
                u.state        as State,
                u.country      as Country,
                u.pinCode      as PinCode,
                u.phNumber     as PhoneNumber,
                u.mobNumber    as MobileNumber,
                u.altPhNumber  as AlternatePhoneNumber,
                u.isPortalUser as isPortalUser,
                u.linkToRole   as LinkToRole
        };
define view ![MPLLogisticsUsers] as
        select from Users as u {
            key u.UserId               as UserId,
                u.FirstName            as FirstName,
                u.LastName             as LastName,
                u.MiddleName           as MiddleName,
                u.UserName             as UserName : String,
                u.Email                as Email,
                u.Address              as Address,
                u.State                as State,
                u.Country              as Country,
                u.PinCode              as PinCode,
                u.PhoneNumber          as PhoneNumber,
                u.MobileNumber         as MobileNumber,
                u.AlternatePhoneNumber as AlternatePhoneNumber,
                u.LinkToRole           as LinkToRole
        }
        where
            u.LinkToRole.role = 'MPL Logistics';

define view ![MPLCustomsUsers] as
        select from Users as u {
            key u.UserId               as UserId,
                u.FirstName            as FirstName,
                u.LastName             as LastName,
                u.MiddleName           as MiddleName,
                u.UserName             as UserName : String,
                u.Email                as Email,
                u.Address              as Address,
                u.State                as State,
                u.Country              as Country,
                u.PinCode              as PinCode,
                u.PhoneNumber          as PhoneNumber,
                u.MobileNumber         as MobileNumber,
                u.AlternatePhoneNumber as AlternatePhoneNumber,
                u.LinkToRole           as LinkToRole
        }
        where
            u.LinkToRole.role = 'MPL Customs';
define view ![FrightForwaderUsers] as
        select from Users as u {
            key u.UserId               as UserId,
                u.FirstName            as FirstName,
                u.LastName             as LastName,
                u.MiddleName           as MiddleName,
                u.UserName             as UserName : String,
                u.Email                as Email,
                u.Address              as Address,
                u.State                as State,
                u.Country              as Country,
                u.PinCode              as PinCode,
                u.PhoneNumber          as PhoneNumber,
                u.MobileNumber         as MobileNumber,
                u.AlternatePhoneNumber as AlternatePhoneNumber,
                u.LinkToRole           as LinkToRole
        }
        where
            u.LinkToRole.role = 'Freight Forwador';
define view ![CHAgentUsers] as
        select from Users as u {
            key u.UserId               as UserId,
                u.FirstName            as FirstName,
                u.LastName             as LastName,
                u.MiddleName           as MiddleName,
                u.UserName             as UserName : String,
                u.Email                as Email,
                u.Address              as Address,
                u.State                as State,
                u.Country              as Country,
                u.PinCode              as PinCode,
                u.PhoneNumber          as PhoneNumber,
                u.MobileNumber         as MobileNumber,
                u.AlternatePhoneNumber as AlternatePhoneNumber,
                u.LinkToRole           as LinkToRole
        }
        where
            u.LinkToRole.role = 'CH Agent';
view Configuration as
        select from customLogistics.Configuration as u {
            key u.configElement as ConfigElement,
                u.configValue1  as ConfigValue1,
                u.configValue2  as ConfigValue2,
                u.configValue3  as ConfigValue3,
                u.configValue4  as ConfigValue4
        };