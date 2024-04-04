const cds = require("@sap/cds");

async function ConnectBackend(req) {
    // if(req.path=="Logistics_Service.PODetailsSercive"){
    const backendconnect = await cds.connect.to('PODetails');
    const tx = backendconnect.tx(req);
    return tx.run(req.query);
}
async function ConnectUserHanaDB(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    return tx.run(req.query);
}
module.exports = {
    ConnectBackend,ConnectUserHanaDB
}