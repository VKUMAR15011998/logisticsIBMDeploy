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
    PaymentClearDoc:String(40) @(title: 'Payment Clearing Doc');
    PaymentClearDate:Date @(title: 'Payment Clearing Date');
    ChallanNo:String(40) @(title: 'Challan No');
    ChallanDate:Date @(title: 'ChallanN Date');
    DPR_Request_Date : Date @(title: 'DPR Request Date');
    Assessable_value: Decimal(10, 2) @(title: 'Assessable Value');
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
    DSL: Decimal(10,2) @(title: 'Destination Shipping Line Charges');
    DPD: Decimal(10,2) @(title: 'DPD Charges');
    EXIM: Decimal(10,2)  @(title: 'EXIM Yard Charges');
    Detention_Charge: Decimal(10,2)  @(title: 'Detention Charges');
    Ground_Rent: Decimal(10,2)  @(title: 'Ground Rent / Storage Charges');
    Container_DMG: Decimal(10,2)  @(title: 'Container Damage Charges');
    Insurance_Charge: Decimal(10,2)  @(title: 'Insurance Charges');
    PaymentClearDoc:String(40) @(title: 'Payment Clearing Doc');
    PaymentClearDate:Date @(title: 'Payment Clearing Date');
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
key Transporter_Code: String @(title: 'Transporter Code');
key TransBL_No: String @(title: 'BL No.');
TransBOE_No: String @(title: 'BOE No.');
Invoice_No: String @(title: 'Invoice No.');
Loading_Point: String@(title: 'Loading Point');
Delivery_Point : String@(title: 'Delivery Point ');
Material: String@(title: 'Material');
CONT_Cargo_Weight: String@(title: 'CONT SIZE/ Cargo Weight');
Container_No: String@(title: 'Container No. ');
key Vehicle_No : String@(title: 'Vehicle No.');
key Eway_Bill_No : String@(title: 'Eway Bill No. ');
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
}
entity DocumentsConfig{
    key DocID:UUID @Core.Computed;
    SrNo:String ;
    DocType:String ;
    App_Need:Boolean @(title: 'Approval_needed');
}

entity TransporterAssign{
    TransID: UUID @Core.Computed;
    Transporter_Name: String;
    key Transporter_Code: String;
    key LRF_ID : Association to one logistics.per_Adani_Logistics_LRF_Master;
}