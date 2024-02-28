const cds = require("@sap/cds");
const { NOTFOUND } = require("dns");
const { run } = require("node:test");

const { ConnectBackend } = require('./lib/ConnectionHandler')

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
    PODetailsSercive,
    LrfTracker1
  } = this.entities;
  this.on('READ',PODetailsSercive,ConnectBackend)
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
        const Temp_LRF_Number = "Temp-"+req.data.Project_ID+"-LRF-"+req.data.PO_Number+"-"+maxID;
        req.data.Lrf_No = Temp_LRF_Number;
        
      }  
      
  });

 
 

//   this.after("READ", "Update_Adani_Logistics_LRF_Master", async (req, res) => {
//        //var data=await this.read(Adani_Logistics_LRF_Master).where({LRF_Master_ID :res.data.LRF_Master_ID});
//      var getTempData = await SELECT.one.from(Adani_Logistics_LRF_Master).where({LRF_Master_ID :res.data.LRF_Master_ID})
     
    
//     if(getTempData.Submit_Flag=="YES" & getTempData.Lrf_No.includes('Temp')){
//       req[0].Lrf_No=await req[0].Lrf_No.slice(5);
       
//       var insertper=await INSERT.into(per_Adani_Logistics_LRF_Master).entries(req[0])
      
//      //await this._insert_permanent_logistics (getTempData,res.data)
     
//      //var getperRec=await cds.transaction(req).run(SELECT.from(per_Adani_Logistics_LRF_Master))
//     }else if(getTempData.Submit_Flag=="YES" & !getTempData.Lrf_No.includes('Temp')){
      
//       await this._update_permanent_logistics (getTempData,req[0])
//       }
//     });

//     this._insert_permanent_logistics = async function (getrecords,resData) {
      
//       var insertdata= await INSERT.into(per_Adani_Logistics_LRF_Master).entries(getrecords)
//       await UPDATE(per_Adani_Logistics_LRF_Master)
//         .set(resData)
//         .where({LRF_Master_ID :getrecords.LRF_Master_ID})
//         return await SELECT.from(per_Adani_Logistics_LRF_Master)
//   }
//   this._update_permanent_logistics = async function (getrecords,resData) {
      
    
//     await UPDATE(per_Adani_Logistics_LRF_Master)
//       .set(resData)
//       .where({LRF_Master_ID :getrecords.LRF_Master_ID})
//       return await SELECT.from(per_Adani_Logistics_LRF_Master)
// }
this.before('CREATE', 'PAdani_Logistics_Packing_Doc', req => {
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/odata/v4/logistics-/Adani_Logistics_Packing_Doc(${req.data.PackingID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Draft', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/odata/v4/logistics-/Adani_Logistics_Draft(${req.data.Draft_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Final', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/odata/v4/logistics-/Adani_Logistics_Final(${req.data.Final_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_Check_List', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/odata/v4/logistics-/Adani_Logistics_Check_List(${req.data.Check_ID})/content`
})
this.before('CREATE', 'PAdani_Logistics_FF_Doc_Upload', req => {
  console.log('Create called')
  console.log(JSON.stringify(req.data))
  req.data.url = `/odata/v4/logistics-/PAdani_Logistics_FF_Doc_Upload(${req.data.FF_DocUpload_ID})/content`
})
      // this.before("READ", "LrfTracker", async (req, res) => {
      //   const {LRF_Master_ID}=await SELECT.from(per_Adani_Logistics_LRF_Master);
        
      //  var result= await SELECT.from(Adani_Logistics_LRF_Master).where(`LRF_Master_ID NOT IN (SELECT.from(per_Adani_Logistics_LRF_Master))`);
      //  //(LRF_Master_ID).NOT.IN(SELECT.from(per_Adani_Logistics_LRF_Master)).UNION(SELECT.from(per_Adani_Logistics_LRF_Master))
      //   return result;
      // }),
      // this.on('READ','LrfTracker2', async (req, res) => {
      //   let result2={};
      //   const val1=await SELECT.from(per_Adani_Logistics_LRF_Master) .columns('LRF_Master_ID');
      //   const outputArray = val1.map(obj => obj.LRF_Master_ID);
        
      // const val2=await SELECT.from(per_Adani_Logistics_LRF_Master)
        
        
      //     var result = await SELECT.from(Adani_Logistics_LRF_Master).where`LRF_Master_ID not in ${outputArray}`; 
      //     oCombTable = [...val2, ...result];        
      //   return oCombTable;
      // })
      // this.on('READ','LrfTracker3', async (req, res,data) => {
      //  // const this1 = await cds.connect.to ('Logistics_Service.Get_Adani_Logistics_LRF_Master')
       
      //  const this2=  await this.send('GET','/Get_Adani_Logistics_LRF_Master')
      //   const val1=await SELECT.from(per_Adani_Logistics_LRF_Master) .columns('LRF_Master_ID');
      //   const outputArray = val1.map(obj => obj.LRF_Master_ID);
        
      // const val2=await SELECT.from(per_Adani_Logistics_LRF_Master)
        
        
      //     var result = await SELECT.from(Adani_Logistics_LRF_Master).where`LRF_Master_ID not in ${outputArray}`; 
      //     oCombTable = [...val2, ...result];        
      //   return oCombTable;
      // })
      
});