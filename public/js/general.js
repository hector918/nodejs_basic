var page_var = {
    token : "",
    requests_line : [],
    messages_line : [],
    sha256key : null,
}

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
            
            process_receive(this.responseText);
        }
    };
    
    xhttp.open("post", path );
    xhttp.send(data);
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


export {
    CE_uni,
    page_var,
    send_request,
    send_login,
    ce_json,
    generate_id,
    raw_post,
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