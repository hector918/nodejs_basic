
const mongoose = require("mongoose");
const config = require("../config");

const connection = require('../common/maindb_connection');
const general_function = require('../common/general_function');


const schema = mongoose.Schema({
    barcode : { type : String, },
    created:{
        type: Date, 
        default: Date.now ,
    },
    last_access :{
        type: Date, 
        default: Date.now ,
    },
    firstname : { type : String, },
    lastname : { type : String, },
    sessions : { type : String },
    power_tags : { type : [] },
})

let user = connection.model('users', schema);



const add_user_ = function (req,res,par)
{
    //
    var par_ =general_function.DebugStep(par,"add_user");
    
    const result = schema.validate(par_.user_doc);
    //
    if (result.error == null) 
    {
        
        //通过验证 
        users.insert(par_.user_doc).then((doc,error)=>{
            
            if(error==undefined)
            {
                //新建完成，回归主程
                
                par.callback(req,res,par_);

            }
            else
            {
                //没有成功插入文件，将会中止请求
                
                par_.res_response['status_code']=500;
                par_.errors.push({"message":"cant add user error:" + JSON.string(error)});
                par_.result = false;
                general_function.ResWrite(req,res,par_);

            }
            
        });
        
    } else {
        //没有通过验证，将会中止请求 
        
        par_.res_response['status_code']=500;
        par_.errors.push({"message":"cant verifi user doc:" + JSON.stringify( result.error)});
        par_.result = false;
        general_function.ResWrite(req,res,par_);
        
        //request end
    }

}
const check_user = function (username)
{
    /*/
    user.find(query).then(doc=>{
        par_.ResContent.content.users = doc;
        par_.callback(par_);
    });
    /*/

    return user.findOne({"firstname":username}).exec();

    
    
}
const update_user_field = function (query,par)
{
    //
    var par_ =general_function.DebugStep(par,"update_user_field");
    
    let update_doc = {};
    try{
        update_doc[query.field]=query.value;
        user.updateOne({_id:query._id},{$set:update_doc}).then(doc=>{
            console.log(doc);
            if(doc.nModified==1)
            {
                par_.ResContent.content.result="success";
            }
            else
            {
                par_.ResContent.content.result="fail";
            }
            par.callback(par_);
        });
        
    }
    catch(err)
    {
        console.log(err)
    }
    
}

const list_user = function (query , par)
{
    
    //
    var par_ = general_function.DebugStep(par,"list_user");
    
    user.find(query).then(doc=>{
        par_.ResContent.content.users = doc;
        par_.callback(par_);
    });

}

module.exports.CheckUser = check_user;

//module.exports.LoginByBarcode = user_login_by_barcode;
