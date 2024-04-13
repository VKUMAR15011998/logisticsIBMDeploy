const cds = require("@sap/cds");

async function ConnectBackend(req) {
    // if(req.path=="Logistics_Service.PODetailsSercive"){
    const backendconnect = await cds.connect.to('PODetails');
    const tx = backendconnect.tx(req);
    return tx.run(req.query);
}
async function ConnectBackendValueHelp(req) {
    // if(req.path=="Logistics_Service.PODetailsSercive"){
    const backendconnect = await cds.connect.to('ZMM_CDS_C_PO_VH_CDS_SRV');
    const tx = backendconnect.tx(req);
    return tx.run(req.query);
}
async function ConnectUserHanaDB(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    return tx.run(req.query);
}
async function ConnectCHAUserRole(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    const response = await tx.run(
        SELECT.from('Logistics_Service.CHAgentUsers')
            .where({ role: 'CH-AGENT%20' })
            
    );

    return response;
}
async function ConnectMPLogUserRole(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = await backendconnect.tx(req);
    
    const response = await tx.run(
        SELECT.from('Logistics_Service.MPLLogisticsUsers')
            .where({ role: 'MPL-LOGISTICS' })
            
    );
    return response;
}
async function ConnectFreightUserRole(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    //const response = await tx.run(req.query);

    // Filter emails based on role
    //const filteredEmails = await response.filter(entry => entry.role === "FREIGHT-FORWADOR");

    const response = await tx.run(
        SELECT.from('Logistics_Service.FrightForwaderUsers')
            .where({ role: 'FREIGHT-FORWADOR' })
            
    );
    

    return response;
}
// async function ConnectVendorLogUserRole(req) {
//     const backendconnect = await cds.connect.to('userdetails');
//     const tx = backendconnect.tx(req);
//     //const response = await tx.run(req.query);

//     // Filter emails based on role
//     //const filteredEmails = await response.filter(entry => entry.role === "FREIGHT-FORWADOR");

//     const response = await tx.run(
//         SELECT.from('Logistics_Service.FrightForwaderUsers')
//             .where({ role: 'FREIGHT-FORWADOR' })
            
//     );
    

//     return response;
// }
module.exports = {
    ConnectBackend,ConnectUserHanaDB,ConnectCHAUserRole,ConnectMPLogUserRole,ConnectFreightUserRole,ConnectBackendValueHelp
}