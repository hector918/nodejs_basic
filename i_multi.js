const config =  require('./config.js');
const http = require('http');
const route = require("./route");
const general_function = require('./common/general_function');
const auth = require('./auth');

function OnRequest(req,res)
{

	var par = general_function.ParameterInit(req,res);
    par.callback = route.Dispatch;
    auth.process_with_session(par);
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
