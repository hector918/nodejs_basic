const config =  require('../config.js');
const url = require("url");

function process_error_and_response(par)
{
    var par_=debug_step_log(par,"process_error_and_response");
    
    par_.ResContent['status_code']=500;
    
    par.ResContent.content.result = "failed";
    par.ResContent.content.errors=par_.errors;
    api_res_end(par_);
    
}
function par_init(req,res)
{
    return {
		callback : null,
        "debug_footprint" : [],
        on_request_time : process.uptime(),
        ResContent : {
            
            'Content-Type': 'text/html',
            'status_code' : 200,
			'content' : {
				
			},
			
        },
        url : url.parse(req.url).pathname.replace("..",""),
		postBody : [],
		errors : [],
		station : {
			
        },
        UserDoc : null,
        SessionDoc : null,
		Request : req ,
		Respond : res ,
		
    }
}
function process_error_with_silence(error,par)
{
    console.log(error);
    
}

/** * 单位为字节格式为 MB 输出 */
const format = function (bytes) {    
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}
/** * 封装 print 方法输出内存占用信息 */
const print_usage = function() 
{    
    const memoryUsage = process.memoryUsage();
    console.log(JSON.stringify({        
        rss: format(memoryUsage.rss),        
        hT: format(memoryUsage.heapTotal),        
        hU: format(memoryUsage.heapUsed),        
        ex: format(memoryUsage.external),    
    }))
}
function deepGet (obj, properties, defaultValue) {
    if (!obj) { return defaultValue }
    if (properties.length === 0) { return obj }
    var foundSoFar = obj[properties[0]]
    var remainingProperties = properties.slice(1)

    return deepGet(foundSoFar, remainingProperties) // 递归
}

function debug_step_log(par,step)
{
    //
    if(config.debug)
    {
        par.debug_footprint.push({
			
            uptime : Math.round((process.uptime()  - par.on_request_time)*1000)+"ms" ,
            path : step,
		})
    }
    return par;
}
function api_direct_end(par)
{
    
    if(config.debug)
    {
        
        //调试用途
        console.log(par.Request.method+" ws="+(typeof(par.SessionDoc))+' [ '+Math.round((process.uptime()-par.on_request_time)*1000)+"ms ]"+' '+par.Request.url);
        console.log(par.debug_footprint);
        print_usage();
        //console.log(token)
    }

    //ends
    par = null;
}
function api_res_end(par,encrypt_key)
{
    var par_ = debug_step_log(par,"api_res_end");
    
    //所有返回客户端信息从此处集合发出
    
    var status_code = 404;

    var header_json = {
        //下面头部都是必要
        "Access-Control-Allow-Origin":config.CORS_origin,
        "Access-Control-Allow-Credentials" : "true",
        "Access-Control-Allow-Headers": "content-type,XFILENAME,XFILECATEGORY,XFILESIZE,token",
        //'Content-Type' :'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Methods':"POST",
        "Access-Control-Max-Age": "2592000",
    };
    var content = {};
    
    for(var x in par.ResContent)
    {
        switch(x)
        {
            case "status_code":
                status_code = par.ResContent[x];
            break;
            
            case 'Content-Type':
            break;

            case 'Set-Cookie':
                if(par.ResContent[x].length>0)
                {
                    header_json["Set-Cookie"] = [par.ResContent[x].trim()];
                }
            break;
            
            case "content":
                content = par.ResContent[x];
            break;
        }
    }
    switch(status_code)
    {
        case "200":
            par.Respond.statusCode=200;
        break;
        default :
            par.Respond.statusCode=status_code;
        break;
    }
    if(config.debug)
    {
        
        //调试用途
        console.log(par.Request.method+" "+status_code+" ws="+(typeof(par_.SessionDoc))+' '+par.Request.connection.remoteAddress+' ['+Math.round((process.uptime()-par.on_request_time)*1000)+"ms]"+' '+par.Request.url);
        console.log(par.debug_footprint);
        print_usage();
        //console.log(token)
    }
    for(let x in header_json){ 
        par.Respond.setHeader( x, header_json[x] ); 
    }
    if(encrypt_key==undefined)
    {
        par.Respond.end(JSON.stringify(content));
    }
    else
    {
        const aesjs = require("aes-js");
        const crypto = require("crypto");
        var key = crypto.createHash('sha256').update(encrypt_key).digest('array');
        var textBytes = aesjs.utils.utf8.toBytes(JSON.stringify(content));
        
        // The counter is optional, and if omitted will begin at 1
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);
        
        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        par.Respond.end(encryptedHex);
    }
    //ends
    par = null;
}
function read_static_files(filename,par)
{
    function CT(ext)
    {
        let CT = {
            "css": "text/css",
            "gif": "image/gif",
            "html": "text/html",
            "ico": "image/x-icon",
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "js": "text/javascript",
            "json": "application/json",
            "pdf": "application/pdf",
            "png": "image/png",
            "svg": "image/svg+xml",
            "swf": "application/x-shockwave-flash",
            "tiff": "image/tiff",
            "txt": "text/plain",
            "wav": "audio/x-wav",
            "wma": "audio/x-ms-wma",
            "wmv": "video/x-ms-wmv",
            "xml": "text/xml",
            "woff2": "text/html",
        };
        if(CT[ext]==undefined)
        {
            return "unknown";
        }
        else
        {
            return CT[ext];
        }
    }
    
    var fs = require('fs');
    var path = require('path');  /*nodejs自带的模块*/
	try
	{

        let abs_path = path.resolve(__dirname,"..\\public", filename.replace("/",""));
        if(!fs.existsSync(abs_path))
        {
            //file not exist
            par.Respond.statusCode=404;
			par.Respond.end("404 File not found");
        }
        else if(fs.lstatSync(abs_path).isDirectory())
        {
            //directory
            par.Respond.statusCode=404;
			par.Respond.end("404 File not found");
        }
        else if(CT(path.extname(filename).replace(".",""))=="unknown")
        {
            //uncertified type
            par.Respond.statusCode=500;
			par.Respond.end("404 File not found");
        }
        else
        {
            //successed
            par.Respond.setHeader('Content-Type', CT(path.extname(filename).replace(".","")));
			fs.createReadStream(abs_path).pipe(par.Respond);
        }
		
        if(config.debug)
        {
            console.log("[ReadFile] " + '['+Math.round((process.uptime()-par.on_request_time)*1000)+"ms]"+ abs_path);
        }
	}
	catch(ex)
	{
        console.log(ex);
        par.Respond.statusCode=500;
		par.Respond.end("500");
	}
}
function handle_POST( par)
{
	var par_=debug_step_log(par,"handle_POST");

	var body = [];
	try
	{
        //post body大小上限 unit byte
        const body_limit = config.post_body_limit;
        var body_size = 0;
		par.Request.on('data', function(chunk) {
            
            body_size += chunk.length;
            
            if( body_size > body_limit )
            {
                par_.ResContent.status_code = 413;
                api_res_end(par_);
                return;
            }
            if(body)
            {
                body.push(chunk);
            }
        })
        .on('end', () => {
            
			if(body.length>0)
			{
				//如果有内容
                body = Buffer.concat(body).toString();
                console.log(body)
                //const querystring = require('querystring');
             
                //body = querystring.parse(body,":");
                body = JSON.parse(body);
				par_.result = true;//非必要
                par_.postBody = body;
                
                if(par.callback)
                {
                    par.callback( par_);
                }

			}
			else
			{
				//如果没有内容
                par_.result = false;//非必要
                par_.postBody = [];
				if(par.callback)
                {
                    par.callback( par_);
                }
			}
		});
	}
	catch(ex)
	{
        console.log("handle post error")
        par_.ResContent.status_code = 500;
        api_res_end(par_);
	}
	//handle
}

module.exports = {
    ApiRouteEnd : api_direct_end,
    DeepGet : deepGet,
    DebugStep : debug_step_log,
    ProcessError : process_error_and_response,
    ResWrite : api_res_end,
    handlePost : handle_POST,
    ProcessErrorWithSilence : process_error_with_silence,
    ReadStaticFile : read_static_files,
    ParameterInit : par_init,
}