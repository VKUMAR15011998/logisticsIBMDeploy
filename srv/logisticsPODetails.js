const cds = require("@sap/cds");

const { 
  PODetailsSercive
} = cds.entities("app.logistics");
const { ConnectBackend } = require('./lib/ConnectionHandler')

module.exports["Logistics_Service"] = srv => {
  srv.on('READ',PODetailsSercive,ConnectBackend)
  // srv.on('READ', 'PODetailsService', async (req) => {
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
  
      
};