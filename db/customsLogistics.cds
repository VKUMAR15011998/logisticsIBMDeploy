namespace db.customLogistics;

using {app.logistics } from './logistics1';
using {
    cuid,
    managed,
    User
} from '@sap/cds/common';

entity  Customs_Duty_Advice:managed{
    key LRF_Customs_ID     :      UUID @Core.Computed;
    Request_No:String @(title: 'Request Number');
    
    DPR_Request_Date : Date @(title: 'DPR Request Date');
    BCD: Decimal(10, 2) @(title: 'Basic Custom Duty (BCD)');
    SWS: Decimal(10, 2) @(title: 'Social Welfare Surcharge (SWS)');
    IGST: Decimal(10, 2) @(title: 'Integrated Goods and Services Tax (IGST)');
    Additional_Custom_Duty: Decimal(10, 2) @(title: 'Additional Custom Duty');
    Others1: Decimal(10, 2) ;
    Others2: Decimal(10, 2) ;
    Others3: Decimal(10, 2) ;
    Olabel1: String ;
    Olabel2: String ;
    Olabel3: String ;
    CDASubmit:String;
    Total: Decimal(11, 2) ;
    UTR_No: String @(title: 'UTR No.');
    UTR_Amount: Decimal(11, 2) @(title: 'UTR Amount');
    UTR_Date: Date @(title: 'UTR Date');
    DPR_No: String @(title: 'DPR No');
    DPR_Date: Date @(title: 'DPR Date');
    per_Adani_Logistics_LRF_Master : Association to one logistics.per_Adani_Logistics_LRF_Master;
}

entity  Terminal_handler_charges:managed{
    key LRF_Customs_ID     :      UUID @Core.Computed;
    Request_No:String @(title: 'Request Number');
    FI_THC: Decimal(10,2) @(title: 'Forwarders Invoice THC and DO Charges');
    CFS_Charges: Decimal(10,2) @(title: 'CFS Charge');
    LIFT_OFF_CHARGES: Decimal(10,2)  @(title: 'LIFT OFF CHARGES');
    Others1: Decimal(10,2)  ;
    Others2: Decimal(10,2)  ;
    Others3: Decimal(10,2) ;
    Olabel1: String ;
    Olabel2: String ;
    Olabel3: String ;
    Total: Decimal(11,2);
    THCSubmit:String;
    UTR_No: String @(title: 'UTR_No.');
    UTR_Amount: Decimal(11,2) @(title: 'UTR Amount');
    UTR_Date: Date @(title: 'UTR Date');
    DPR_No: String @(title: 'DPR No');
    DPR_Date: Date @(title: 'DPR Date');
    per_Adani_Logistics_LRF_Master : Association to one logistics.per_Adani_Logistics_LRF_Master;
}
entity Project  {
    key ProjectID: UUID @Core.Computed;
    Project_Name:String(20) @(title: 'Project Name');
}
entity PortList{
    key Sr_Number: Integer @(title: 'Sr No');
    Country:String(50);
    Location:String;
    ISO3:String(10);
    UDF_1:String(10) @(title: 'UDF-1');
    UDF_2:String(10) @(title: 'UDF-2');
    Latitude:Decimal(25,20);
    Longitude:Decimal(25,20);
    Type:String(20);
    Region:String;
    UN_LOCODE:String(10);
}
entity MobileCountryList{
    key name:String(200) @(title: 'Country Name');
    dial_code:String(40) @(title: 'Dial Code');
    code:String(10);
}
entity CHA_List{
    key CHA_Loc_Id:UUID @Core.Computed;
    CHA_List_Location:String(50);
}
entity Email_List{
    key Email_ID:String(30);
    name:String(20);
}
entity VehicleTypeName{
    key vehicle_ID:UUID @Core.Computed;
     VehicleType:String(30);
}
entity IncoTerms{
    key IncoName:String(100);
}
entity DocumentsType{
    key DocumentsName:String(100);
}
//USER ROLES
entity Configuration : managed {
    key configElement : String;
        configValue1  : String;
        configValue2  : String;
        configValue3  : String;
        configValue4  : String;
}
entity UserSet : managed {
    key userid       : String;
        firstName    : String;
        lastName     : String;
        middleName   : String;
        email        : String;
        address      : String;
        state        : String;
        country      : String;
        pinCode      : String;
        phNumber     : String;
        mobNumber    : String;
        altPhNumber  : String;
        isPortalUser : Boolean;
        createdAt    : Timestamp  @cds.on.insert: $now;
        createdBy    : User       @cds.on.insert: $user;
        modifiedAt   : Timestamp  @cds.on.insert: $now   @cds.on.update: $now;
        modifiedBy   : User       @cds.on.insert: $user  @cds.on.update: $user;
        linkToRole   : Association to UserRoleSet
                        on linkToRole.userid = userid;
}

entity UserRoleSet : managed {
    key userid : String;
    key role   : String;
}
entity InsurancePolicy:managed{
    key InsPol_Id:UUID @Core.Computed;
    Serial_Number: String @(title: 'Sr Number');
    Ploicy_Number:String @(title: 'Policy Number');
    Company_Name:String @(title: 'Company Name');
    Exp_date:Date @(title: 'Exp Date');
    per_Adani_Logistics_LRF_Master : Association to one logistics.per_Adani_Logistics_LRF_Master;
}
entity TransporterDetails:managed{
  key  TransporterID  :UUID @Core.Computed;
  TSubmit:String;
Transporter_Name : String @(title: 'Transporter Name');
Invoice_No: String @(title: 'Invoice No.');
Loading_Point: String@(title: 'Loading Point');
Delivery_Point : String@(title: 'Delivery Point ');
Material: String@(title: 'Material');
CONT_Cargo_Weight: String@(title: 'CONT SIZE/ Cargo Weight');
Container_No: String@(title: 'Container No. ');
Vehicle_No : String@(title: 'Vehicle No.');
Eway_Bill_No : String@(title: 'Eway Bill No. ');
Sales_Order_No: String@(title: 'Sales order no ');
DO_Number : String@(title: 'DO Number');
DO_Expiry_date:Date@(title: 'DO Expiry date');
DO_Date : Date@(title: 'DO_Date');
Free_D_End_Date: Date@(title: 'Free Detention End Date');
Date_Dispatch_date: Date@(title: 'Date of dispatch of goods from port/ ICD');
Receipt_at_Site: Date@(title: 'Receipt at Site ');
Date_unloading: Date@(title: 'Date of unloading ');
Container_Ret_date : Date@(title: 'Container returned on');
Status : String@(title: 'Status');
Remark_LR: String@(title: 'Remark / LR No.');
 per_Adani_Logistics_LRF_Master : Association to one logistics.per_Adani_Logistics_LRF_Master;
}
entity DocumentsConfig{
    key DocID:UUID @Core.Computed;
    SrNo:String ;
    DocType:String ;
    App_Need:Boolean @(title: 'Approval_needed');
}