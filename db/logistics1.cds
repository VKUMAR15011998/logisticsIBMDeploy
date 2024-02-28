namespace app.logistics;
using { PODetails } from '../srv/external/PODetails';
using {
    managed,
    cuid,
    User,
    sap.common.CodeList
} from '@sap/cds/common';


// entity PODetailsSercive as projection on PODetails.PODetailsSet {
//         Ponumber,
//         Vendormail,
//         Vendoraddress,
       
//         Importer,
//         Vendorcountry,
//      }
entity Adani_Logistics_LRF_Master : managed {
    key LRF_Master_ID      :      UUID @Core.Computed;
        Lrf_No             :      SText;
        PO_Number          :      SText;
        Ref_Lrf_No         :      SText;
        Requ_Date          :      Date default CURRENT_DATE;
        Project_ID         :      SText;
        Vendor_Name        :      SText;
        Submit_Flag        :      String(10);
        Initiator_Name     :      SText;
        Country_code       :      SText;
        Add_Country_code   :      SText;
        Mobile_No          :      SText;
        Additional_Mob     :      SText;
        Email_Id           :      SText;
        Additional_MailID  : many SText;
        Ship_ReadDate      :      Date;
        Address_radio      :      SText default 'Yes';
        Contact_radio      :      SText default 'Yes';
        Shipment_Type      :      SText;
        C20_HighCube       :      Integer default 0;
        C20_FlatRack       :      Integer default 0;
        C20_OpenTop        :      Integer default 0;
        C20_GeneralPurpose :      Integer default 0;
        C40_HighCube       :      Integer default 0;
        C40_FlatRack       :      Integer default 0;
        C40_OpenTop        :      Integer default 0;
        C40_GeneralPurpose :      Integer default 0;
        Packing_Type       : many SText;
        Origin_address     :      String(300);
        Origin_new_address :      String(300);
        Address_country    :      SText;
        Contanarised       :      SText default 'Not Contanarised';
        PO_Inco_Terms      :      SText;
        Act_Incoterms      :      SText;
        TypeOfVehicle      : many SText;
        TypeOfLoadPort     :      SText;
        NameOfDisPort      :      SText;
        DAddress_radio     :      SText default 'Yes';
        Ship_Cont_Name     :      SText;
        Ship_Cont_No       :      SText;
        Ship_Country_code  :      SText;
        Ship_Email_ID      :      SText;
        Check1             :      String default 'No';
        Check2             :      String default 'No';
        Check3             :      String default 'No';
        Check4             :      String default 'No';
        Check5             :      String default 'No';
        Check6             :      String default 'No';
        Version            :      Integer default 1;
        Approval_Status    :      Integer default 0;
        MPL_Comments       :      String default null;
        FF_Comments        :      String default null;
        CHA_Comments       :      String default null;
        MPL_Status         :      String default null;
        FF_Status          :      String default null;
        CHA_Status         :      String default null;
        AssignEmail_Id     :      String;
        To_PackingDoc      :      Composition of many Adani_Logistics_Packing_Doc
                                      on To_PackingDoc.Adani_Logistics_LRF_Master = $self;
        To_MaterialDesc    :      Composition of many Adani_Logistics_Material_Desc
                                      on To_MaterialDesc.Adani_Logistics_LRF_Master = $self;
        TotalNetWeight     :      Double default 0;
        TotalGrossWeight   :      Double default 0;
        TotalPackage       :      Integer default 0;
        To_CkeckList       :      Composition of many Adani_Logistics_Check_List
                                      on To_CkeckList.Adani_Logistics_LRF_Master = $self;
        Sp_Req             :      SText;
        Remarks            :      String;
        To_Draft           :      Composition of many Adani_Logistics_Draft
                                      on To_Draft.Adani_Logistics_LRF_Master = $self;
        To_Final           :      Composition of many Adani_Logistics_Final
                                      on To_Final.Adani_Logistics_LRF_Master = $self;
        To_Approval        :      Composition of one Adani_Logistics_Approval
                                      on To_Approval.Adani_Logistics_LRF_Master = $self;
        To_DeliveryDetails :      Composition of one Adani_Logistics_Delivery_Details
                                      on To_DeliveryDetails.Adani_Logistics_LRF_Master = $self;
        To_FF_Shipment     :      Composition of one Adani_Logistics_FF_Ship_Details
                                      on To_FF_Shipment.Adani_Logistics_LRF_Master = $self;
        To_FF_Documents    :      Composition of one Adani_Logistics_FF_Doc_Upload
                                      on To_FF_Documents.Adani_Logistics_LRF_Master = $self;
}

entity Adani_Logistics_Packing_Doc {
    key PackingID                  : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                    : LargeBinary;

        @Core.IsMediaType: true
        mediaType                  : String;

        fileName                   : String;
        url                        : String;
        Adani_Logistics_LRF_Master : Association to one Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_Material_Desc {
    key MatID                      : UUID
        @Core.Computed;
        PackageNo                  : Integer;
        HAZ_DG_Cargo               : String;
        Description                : String;
        Length                     : Integer;
        Width                      : Integer;
        Height                     : Integer;
        QtyInNumbers               : Integer;
        PerPackNetWeight           : Integer;
        PerPackGrossWeight         : Integer;
        TypeOfPacking              : String;
        VolInCBM                   : Double;
        Stackable                  : String;
        Remarks                    : String;
        Adani_Logistics_LRF_Master : Association to one Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_Check_List {
    key Check_ID                   : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                    : LargeBinary;

        @Core.IsMediaType: true
        mediaType                  : String;
        fileName                   : String;
        url                        : String;
        Adani_Logistics_LRF_Master : Association to one Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_Draft {
    key Draft_ID                   : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                    : LargeBinary;

        @Core.IsMediaType: true
        mediaType                  : String;
        fileName                   : String;
        url                        : String;
        Adani_Logistics_LRF_Master : Association to one Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_Final {
    key Final_ID                   : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                    : LargeBinary;

        @Core.IsMediaType: true
        mediaType                  : String;
        fileName                   : String;
        url                        : String;
        Adani_Logistics_LRF_Master : Association to one Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_Approval {
    key Approval_ID                : UUID
        @Core.Computed;
        FF_Email                   : SText;
        CHA_Email                  : SText;
        Logistics_Email            : SText;
        FF_Status                  : SText;
        CHA_Status                 : SText;
        logistics_Status           : SText;
        FF_Comments                : SText;
        CHA_Comments               : SText;
        Logistics_Comments         : SText;
        Adani_Logistics_LRF_Master : Association to one Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_Delivery_Details {
    key Delivery_ID                : UUID
        @Core.Computed;
        Site_Address               : String;
        DContact_Person            : String;
        DContact_No                : String;
        DEmail_ID                  : String;
        Ins_Pol_01                 : String;
        Ins_Pol_No1                : String;
        Ins_Company1               : String;
        Pol_Exp_Date1              : Date;
        Ins_Pol_02                 : String;
        Ins_Pol_No2                : String;
        Ins_Company2               : String;
        Pol_Exp_Date2              : Date;
        Ins_Pol_03                 : String;
        Ins_Pol_No3                : String;
        Ins_Company3               : String;
        Pol_Exp_Date3              : Date;
        Adani_Logistics_LRF_Master : Association to many Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_FF_Ship_Details {
    key FF_Ship_ID                 : UUID @Core.Computed;
        lines_name                 : String;
        Foriegn_Agent_Details      : String;
        Trans_Dir                  : String;
        Vessel_Name                : String;
        Ship_Mode                  : String;
        Courier_Name               : String;
        Docket_No                  : String;
        Docket_Date                : Date;
        Allocation_Date            : Date;
        BL_No                      : String;
        BL_Rel_Date                : Date;
        ETD_Plan                   : Date;
        ETA_Plan                   : Date;
        Delivery_Date              : Date;
        Arrival_Date               : Date;
        Adani_Logistics_LRF_Master : Association to many Adani_Logistics_LRF_Master;
}

entity Adani_Logistics_FF_Doc_Upload {
    key FF_DocUpload_ID            : UUID @Core.Computed;
        Uploaded_By                : String;
        FF_File_Content            : LargeBinary;
        FF_File_Type               : SText;
        FF_File_Name               : SText;
        FF_Url                     : SText;
        Adani_Logistics_LRF_Master : Association to many Adani_Logistics_LRF_Master;
}


entity per_Adani_Logistics_LRF_Master : managed {
    key LRF_Master_ID                :      UUID  @Core.Computed;
        Lrf_No                       :      SText @(title: 'LRF No');
        PO_Number                    :      SText;
        Ref_Lrf_No                   :      SText;
        Requ_Date                    :      Date default CURRENT_DATE;
        Project_ID                   :      SText;
        Vendor_Name                  :      SText;
        Submit_Flag                  :      String(10);
        Initiator_Name               :      SText;
        Country_code                 :      SText;
        Add_Country_code             :      SText;
        Mobile_No                    :      SText;
        Additional_Mob               :      SText;
        Email_Id                     :      SText;
        Additional_MailID            : many SText;
        Ship_ReadDate                :      Date;
        Address_radio                :      SText default 'Yes';
        Contact_radio                :      SText default 'Yes';
        Shipment_Type                :      SText;
        C20_HighCube                 :      Integer default 0;
        C20_FlatRack                 :      Integer default 0;
        C20_OpenTop                  :      Integer default 0;
        C20_GeneralPurpose           :      Integer default 0;
        C40_HighCube                 :      Integer default 0;
        C40_FlatRack                 :      Integer default 0;
        C40_OpenTop                  :      Integer default 0;
        C40_GeneralPurpose           :      Integer default 0;
        New_Contact_Name             :      SText;
        New_Country_code             :      SText;
        New_Mobile_No                :      SText;
        New_Email_Id                 :      SText;
        Packing_Type                 : many SText;
        Origin_address               :      String(300);
        Origin_new_address           :      String(300);
        Address_country              :      SText;
        Contanarised                 :      SText default 'Not Contanarised';
        DAddress_radio               :      SText default 'Yes';
        PO_Inco_Terms                :      SText;
        Act_Incoterms                :      SText;
        TypeOfVehicle                : many SText;
        TypeOfLoadPort               :      SText;
        NameOfDisPort                :      SText;
        Ship_Cont_Name               :      SText;
        Ship_Cont_No                 :      SText;
        Ship_Country_code            :      SText;
        Ship_Email_ID                :      SText;
        Check1                       :      String default 'No';
        Check2                       :      String default 'No';
        Check3                       :      String default 'No';
        Check4                       :      String default 'No';
        Check5                       :      String default 'No';
        Check6                       :      String default 'No';
        Version                      :      Integer default 1;
        Approval_Status              :      Integer default 0;
        LogisticsMPL_Comments        :      String default null;
        FF_Comments                  :      String default null;
        CHA_Comments                 :      String default null;
        LogisticsMPL_Status          :      String default null;
        FF_Status                    :      String default null;
        CHA_Status                   :      String default null;
        LogisticsMPL_AssignEmail_Id  :      String;
        FF_AssignEmail_Id            :      String;
        CHA_AssignEmail_Id           :      String;
        LogisticsMPL_Allocation_Date :      Date default CURRENT_DATE;
        FF_Allocation_Date           :      Date default CURRENT_DATE;
        CHA_Allocation_Date          :      Date default CURRENT_DATE;

        To_PackingDoc                :      Composition of many PAdani_Logistics_Packing_Doc
                                                on To_PackingDoc.per_Adani_Logistics_LRF_Master = $self;
        To_MaterialDesc              :      Composition of many PAdani_Logistics_Material_Desc
                                                on To_MaterialDesc.per_Adani_Logistics_LRF_Master = $self;
        TotalNetWeight               :      Double default 0;
        TotalGrossWeight             :      Double default 0;
        TotalPackage                 :      Integer default 0;
        To_CkeckList                 :      Composition of many PAdani_Logistics_Check_List
                                                on To_CkeckList.per_Adani_Logistics_LRF_Master = $self;
        Sp_Req                       :      SText;
        Remarks                      :      String;
        To_Draft                     :      Composition of many PAdani_Logistics_Draft
                                                on To_Draft.per_Adani_Logistics_LRF_Master = $self;
        To_Final                     :      Composition of many PAdani_Logistics_Final
                                                on To_Final.per_Adani_Logistics_LRF_Master = $self;
        To_Approval                  :      Composition of one PAdani_Logistics_Approval
                                                on To_Approval.per_Adani_Logistics_LRF_Master = $self;
        To_DeliveryDetails           :      Composition of one PAdani_Logistics_Delivery_Details
                                                on To_DeliveryDetails.per_Adani_Logistics_LRF_Master = $self;
        To_FF_Shipment               :      Composition of one PAdani_Logistics_FF_Ship_Details
                                                on To_FF_Shipment.per_Adani_Logistics_LRF_Master = $self;
        To_FF_Documents              :      Composition of many PAdani_Logistics_FF_Doc_Upload
                                                on To_FF_Documents.per_Adani_Logistics_LRF_Master = $self;
}

entity PAdani_Logistics_Packing_Doc {
    key PackingID                      : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                        : LargeBinary;

        @Core.IsMediaType: true
        mediaType                      : String;

        fileName                       : String;
        url                            : String;
        per_Adani_Logistics_LRF_Master : Association to one per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_Material_Desc {
    key MatID                          : UUID
        @Core.Computed;
        PackageNo                      : Integer;
        HAZ_DG_Cargo                   : String;
        Description                    : String;
        Length                         : Integer;
        Width                          : Integer;
        Height                         : Integer;
        QtyInNumbers                   : Integer;
        PerPackNetWeight               : Integer;
        PerPackGrossWeight             : Integer;
        TypeOfPacking                  : String;
        VolInCBM                       : Double;
        Stackable                      : String;
        Remarks                        : String;
        per_Adani_Logistics_LRF_Master : Association to one per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_Check_List {
    key Check_ID                       : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                        : LargeBinary;

        @Core.IsMediaType: true
        mediaType                      : String;
        fileName                       : String;
        url                            : String;
        per_Adani_Logistics_LRF_Master : Association to one per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_Draft {
    key Draft_ID                       : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                        : LargeBinary;

        @Core.IsMediaType: true
        mediaType                      : String;
        fileName                       : String;
        url                            : String;
        per_Adani_Logistics_LRF_Master : Association to one per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_Final {
    key Final_ID                       : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                        : LargeBinary;

        @Core.IsMediaType: true
        mediaType                      : String;
        fileName                       : String;
        url                            : String;
        per_Adani_Logistics_LRF_Master : Association to one per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_Approval {
    key Approval_ID                    : UUID
        @Core.Computed;
        FF_Email                       : SText;
        CHA_Email                      : SText;
        Logistics_Email                : SText;
        FF_Status                      : SText;
        CHA_Status                     : SText;
        logistics_Status               : SText;
        FF_Comments                    : SText;
        CHA_Comments                   : SText;
        Logistics_Comments             : SText;
        per_Adani_Logistics_LRF_Master : Association to one per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_Delivery_Details {
    key Delivery_ID                    : UUID
        @Core.Computed;
        Site_Address                   : String;
        DContact_Person                : String;
        DCountry_code                  : String;
        DContact_No                    : String;
        DEmail_ID                      : String;
        Ins_Pol_01                     : String;
        Ins_Pol_No1                    : String;
        Ins_Company1                   : String;
        Pol_Exp_Date1                  : Date;
        Ins_Pol_02                     : String;
        Ins_Pol_No2                    : String;
        Ins_Company2                   : String;
        Pol_Exp_Date2                  : Date;
        Ins_Pol_03                     : String;
        Ins_Pol_No3                    : String;
        Ins_Company3                   : String;
        Pol_Exp_Date3                  : Date;
        DSubmit                        : String;
        per_Adani_Logistics_LRF_Master : Association to many per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_FF_Ship_Details {
    key FF_Ship_ID                            :      UUID @Core.Computed;
        lines_name                            :      String;
        Foriegn_Agent_Details                 :      String;
        No_Containers                         :      String;
        Trans_Dir                             :      String;
        Vessel_Name                           :      String;
        Ship_Mode                             : many String;
        Courier_Name                          :      String;
        Docket_No                             :      String;
        Docket_Date                           :      Date;
        Allocation_Date                       :      Date;
        BL_No                                 :      String;
        BL_Rel_Date                           :      Date;
        ETD_Plan                              :      Date;
        ETA_Plan                              :      Date;
        Delivery_Date                         :      Date;
        Arrival_Date                          :      Date;
        LC_Control_No                         :      String;
        LC_Issuing_Bank                       :      String;
        LC_Expiry_Date                        :      Date;
        DEmpty_Container_Pickup               :      Date;
        DContainer_Handed_Over_to_Shipper     :      Date;
        DContainer_Stuffing                   :      Date;
        DLoaded_Container_Movement_to_Factory :      Date;
        DLoaded_Container_Arrival_Terminal    :      Date;
        DExport_Clearance                     :      Date;
        DDocument_Cutoff                      :      Date;
        DGatein_Cutoff                        :      Date;
        DVessel_ETA_at_Origin                 :      Date;
        DContainer_Loaded_on_Vessel           :      Date;
        DContainer_Offloaded_from_Vessel      :      Date;
        FFSubmit                              :      String;
        per_Adani_Logistics_LRF_Master        :      Association to many per_Adani_Logistics_LRF_Master;
}

entity PAdani_Logistics_FF_Doc_Upload {
    key FF_DocUpload_ID                : UUID @Core.Computed;

        @Core.MediaType  : mediaType
        content                        : LargeBinary;

        @Core.IsMediaType: true
        mediaType                      : String;
        fileName                       : String;
        url                            : String;
        per_Adani_Logistics_LRF_Master : Association to one per_Adani_Logistics_LRF_Master;
}

entity LrfTracker2 {
    key LRF_Master_ID  : UUID;
        Lrf_No         : String;
        PO_Number      : String;
        Ref_Lrf_No     : String;
        Requ_Date      : Date default CURRENT_DATE;
        Project_ID     : String;
        Vendor_Name    : String;
        Submit_Flag    : String(10);
        Initiator_Name : String;
        Mobile_No      : String;
};

entity LrfTracker3 as select from per_Adani_Logistics_LRF_Master;
type SText : String(30);
