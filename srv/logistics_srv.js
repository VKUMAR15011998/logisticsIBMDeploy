const cds = require("@sap/cds");
const { NOTFOUND } = require("dns");
const { run } = require("node:test");

const { ConnectBackend,ConnectUserHanaDB,ConnectCHAUserRole,ConnectMPLogUserRole,ConnectMPLCustomUserRole,ConnectFreightUserRole,ConnectBackendValueHelp } = require('./lib/ConnectionHandler')

module.exports = cds.service.impl( async function(){
  const { Adani_Logistics_LRF_Master,
    Adani_Logistics_Packing_Doc,
    Adani_Logistics_Material_Desc, 
    Adani_Logistics_Check_List,
    Adani_Logistics_Draft,
    Adani_Logistics_Final,
    Adani_Logistics_Approval,
    Adani_Logistics_Delivery_Details,
    Adani_Logistics_FF_Ship_Details,
    Adani_Logistics_FF_Doc_Upload,
    Get_Adani_Logistics_LRF_Master,
    per_Adani_Logistics_LRF_Master,
    Customs_Duty_Advice_Join,
    Terminal_handler_charges,
    PODetailsSercive,
    DPR_Data_SRV,
    LoginUsers,
    USERS,
    Configuration,
    UserRoles,
    CHAgentUsers,
    MPLLogisticsUsers,
    MPLCustomsUsers,
    FrightForwaderUsers,
    VendorHelp,
    LrfTracker1,
    Terminal_handler_charges_Join ,
    Transporter_Details_Join  
  } = this.entities;
  this.on('READ',PODetailsSercive, async req=>{ 
    const backendconnect = await cds.connect.to('PODetails');
    const tx = backendconnect.tx(req);    
    const user = await cds.connect.to('userdetails');
    const tran = user.tx(req);
    const response = await tran.run(
        SELECT.from('Logistics_Service.LoginUser')
            .where({ email: req.user.id }));
    
    if(req.user.is("logistic_vendor")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['Vendorcode'] }, '=', { val: response[0].vendorCode });
    }else if(!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['Vendorcode'] }, '=', { val: response[0].vendorCode});
    }
  }
           return tx.run(req.query) ;
    })

    this.before("READ", "Transporter_Details_Join", async (req, res) => {
 
      const user = await cds.connect.to('userdetails');
      const tran = user.tx(req);
      const response = await tran.run(
          SELECT.from('Logistics_Service.LoginUser')
              .where({ email: req.user.id }));
      if (!req.query && !req.query.SELECT) {
          req.query.SELECT = {};
      }
      if (req.query.SELECT.where) {
        req.query.SELECT.where.push('and');
        req.query.SELECT.where.push({ ref: ['Transporter_Code'] }, '=', { val: response[0].vendorCode });
      }else if(!req.query.SELECT.where) {
          req.query.SELECT.where = [];
          req.query.SELECT.where.push({ ref: ['Transporter_Code'] }, '=', { val: response[0].vendorCode});
      }
    })
    
  this.on('READ',DPR_Data_SRV,ConnectBackend)
  this.on('READ',VendorHelp,ConnectBackendValueHelp)
  //this.on('READ',LoginUsers,ConnectUserHanaDB)
  this.on('READ',USERS,ConnectUserHanaDB)
  this.on('READ',Configuration,ConnectUserHanaDB)
  this.on('READ',CHAgentUsers,ConnectCHAUserRole)
  this.on('READ',MPLLogisticsUsers,ConnectMPLogUserRole)
  this.on('READ',MPLCustomsUsers,ConnectMPLCustomUserRole)
  this.on('READ',FrightForwaderUsers,ConnectFreightUserRole)
  

  this.on('READ',LoginUsers, async req => {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    const servicerole = {
      "super_logistics" : req.user.is("super_logistics"),
      "mpl_logistics" : req.user.is("mpl_logistics"),
      "mpl_customs": req.user.is("mpl_customs"),
      "ff_logistics":req.user.is("ff_logistics"),
      "ch_logistics": req.user.is("ch_logistics"),
      "logistic_vendor" : req.user.is("logistic_vendor"),
      "logistic_expeditor" : req.user.is("logistic_expeditor"),
      "insurance" : req.user.is("insurance"),
      "importer" : req.user.is("importer"),
      "logistics_manager" : req.user.is("logistics_manager"),
      "customs_manager" : req.user.is("customs_manager"),
      "importer" : req.user.is("importer"),
      "transporter" : req.user.is("transporter")
    }
    let res_login = await tx.run(req.query);
    res_login[0].servicerole = servicerole;
    console.log('res'+ JSON.stringify(res_login));
    return res_login;
  });
  
  
  // this.on('READ', "PODetailsService", async (req) => {
  //   try {
  //     const backendconnect = await cds.connect.to('PODetails');
  //     console.log("*****************",backendconnect);
  //     const tx = backendconnect.tx(req);
  //     return tx.run(req.query);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return error;
  //   }
  // });
  this.on('MyAction', async(req)=>{
   
    let { maxID } = await SELECT.one `count(*) as maxID` .from (Adani_Logistics_LRF_Master).where `PO_Number=${1110}`;
    const   aTable =await SELECT.from (Adani_Logistics_LRF_Master).where({PO_Number:'1111'});
    
    return aTable;
  });
  this.before("CREATE", "per_Adani_Logistics_LRF_Master", async (req, res) => {
    let { maxID } =await SELECT.one `count(*) as maxID` .from (per_Adani_Logistics_LRF_Master).where `PO_Number=${req.data.PO_Number}`;

     if(maxID !==undefined){
        maxID++;
        //let paddedNumber = number.toString().padStart(3, '0');
        const Temp_LRF_Number = "Temp-"+req.data.Project_ID+"-LRF-"+req.data.PO_Number+"-"+maxID.toString().padStart(3, '0');
        req.data.Lrf_No = Temp_LRF_Number;
        
      }  
      
  });

  this.before("READ", "per_Adani_Logistics_LRF_Master", async (req, res) => {
    
    if(req.user.is("logistic_vendor")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['Email_Id'] }, '=', { val: req.user.id });
    }else if(!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['Email_Id'] }, '=', { val: req.user.id });
    }
    }
    
    if(req.user.is("mpl_logistics")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['LogisticsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
    }else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['LogisticsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
   
  }
  // if(req.user.is("logistic_expeditor")){
  //   if (!req.query && !req.query.SELECT) {
  //       req.query.SELECT = {};
  //   }
  //   if (req.query.SELECT.where) {
  //     req.query.SELECT.where.push('and');
  //     req.query.SELECT.where.push({ ref: ['Email_Id'] }, '=', { val: req.user.id });
  //   } else if (!req.query.SELECT.where) {
  //       req.query.SELECT.where = [];
  //       req.query.SELECT.where.push({ ref: ['Email_Id'] }, '=', { val: req.user.id });
  //   }
  // }
  if(req.user.is("ff_logistics")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['FF_AssignEmail_Id'] }, '=', { val: req.user.id });
  }
    else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['FF_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
    
  }
  if(req.user.is("mpl_customs")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['CustomsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
  }
    else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['CustomsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
    
  }
  if(req.user.is("ch_logistics")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['CHA_AssignEmail_Id'] }, '=', { val: req.user.id });
  }
    else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['CHA_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
    
  }
  });

  this.before("READ", "Terminal_handler_charges_Join", async (req, res) => {
    if(req.user.is("ch_logistics")){

    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['CHA_AssignEmail_Id'] }, '=', { val: req.user.id });
  }
    else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['CHA_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
  }
  if(req.user.is("mpl_customs")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['CustomsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
  }
    else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['CustomsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
    
  }
  });

  this.before("READ", "Customs_Duty_Advice_Join", async (req, res) => {
    if(req.user.is("ch_logistics")){

    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['CHA_AssignEmail_Id'] }, '=', { val: req.user.id });
  }
    else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['CHA_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
  }
  if(req.user.is("mpl_customs")){
    if (!req.query && !req.query.SELECT) {
        req.query.SELECT = {};
    }
    if (req.query.SELECT.where) {
      req.query.SELECT.where.push('and');
      req.query.SELECT.where.push({ ref: ['CustomsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
  }
    else if (!req.query.SELECT.where) {
        req.query.SELECT.where = [];
        req.query.SELECT.where.push({ ref: ['CustomsMPL_AssignEmail_Id'] }, '=', { val: req.user.id });
    }
    
  }
  });

this.before('CREATE', 'PAdani_Logistics_Packing_Doc', req => {
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/v2/logistics/PAdani_Logistics_Packing_Doc(${req.data.PackingID})/content`
})
this.after('CREATE', 'PAdani_Logistics_Packing_Doc', res => {
  console.log(res);
})
this.before('CREATE', 'PAdani_Logistics_Draft', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/logistics/PAdani_Logistics_Draft(${req.data.Draft_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Final', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/logistics/PAdani_Logistics_Final(${req.data.Final_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Check_List', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/logistics/PAdani_Logistics_Check_List(${req.data.Check_ID})/content`
})
this.before('CREATE', 'PAdani_CHA_Document_upload', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/logistics/PAdani_CHA_Document_upload(${req.data.CHA_Doc_Upload_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_FF_Doc_Upload', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/logistics/PAdani_Logistics_FF_Doc_Upload(${req.data.FF_DocUpload_ID})/content`
})
this.on('getIASUsers', async req => {
  const backendconnect = await cds.connect.to('userdetails');
  const result = await backendconnect.getIASUsers();
  var result1 ;
  var result2 = [];

await result.Resources.forEach(a => {
  if (a['urn:sap:cloud:scim:schemas:extension:custom:2.0:User'] == null || a['urn:sap:cloud:scim:schemas:extension:custom:2.0:User'] == 'undefined'){
    result1 = {"emailid" :a.userName , "vendorCode":""};
  }else{
    result1 = {"emailid" :a.userName,"vendorCode" :a['urn:sap:cloud:scim:schemas:extension:custom:2.0:User'].attributes[0].value};
  }
  result2.push(result1)
})
return [{json: JSON.parse(JSON.stringify(result2))}];
});
     
this.on('getIASGroups', async req => {
  const backendconnect = await cds.connect.to('userdetails');
  const result =  backendconnect.getIASGroups();
  console.log("****************",result)
  return result;
});

});