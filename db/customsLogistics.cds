namespace db.customLogistics;

using {app.logistics } from './logistics1';
using {
    cuid,
    managed,
    User
} from '@sap/cds/common';

entity  Customs_Duty_Advice{
    key LRF_Customs_ID     :      UUID @Core.Computed;
    BOE_No : String @(title: 'BOE No');
BOE_Date : Date @(title: 'BOE Date');
OBL_Dispatch: Date @(title: 'OBL Dispatch Date  (Shipper/FF)');
OBL_Received_MPL: Date @(title: 'OBL Received by MPL Date');
OBL_CourierCHA: Date @(title: 'OBL Courier-to-CHA Date');
OBL_Receipt_CHA: Date @(title: 'OBL Receipt by CHA Date:');
Custom_Out_Charge: Date @(title: 'Custom Out of Charge Date');
DO_received_Shipping: Date @(title: 'Date of DO received from Shipping Line');
Container_Mvmt_No: String @(title: 'Container Mvmt Bond No');
Checklist_Approval_Status: String @(title: 'Checklist Approval Status (by MPL)');
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

entity  Terminal_handler_charges{
    key LRF_Customs_ID     :      UUID @Core.Computed;
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
    key PortID: UUID @Core.Computed;
    Port_Name:String(20) @(title: 'Port Name');
}
entity MobileCountryList{
    key name:String(40) @(title: 'Country Name');
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
    key VehicleType:String(30);
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