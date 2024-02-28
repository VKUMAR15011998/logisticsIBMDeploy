const cds = require("@sap/cds");

async function ConnectBackend(req){
    const backendconnect = await cds.connect.to('PODetails');
    console.log("*****************",backendconnect);
    const tx = backendconnect.tx(req);
    return tx.run(req.query);
}
module.exports={
    ConnectBackend
}