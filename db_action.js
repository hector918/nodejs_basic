
const { MongoClient , ObjectId } = require('mongodb');

const uri = "mongodb+srv://";
const client = new MongoClient(uri, { useUnifiedTopology: true });
//==============================================================================
const db_name = "miningsite01";
const conllection_mihome = "mihome";
const panel_config_name = "panel_config_01";
const panel_machines_record = "panel_machines_record_01";
const panel_sensors_record = "panel_sensors_record_01";

//
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function main(){

 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {

        console.error(e);
        await close_db();
    } finally {

    }
}
async function close_db()
{
    await client.close();
}
async function post_log(str)
{
    console.log(str);
}
async function get_monitor_devices_list()
{
    const document_id = "6138cfc14317823488bc6512";
    const result = await client.db(db_name).collection(conllection_mihome).findOne({"_id":ObjectId(document_id)});
    return result;
}
///////////////////////////////////////////////////////////////////////
async function get_monitor_rigs_info(cb)
{
    /*
    const document_id = "61439aa24317823488bc6513";
    const result = await client.db(db_name).collection(conllection_mihome).findOne({"_id":ObjectId(document_id)});
    */
    const result = await client.db(db_name).collection(panel_config_name).findOne({"document_name":"rigs_list"});
    cb(result);
    
}
///////////////////////////////////////////////////////////////
async function get_last_rigs_status(cb)
{
    /*
    const document_id = "61439aa24317823488bc6513";
    const result = await client.db(db_name).collection(panel_machines_record).findOne({});
    */
    const result_info = await client.db(db_name).collection(panel_config_name).findOne({"document_name":"rigs_list"});

    const result_status = await client.db(db_name).collection(panel_machines_record).findOne({},{ sort: { 'timestamp' : -1 }});

    for(var x in result_info.rigs_list)
    {
        if(result_status.data[result_info.rigs_list[x]['ipaddress']]!=undefined)
        {
            result_status.data[result_info.rigs_list[x]['ipaddress']]["name"]=result_info.rigs_list[x]['name'];
            result_status.data[result_info.rigs_list[x]['ipaddress']]["owner"]=result_info.rigs_list[x]['owner'];
            result_status.data[result_info.rigs_list[x]['ipaddress']]["type"]=result_info.rigs_list[x]['type'];
        }
    }
    cb(result_status);
    
}
///////////////////////////////////////////////////////////////
module.exports = { 
    main ,
    get_monitor_devices_list,
    get_monitor_rigs_info,
    get_last_rigs_status,
};
