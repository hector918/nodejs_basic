const config =  require('./config.js');
const http = require('http');
const general_function = require('./common/general_function');
const session = require('./dbmodel/session');
const url = require('url');

function OnRequest(req,res)
{
	const process_after_vaildate_session = function (par)
	{
		//
		const route = require('./route');
		if(par.SessionDoc==undefined)
		{
			//没有session
			route.ProcessWithoutSession(par_);
		}
		else
		{
			//有session
			route.ProcessWithSession(par_);
		}
		
	}
	//default par_
	var par_ = {
		callback : process_after_vaildate_session,
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
			par_.callback=(par)=>{
				let par_ = par;
				par_.callback=process_after_vaildate_session;
				session.VaildateSession(par_);
			};
			general_function.handlePost(par_);

		break;
		default:
			//对session
			var url_parts = url.parse(par_.Request.url).pathname.replace("..","");
			
			switch(url_parts)
			{
				
				case (url_parts.match(/^\/js|\/css|\/img|\/webfont/) || {}).input: case "/favicon.ico":
					general_function.ReadStaticFile(url_parts,par_);
				break;
				case (url_parts.match(/^\/api/) || {}).input:
					session.VaildateSession( par_);
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

/*
const server = http.createServer(OnRequest);
server.listen(config.port, config.hostname, () => {
	console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
*/