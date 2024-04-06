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
async function ConnectCHAUserRole(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    const response = await tx.run(req.query);

    // Filter emails based on role
    const filteredEmails = response.filter(entry => entry.role === "CH Agent");

    // Extract email addresses from filtered entries
    //const emails = filteredEmails.map(entry => entry.userid);

    return filteredEmails;
}
async function ConnectMPLogUserRole(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    const response = await tx.run(req.query);

    // Filter emails based on role
    const filteredEmails = response.filter(entry => entry.role === "MPL-Logistics");

    // Extract email addresses from filtered entries
    //const emails = filteredEmails.map(entry => entry.userid);

    return filteredEmails;
}
async function ConnectFreightUserRole(req) {
    const backendconnect = await cds.connect.to('userdetails');
    const tx = backendconnect.tx(req);
    const response = await tx.run(req.query);

    // Filter emails based on role
    const filteredEmails = response.filter(entry => entry.role === "Freight-Forwador");

    // Extract email addresses from filtered entries
    //const emails = filteredEmails.map(entry => entry.userid);

    return filteredEmails;
}
module.exports = {
    ConnectBackend,ConnectUserHanaDB,ConnectCHAUserRole,ConnectMPLogUserRole,ConnectFreightUserRole
}