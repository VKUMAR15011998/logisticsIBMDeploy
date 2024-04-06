const cds = require("@sap/cds");
const { NOTFOUND } = require("dns");
const { run } = require("node:test");

const { ConnectBackend,ConnectUserHanaDB,ConnectCHAUserRole,ConnectMPLogUserRole,ConnectFreightUserRole } = require('./lib/ConnectionHandler')

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
    LoginUsers,
    USERS,
    Configuration,
    UserRoles,
    CHAgentUsers,
    MPLLogisticsUsers,
    FrightForwaderUsers,
    LrfTracker1
  } = this.entities;
  this.on('READ',PODetailsSercive,ConnectBackend)
  this.on('READ',LoginUsers,ConnectUserHanaDB)
  this.on('READ',USERS,ConnectUserHanaDB)
  this.on('READ',Configuration,ConnectUserHanaDB)
  this.on('READ',CHAgentUsers,ConnectCHAUserRole)
  this.on('READ',MPLLogisticsUsers,ConnectMPLogUserRole)
  this.on('READ',FrightForwaderUsers,ConnectFreightUserRole)
  
  
  
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

this.before('CREATE', 'PAdani_Logistics_Packing_Doc', req => {
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/v2/odata/v4/logistics-/PAdani_Logistics_Packing_Doc(${req.data.PackingID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Draft', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/odata/v4/logistics-/PAdani_Logistics_Draft(${req.data.Draft_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Final', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/odata/v4/logistics-/PAdani_Logistics_Final(${req.data.Final_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Check_List', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/odata/v4/logistics-/PAdani_Logistics_Check_List(${req.data.Check_ID})/content`
})
this.before('CREATE', 'PAdani_CHA_Document_upload', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/odata/v4/logistics-/PAdani_CHA_Document_upload(${req.data.CHA_Doc_Upload_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_FF_Doc_Upload', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/v2/odata/v4/logistics-/PAdani_Logistics_FF_Doc_Upload(${req.data.FF_DocUpload_ID})/content`
})
this.on('getIASUsers', async req => {
  const backendconnect = await cds.connect.to('userdetails');
  const result = await backendconnect.getIASUsers();
  return result;
});
     
this.on('getIASGroups', async req => {
  const backendconnect = await cds.connect.to('userdetails');
  const result =  backendconnect.getIASGroups();
  console.log("****************",result)
  return result;
});



});