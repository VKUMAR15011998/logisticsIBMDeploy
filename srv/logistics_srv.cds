using app.logistics from '../db/logistics1';
using {PODetails} from './external/PODetails';
using {userdetails} from './external/userdetails';
using app.CdsViews from '../db/CDSViews';
using db.customLogistics from '../db/customsLogistics';
using {ZMM_CDS_C_PO_VH_CDS_SRV as external} from './external/ZMM_CDS_C_PO_VH_CDS_SRV';

service Logistics_Service @(path: '/logistics')

{
  //   @(restrict: [
  //    { grant: '*',to: 'MPL-LOGISTICS', where: 'LogisticsMPL_AssignEmail_Id = $user' },
  //    { grant: '*',to: 'FREIGHT-FORWADOR', where: 'FF_AssignEmail_Id = $user' },
  //     { grant: '*',to: 'CH-AGENT', where: 'CHA_AssignEmail_Id = $user' },
  //     { grant: '*',to: 'LOGISTICS-SUPER'}
  // ])
  entity per_Adani_Logistics_LRF_Master    as projection on CdsViews.per_Adani_Logistics_LRF_Master;
  entity PAdani_Logistics_Packing_Doc      as projection on CdsViews.PAdani_Logistics_Packing_Doc;
  entity PAdani_Logistics_Material_Desc    as projection on CdsViews.PAdani_Logistics_Material_Desc;
  entity PAdani_Logistics_Check_List       as projection on CdsViews.PAdani_Logistics_Check_List;
  entity PAdani_Logistics_Draft            as projection on CdsViews.PAdani_Logistics_Draft;
  entity PAdani_Logistics_Final            as projection on CdsViews.PAdani_Logistics_Final;
  entity PAdani_Logistics_Delivery_Details as projection on CdsViews.PAdani_Logistics_Delivery_Details;
  entity PAdani_Logistics_FF_Ship_Details  as projection on CdsViews.PAdani_Logistics_FF_Ship_Details;
  entity PAdani_Logistics_FF_Doc_Upload    as projection on CdsViews.PAdani_Logistics_FF_Doc_Upload;
  entity PAdani_CHA_Document_upload        as projection on CdsViews.PAdani_CHA_Document_upload;
  //Customs Service
  entity Customs_Duty_Advice               as projection on CdsViews.Customs_Duty_Advice;
  entity Terminal_handler_charges          as projection on CdsViews.Terminal_handler_charges;
  entity InsurancePolicy                   as projection on CdsViews.InsurancePolicy;
  entity DocumentsConfig                   as projection on CdsViews.DocumentsConfig;

  entity Customs_Duty_Advice_Join          as
    projection on CdsViews.Customs_Duty_Advice_Join {
      key LRF_Customs_ID,
          Request_No,
          PaymentClearDoc,
          PaymentClearDate,
          DPR_Request_Date,
          ChallanDate,
          ChallanNo,
          Assessable_value,
          BCD,
          Importer,
          SWS,
          IGST,
          Additional_Custom_Duty,
          Others1,
          Others2,
          Others3,
          Olabel1,
          Olabel2,
          Olabel3,
          CDASubmit,
          Total,
          UTR_No,
          UTR_Amount,
          UTR_Date,
          DPR_No,
          DPR_Date,
          per_Adani_Logistics_LRF_Master,
          Lrf_No,
          Supplier,
          BL_No,
          BL_Date,
          Vessel_No,
          FF_Name,
          To,
          From_Vessel,
          Shipment_Ref,
          Cargo_Description
    };

  entity Terminal_handler_charges_Join     as
    projection on CdsViews.Terminal_handler_charges_Join {
      key LRF_Customs_ID,
          Request_No,
          DSL,
          DPD,
          EXIM,
          Detention_Charge,
          Ground_Rent,
          Container_DMG,
          Insurance_Charge,
          PaymentClearDoc,
          PaymentClearDate,
          Others1,
          Others2,
          Others3,
          Olabel1,
          Olabel2,
          Olabel3,
          Total,
          THCSubmit,
          Importer,
          UTR_No,
          UTR_Amount,
          UTR_Date,
          DPR_No,
          DPR_Date,
          per_Adani_Logistics_LRF_Master,
          Lrf_No,
          Supplier,
          BL_No,
          BL_Date,
          Vessel_No,
          FF_Name,
          To,
          From_Vessel,
          Shipment_Ref,
          Cargo_Description
    };

  entity Transporter_Details_Join          as
    projection on CdsViews.Transporter_Details_Join {
          Transporter_Name,
      key Transporter_Code,
          LRF_Master_ID,
          BL_No,
          BOE_No,
      key Lrf_No,
      key SrNo,
          Invoice_No,
          Loading_Point,
          Delivery_Point,
          Material,
          CONT_Cargo_Weight,
          Container_No,
          Vehicle_No,
          Eway_Bill_No,
          Sales_Order_No,
          DO_Number,
          DO_Expiry_date,
          DO_Date,
          Free_D_End_Date,
          Date_Dispatch_date,
          Receipt_at_Site,
          Date_unloading,
          Container_Ret_date,
          Status,
          Remark_LR
    }

  entity PODetailsSercive                  as
    projection on PODetails.PODetailsSet {
      Ponumber,
      Vendormail,
      Vendoraddress,
      Vendorname,
      Poinco,
      Importer,
      Vendorcountry
    };
entity BillTrackSet                                           as
        projection on PODetails.PODetailsSet {
            *
        };

  entity DPR_Data_SRV                      as
    select from PODetails.DPRDataSet {
      Dprnumber,
      Dprdate,
      Paymentclearingdate,
      Paymentclearingdoc,
      Fiscalyear,
      Reference,
      Utramount,
      Utrdate,
      Utrno,
    };

  @cds.persistence.skip
  @cds.Search: {Vendorcode}
  entity VendorHelp                        as
    projection on external.VendorHelpSet {
      @title                      : 'Vendor Code'
      @Search.defaultSearchElement: true
      Vendorcode,
      @title                      : 'Vendor Name'
      Vendorname
    };

  entity CountryList                       as projection on CdsViews.MobileCountryList;
  entity Project                           as projection on CdsViews.Project;
  entity MobileCountryList                 as projection on CdsViews.MobileCountryList;
  entity CHA_List                          as projection on CdsViews.CHA_List;
  entity VehicleTypeName                   as projection on CdsViews.VehicleTypeName;
  entity Email_List                        as projection on CdsViews.Email_List;
  entity PortList                          as projection on CdsViews.PortList;
  entity IncoTerms                         as projection on CdsViews.IncoTerms;
  entity DocumentsType                     as projection on CdsViews.DocumentsType;
  entity TransporterDetails                as projection on CdsViews.TransporterDetails;
  entity TransporterAssign                 as projection on CdsViews.TransporterAssign;

  //Role Service

  //entity Users as projection on CdsViews.Users;
  //entity UserRoleSet as projection on customLogistics.UserRoleSet;
  // entity MPLLogisticsUsers as projection on CdsViews.MPLLogisticsUsers;
  // entity FrightForwaderUsers as projection on CdsViews.FrightForwaderUsers;
  //  entity CHAgentUsers as projection on CdsViews.CHAgentUsers;
  //  entity Configuration @(Capabilities: {
  //     InsertRestrictions: {Insertable: false},
  //     UpdateRestrictions: {Updatable: false},
  //     DeleteRestrictions: {Deletable: false},
  //     FilterRestrictions: {Filterable: false}
  // },)as projection on CdsViews.Configuration;

  entity Configuration                     as
    select from userdetails.Configuration {
      ConfigElement,
      ConfigValue1,
      ConfigValue2,
      ConfigValue3,
      ConfigValue4
    };

  entity LoginUsers                        as
    select from userdetails.LoginUser {
      key userName,
          email,
          firstName,
          lastName,
          vendorCode,
          middleName,
          address,
          state,
          country,
          pinCode,
          phNumber,
          mobNumber,
          altPhNumber,
          servicerole,
          dbrole
    }

  entity USERS                             as
    select from userdetails.Users {
      UserId,
      FirstName,
      LastName,
      MiddleName,
      UserName,
      Email,
      Address,
      State,
      Country,
      PinCode,
      PhoneNumber,
      MobileNumber,
      AlternatePhoneNumber,
      isPortalUser,
      LinkToRole
    }

  entity CHAgentUsers                      as projection on userdetails.UserRoleSet;

  @cds.redirection.target
  entity MPLLogisticsUsers                 as projection on userdetails.UserRoleSet;

  entity MPLCustomsUsers                   as projection on userdetails.UserRoleSet;
  entity FrightForwaderUsers               as projection on userdetails.UserRoleSet;
  function getIASUsers()  returns String;
  function getIASGroups() returns String;
//function getUserRoles(Role:String) returns String;
}
