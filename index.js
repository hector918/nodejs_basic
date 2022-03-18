const config =  require('./config.js');
const http = require('http');
const https = require('https');
const fs = require('fs');
const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};
  
const general_function = require('./common/general_function');
const db_action = require('./db_action');
db_action.main().catch(console.error);
const mysql_db = require('./mysql_action');
const url = require('url');
//require("./common/telegram.js");
function OnRequest(req,res)
{
	
	//default par_ 
	var par_ = {
		callback : null,
        "debug_footprint" : [],
        on_request_time : process.uptime(),
        ResContent : {
            
            'Content-Type': 'text/html',
            'status_code' : 200,
			'content' : {
				
			},
			
		},
		postBody : [],
		errors : [],
		station : {
			
		},
		Request : req ,
		Respond : res ,
		
    }
	////////////////////////////////////////////////////////
	if(config.debug)
	{//debug
		par_.debug_footprint.push({
			func_name : "onrequest",
			time_record :  process.uptime()  - par_.on_request_time ,
		})
	}
	switch(req.method)
	{
		case "OPTIONS":
			//如果是带有session并是options就直接返回 
			par_.status_code=200;
			general_function.ResWrite(par_);
		break;
		case "POST":
			//如果 有post
			par_.callback=process_post;
			general_function.handlePost(par_);
		break;
		default:
			//对session
			var url_parts = general_function.url_filtering(par_.Request.url);
			switch(url_parts)
			{
				case (url_parts.match( /(?:js|css|img|png|webfont|ttf|svg|woff|html|htm|woff2)$/) || {}).input: case "/favicon.ico":
					
					general_function.ReadStaticFile(url_parts,par_);
				break;
				case (url_parts.match(/^\/api/) || {}).input:
					//session.VaildateSession( par_);
				break;
				case "/bb":
					general_function.ReadStaticFile("/hz.html",par_);
				break;
				default:
					general_function.ReadStaticFile("/index.html",par_);
				break;
			}
		break;
	}
}
/*
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) 
{
	console.log('[master] ' + "start master...");

	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('listening', function (worker, address) 
	{
		console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
	});

} else if (cluster.isWorker) 
{
	console.log('[worker] ' + "start worker ..." + cluster.worker.id);
	var num = 0;
	http.createServer(OnRequest).listen(config.port,config.hostname, () => {
		console.log(`[worker] running at http://${config.hostname}:${config.port}/`);
	});
}
*/
const server = http.createServer(OnRequest);
server.listen(config.port, config.hostname, () => {
	console.log(`Server running at http://${config.hostname}:${config.port}/`);
});

const httpsserver = https.createServer(OnRequest);
httpsserver.listen(config.httpsport, config.hostname, () => {
	console.log(`Server running at https://${config.hostname}:${config.httpsport}/`);
});


////////////////////////////////////////////////////////////////////////
function process_post(par)
{
	//
	
	switch(par.postBody.action)
	{
		case "get_devices_list":
			/*
			db_action.get_devices_list((result)=>{
				par.ResContent={
					content:{
						result:"success",
						content:result,
						action:par.postBody.action
					},
					status_code:200
				};
				general_function.ResWrite(par);
			});
			*/
			
		break;
		case "get_rigs_status":
			mysql_db.get_last_rigs_status((result)=>{
				//
				
				general_function.DebugStep(par,"get_rigs_status");
				par.ResContent={
					content:{
						result:"success",
						content:result,
						action:par.postBody.action
					},
					status_code:200
				};
				general_function.ResWrite(par);
			});
			/*
			db_action.get_last_rigs_status((result)=>{
				//
				par.ResContent={
					content:{
						result:"success",
						content:result,
						action:par.postBody.action
					},
					status_code:200
				};
				general_function.ResWrite(par);
			});
			*/
			
		break;
		default:
			console.log("unhandle post-"+par.postBody);
			
			general_function.ProcessError(par);
		break;	
	}
	
}