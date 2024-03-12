namespace db.customLogistics;
using {app.logistics } from './logistics1';

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
BCD: Decimal(6, 2) @(title: 'Basic Custom Duty (BCD)');
SWS: Decimal(6, 2) @(title: 'Social Welfare Surcharge (SWS)');
IGST: Decimal(6, 2) @(title: 'Integrated Goods and Services Tax (IGST)');
Additional_Custom_Duty: Decimal(6, 2) @(title: 'Additional Custom Duty');
Others1: Decimal(6, 2) ;
Others2: Decimal(6, 2) ;
Others3: Decimal(6, 2) ;
Olabel1: String ;
Olabel2: String ;
Olabel3: String ;
CDASubmit:String;
Total: Decimal(6, 2) ;
UTR_No: String @(title: 'UTR No.');
UTR_Amount: Decimal(6, 2) @(title: 'UTR Amount');
UTR_Date: Date @(title: 'UTR Date');
DPR_No: String @(title: 'DPR No');
DPR_Date: Date @(title: 'DPR Date');
per_Adani_Logistics_LRF_Master : Association to one logistics.per_Adani_Logistics_LRF_Master;
}

entity  Terminal_handler_charges{
    key LRF_Customs_ID     :      UUID @Core.Computed;
 FI_THC: Decimal(6,2) @(title: 'Forwarders Invoice THC and DO Charges');
CFS_Charges: Decimal(6,2) @(title: 'CFS Charge');
LIFT_OFF_CHARGES: Decimal(6,2)  @(title: 'LIFT OFF CHARGES');
Others1: Decimal(6,2)  ;
Others2: Decimal(6,2)  ;
Others3: Decimal(6,2) ;
Olabel1: String ;
Olabel2: String ;
Olabel3: String ;
Total: Decimal(6,2);
THCSubmit:String;
UTR_No: String @(title: 'UTR_No.');
UTR_Amount: Decimal(6,2) @(title: 'UTR Amount');
UTR_Date: Date @(title: 'UTR Date');
DPR_No: String @(title: 'DPR No');
DPR_Date: Date @(title: 'DPR Date');
per_Adani_Logistics_LRF_Master : Association to one logistics.per_Adani_Logistics_LRF_Master;
}