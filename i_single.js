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


const server = http.createServer(OnRequest);
server.listen(config.port, config.hostname, () => {
	console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
