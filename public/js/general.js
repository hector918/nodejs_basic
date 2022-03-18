import {page_var} from './page_var_get_set.js';
//////////////////////////////////////////////////////////
function loadStyle(url){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
    return link;
}
//loadStyle('test.css');
function loadCssCode(code){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    try{
        //for Chrome Firefox Opera Safari
        style .appendChild(document.createTextNode(code));
    }catch(ex){
        //for IE
        style.styleSheet.cssText = code;
    }
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    return style;
}
//loadCssCode('body{background-color:#f00}');
function CE_uni(tagname,classname,parent,innerhtml,pointer)
{
    //
    var obj=document.createElement(tagname);
    obj.setAttribute("class",classname);
    if(innerhtml)
    {
        obj.innerHTML=innerhtml;
    }
    
    
    if(pointer)
    {
        parent.insertBefore(obj,pointer);
        //parent.appendChild(obj);
    }
    else
    {
    	if(parent)
    	{
    		parent.appendChild(obj);
    	}
        
    }
    
    
    return obj;
}
function generate_id(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function ce_json(json)
{
    var root={
        self : null,
        childrens : [],
    };
    root['self'] = document.createElement(json['tagname']);
    for(var x in json)
    {
        switch(x)
        {
            case "childrens":
                for(var o in json[x])
                {
                    var children = ce_json(json[x][o]);

                    root.self.appendChild(children.self);
                    root['childrens'].push(children);
                    
                }
                
            break;
            case "innerHTML":
                root.self.innerHTML=json[x];
            break;
            default :
                root['self'].setAttribute(x,json[x]);
            break;
            
        }
    }
    return root;
}

function send_request()
{
    //
}
function raw_post(data,path)
{
    //
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            process_receive_normal(this.responseText);
        }
    };
    
    xhttp.open("POST", path );
    xhttp.send("at="+JSON.stringify(data));
}
function process_receive_normal(text)
{
    let res = JSON.parse(text);
    
    switch(res.action)
    {
        case "get_rigs_status":
            
            page_var.rigs_status.list = res;
            
        break;
        default:
        break;
    }

    
}
function process_receive(text)
{
    let response = decrypt_response(text);
    for(var x in response)
    {
        switch(x)
        {
            case "result":
                switch(response[x])
                {
                    case "Auth Failed":
                        console.log("logout");
                    break;
                    default:
                        console.log(response[x]);
                    break;
                }
            break;
            case "LoginResult":
                page_var['root'].destory();
                import('./front_page.js').then((module) => {
                    page_var['root'] = new module.front_page(document.body);
                    
                });
            break;
            default:
                console.log(x);
                console.log(response[x]);
            break;
        }
        
    }
}

function decrypt_response(text)
{

    try {
        
        let key = page_var['sha256key'];
        var encryptedBytes = aesjs.utils.hex.toBytes(text);
                        
        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return JSON.parse(decryptedText);
    } catch (error) {
        
        return {result:"Auth Failed"}
    }
}

function send_login()
{

}

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export {
    CE_uni,
    page_var,
    send_request,
    send_login,
    ce_json,
    generate_id,
    raw_post,
    loadStyle,
};
/*  <section class="section">
    <div class="container">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
    </div>
  </section>
  */