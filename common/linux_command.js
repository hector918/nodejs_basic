function exec(callback)
{
    var exec = require('child_process').exec;

    var cmdStr = 'ls -l';
    
    exec(cmdStr, function (err, stdout, srderr) {
    
        if(err) {
            callback(err);
            console.log(srderr);
        
        } else {
            callback(stdout);
            console.log(stdout);
        
        }
    
    });
}
module.exports = {
    linux_exec : exec,
}