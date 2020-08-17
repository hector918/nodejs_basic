const cookie = require("cookie");
const url = require("url");
const session_key = "sessionID66";
const session_expire = 720;//unit second  //60 * 60 * 24 * 7 // 1 week
const general_function = require('./common/general_function');
const mongoose = require("mongoose");
const user = require('./dbmodel/user');
const { throws } = require("assert");
const session_conn = mongoose.createConnection('mongodb://localhost/mevnStack',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        'useFindAndModify': false,
        'useCreateIndex': true,
        keepAlive: 120,
    }
)
session_conn.on('open', () => {
	console.log('[DB] session Mongodb is Connected. have a nice day.');
})
session_conn.on('err', (err) => {
	console.log('err:' + err);
})

const schema = mongoose.Schema({
    session_id:{
        type : String,
    },
    created:{
        type: Date, 
        default: Date.now ,
    },
    last_access :{
        type: Date, 
        default: Date.now ,
    },
    ip_address : { type : String, },
    macaddress : { type : String, },
    encrypty_salt : { type : String },
    power_tags : { type : [], },
    user_id : { type : mongoose.ObjectId },
    islogin : {
        type : Boolean,
        default : false ,
    },
    temp_power_tags : { type : [], },
    station_info : { type : mongoose.Schema.Types.Mixed , },
    active : {
        type : Boolean,
        default : true ,
    },
})

let session = session_conn.model('session', schema);
//let token = 

function process_with_session(par)
{
    var par_=general_function.DebugStep(par,"check_session");
    //console.log(parreq.connection.remoteAddress);
    // Parse the query string
    try {
        var sessionkey = par.Request.headers.cookie[session_key];
    }
    catch(err)
    {
        var sessionkey = undefined;
    }
    
    if(sessionkey == undefined || sessionkey == "")//如果未有cookies
    {
        //
        par_.callback(par);
    }
    else//如果已经有session id
    {
        


		var dateOffset = (1000)*session_expire; //unit second
		
		var query={
    		'session_id' : sessionkey,
    		'ip_address' : par.Request.connection.remoteAddress,
            'active' : true,
            "last_access" : { 
				$gt: new Date(new Date().setTime(new Date().getTime() - dateOffset))
            },
            
        };

        model.findOneAndUpdate(query, { $set: { "last_access" : new Date()} },{returnNewDocument : true,useFindAndModify: false},function(error,doc){
            if(doc==null)
			{
                //如果没有，就把session id 取消 
                par_.ResContent['Set-Cookie'] = session_key + '=';

                
                par.callback(par_);
			}
			else
			{
                //如果找到就附上
				par_.SessionDoc = doc;
				par.callback(par_);
            }
        })
    }
    
    
    
    
}
function create_session(par,random_id)
{
    var par_=general_function.DebugStep(par,"create_session");
    var sessionid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now();
    let session_doc = new session({
        "session_id" : sessionid,
        "ip_address" : par.Request.connection.remoteAddress,
        created : new Date(),
        last_access : new Date(),
        active : true,
        encrypty_salt : random_id,
        user_id : par_.UserDoc._id,
    })
    return session_doc.save();
    
}
/*
function create_session(par)
{
    var par_=general_function.DebugStep(par,"create_session");
    var sessionid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now();
    let session_doc = new session({
        "session_id" : sessionid,
        "ip_address" : par.Request.connection.remoteAddress,
        created : new Date(),
        last_access : new Date(),
        active : true,
    })
    session_doc.save().then((doc) => {
        //此处应该删除同ip的session zhong 01292020
        //insert done
        par_.ResContent['Set-Cookie'] = cookie.serialize( session_key, sessionid, {
            httpOnly : true,
            maxAge : session_expire,
        });
        par_.SessionDoc = doc;
        par_.callback(par_);
    }).catch(error=>{
        //return error
        par_.errors.push(error);
        console.log(error)
        general_function.ProcessError(par_);
    });
    
}
*/

function get_token_from_req(req,res)
{
    //
    
}

function login(par)
{
    var par_=general_function.DebugStep(par,"handle_POST");

	var body = [];
	try
	{
        //post body大小上限 unit byte
        const body_limit = 1000;
        var body_size = 0;
		par.Request.on('data', function(chunk) {
            
            body_size += chunk.length;
            
            if( body_size > body_limit )
            {
                general_function.ProcessError(par_);
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
                
                body = JSON.parse(body); 
                if(!("username" in body)||!("text" in body))
                {
                    general_function.ProcessError(par_);
                    return;
                }
                var ise = (async function(){
                    try {
                        var result = await user.CheckUser(body["username"]);
                        console.log(result);
                        if(result==undefined)
                        {
                            throw new Error('auth failed');
                        }
                        par_.UserDoc = result;
                        
                        var key = par_.UserDoc['firstname'];
                        
                        key = key.concat(par_.UserDoc['barcode']);
                        
                        const crypto = require("crypto");
                        var key = crypto.createHash('sha256').update(key).digest('array');
                        const aesjs = require("aes-js");
                        // When ready to decrypt the hex string, convert it back to bytes
                        
                        var encryptedBytes = aesjs.utils.hex.toBytes(body['text']);
                        
                        // The counter mode of operation maintains internal state, so to
                        // decrypt a new instance must be instantiated.
                        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

                        // Convert our bytes back into text
                        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
                    
                        
                        body = JSON.parse(decryptedText);  
                        if(body['random_id']!=undefined)
                        {
                            var result = await create_session(par_,body['random_id']);
                        
                            //insert done
                            par_.ResContent['Set-Cookie'] = cookie.serialize( session_key, result["session_id"], {
                                httpOnly : true,
                                maxAge : session_expire,
                            });
                            par_.ResContent['content']['LoginResult']="success";
                            par_.SessionDoc = result;
                            key = par_.UserDoc['firstname']+body['random_id']+par_.UserDoc['barcode'];
                            par_.callback(par_,key);
                        }
                        else
                        {
                            throw new Error('auth failed');
                        }
                    } catch (error) {
                        par_.postBody = [];
                        par_.ResContent['Set-Cookie'] = cookie.serialize( session_key, "", {
                            httpOnly : true,
                            maxAge : session_expire,
                        });
                        if(par_.callback)
                        {
                            par_.callback(par_);
                        }
                    }
                    
                })();
               

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
        general_function.ProcessError(par_);
	}
	//handle
}

exports.process_with_session = process_with_session;
exports.create_session = create_session;
exports.login = login;
