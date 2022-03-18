const general_function = require('./common/general_function');
const auth = require('./auth');

function dispatch(par)
{
    var par_=general_function.DebugStep(par,"dispatch");
    if(par_.SessionDoc==undefined)
    {
        ///如果未登入
        switch(par_.url)
        {
            case "/login":

                par_.callback=(par,encrypt_key)=>{
                    
                    general_function.ResWrite(par,encrypt_key);
                }
                
                
                
                auth.login(par_);
            break;
            default :
                
                
                general_function.ReadStaticFile(par_.url,par_);
            break;
        }
    }
    else
    {
        //如果有登入

    }
}

function process_with_session(par)
{
    var par_=general_function.DebugStep(par,"process_with_session");

}






module.exports = {
    Dispatch : dispatch,

}