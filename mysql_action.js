const mysql = require('mysql');
const db_name = "mining_container";
const conllection_mihome = "mihome";
const panel_config_name = "panel_config_01";
const panel_machines_record = "panel_machines_record_01";
const panel_sensors_record = "panel_sensors_record_01";
const util = require('util');

async function post_log(str)
{
    console.log(str);
}

class mysql_c{
    /*
    conn = null;
    database = null;
    host = "";
    user = "";
    pw = "";
    query = null;
    */
    
    constructor(host,user,password,db) {
        this.host=host;
        this.user=user;
        this.pw=password;
        this.database=db;
        this.connect();
        
        this.query = util.promisify(this.conn.query).bind(this.conn);
        this.rigs_status_result= {};
        this.rigs_list={};
    }
    
    async connect()
    {
        try {
            this.conn=mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.pw,
                database: this.database,
            });
            clearInterval(this.heartid);
            post_log("Connection established");
            this.heartid = setInterval(() => {
                get_rigs_status_heart_beat();
            }, 10000);
        } catch (error) {
            post_log("mysql error");
            post_log(error);
        }
    }
    async list_db()
    {
        //
        return await this.query('show databases;');
    }
    async list_tables()
    {
        //
        return await this.query('show tables;');
    }
    async get_one(sql)
    {
        return (await this.query(sql))[0];
    }
    async get_all(sql)
    {
        return (await this.query(sql));
    }
    get_fields_key(obj)
    {
        let result = [];
        for(let x in obj)
        {
            result.push(x);
        }
        return result;
    }
    unescape(str)
    {
        return str;
        if(typeof(str)=="string")
        {
//            return str.replace(/[^a-zA-Z\d]/g, '');
        }
        else
        {
  
        }
        
    }
    async insert(array,table)
    {
        /*
        INSERT INTO tbl_name (a,b,c)
        VALUES(1,2,3), (4,5,6), (7,8,9);
        */
        //
        for(let f in array)
        {
            var fields = this.get_fields_key(array[f]);
            break;
        }

        let value_string = "";
        for(let x in array)
        {
            value_string+="(";
            for(let y in fields)
            {
                //
                if(array[x][fields[y]]!=undefined)
                {
                    try {
                        value_string+="'"+array[x][fields[y]]+"',";    
                    } catch (error) {
                        post_log(error);
                    }
                }
                else
                {
                    value_string+="'',";
                }    
            }
            value_string=value_string.substr(0,value_string.length-1);
            value_string+="),";

        }
        value_string=value_string.substr(0,value_string.length-1);
        let fields_key = fields.join();
        let sql = `INSERT INTO ${table} (${fields_key}) VALUES${value_string};`;

        return (await this.query(sql));
    }
    async update(sql,where)
    {
        return (await this.query(sql));
    }
    async target_db(db)
    {
        this.database=db;
        this.query(`USE ${db}`);
        
    }
    async close_db()
    {
        con.end((err) => {
            // The connection is terminated gracefully
            // Ensures all remaining queries are executed
            // Then sends a quit packet to the MySQL server.
            post_log("mysql connection error");
            console.log(err);
        });
    }
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

///////////////////////////////////////////////////////////////
function make_value_to_key(obj,key_name)
{
    var result ={};
    for(let x in obj)
    {
        if(obj[x][key_name]!=undefined)
        {
            result[obj[x][key_name]]=obj[x];
        }
    }
    return result;
}
///////////////////////////////////////////////////////////////
async function get_rigs_status_heart_beat()
{
    try {
        var sql = `select * from ${panel_config_name} where name="rigs_list";`;
        let result = await mysql_obj.get_one(sql);
        mysql_obj.rigs_list= JSON.parse(result['data']);
        
        sql = `select * from ${panel_machines_record} where timestamp =(select timestamp from ${panel_machines_record} where 1 order by \`timestamp\` DESC limit 1)and \`index\`  > (SELECT MAX(${panel_machines_record}.index) FROM ${panel_machines_record}) - 255`;
        const result_status =await mysql_obj.get_all(sql); 
        mysql_obj.rigs_status_result=result_status;
    } catch (error) {
        post_log("get_monitor_rigs_list failed, trying to reconnect the database.");
        post_log(error);
        this.connect();
        
    }
    console.log(mysql_obj.rigs_list);
    
    
}
///////////////////////////////////////////////////////////////
async function get_last_rigs_status(cb)
{
    const rigs_list = mysql_obj.rigs_list;
    var result_info = make_value_to_key(rigs_list['rigs_list'],"ipaddress");
    
    const result_status = mysql_obj.rigs_status_result
    mysql_obj.rigs_status_result=result_status;

    var result = {};
    for(var x in result_status)
    {
        
       
        result[result_status[x]['ipaddress']]=JSON.parse(result_status[x]['data']);
        if(result_info[result_status[x]['ipaddress']]!=undefined)
        {
            result[result_status[x]['ipaddress']]["ipaddress"]=result_info[result_status[x]['ipaddress']]['ipaddress'];
            result[result_status[x]['ipaddress']]["name"]=result_info[result_status[x]['ipaddress']]['name'];
            result[result_status[x]['ipaddress']]["owner"]=result_info[result_status[x]['ipaddress']]['owner'];
            result[result_status[x]['ipaddress']]["type"]=result_info[result_status[x]['ipaddress']]['type'];

        }
    }
    cb(result);
    
}
const mysql_obj = new mysql_c('rds.amazonaws.com','','','mining_container');

///////////////////////////////////////////////////////////////
module.exports = { 
    mysql_obj,
    get_last_rigs_status
};
