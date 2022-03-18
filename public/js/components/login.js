import {CE_uni, page_var ,generate_id,raw_post} from '../general.js';


class div {
    
    speak(){
        console.log(`${this.parent} makes a noise.`);
    }
    
    constructor(parent) {

        this.parent = parent;
        this.self = CE_uni("section","hero is-dark is-fullheight is-primary is-bold",parent);
        var body=CE_uni("div","hero-body",this.self);
        var container = CE_uni("div","container",body);

        var columns = CE_uni("div","colums is-centered is-flex is-horizontal-center",container);
        var figure = CE_uni("figure","image is-128x128",columns);
        var img = CE_uni("img","is-rounded border-5px",figure);
        img.setAttribute("src","https://bulma.io/images/placeholders/128x128.png");

        var columns = CE_uni("div","colums is-centered is-flex is-horizontal-center",container);
        var column = CE_uni("div","column is-6-tablet is-4-desktop is-5-widescreen  has-text-centered",columns);
        var hr = CE_uni("hr","login-hr",column);
        var h3 = CE_uni("h3","title has-text-white",column,"Login");
        
        //var p = CE_uni("p","subtitle has-text-white",column,"Please login !");

        var columns = CE_uni("div","colums is-centered is-flex is-horizontal-center",container);
        var column = CE_uni("div","column is-6-tablet is-4-desktop is-5-widescreen",columns);

        var form = CE_uni("form","box",column);
        form.addEventListener("submit",()=>{this.onlogin_submit()});
        var field = CE_uni("div","field",form);
        var label = CE_uni("label","label",field,"Account");

        var control = CE_uni("div","control has-icons-left",field);
        this.username_input = CE_uni("input","input",control);
        this.username_input.setAttribute("placeholder","e.g. your account",control);
        this.username_input.setAttribute("required","");
        var span = CE_uni("span","icon is-small is-left",control);
        var i = CE_uni("i","fa fa-envelope",span);

        var field = CE_uni("div","field",form);
        var label = CE_uni("label","label",field,"password");
        var control = CE_uni("div","control has-icons-left",field);
        this.password_input = CE_uni("input","input",control);
        this.password_input.setAttribute("type","password");
        this.password_input.setAttribute("placeholder","********");
        this.password_input.setAttribute("required","");
        var span = CE_uni("span","icon is-small is-left",control);
        var i = CE_uni("i","fa fa-lock",span);

        var field = CE_uni("div","field",form);
        var button = CE_uni("button","button is-success",field,"Login");

    }
    
    onlogin_submit(){

        event.preventDefault();//取消系统提交

        var raw_key = this.username_input.value;
        raw_key = raw_key.concat(this.password_input.value);

        var key = sha256.array(raw_key);
       
        //var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
        
        var salt = generate_id(10);
        raw_key = this.username_input.value.concat(salt);
        raw_key = raw_key.concat(this.password_input.value);
        page_var['sha256key'] = sha256.array(raw_key);
        
        
        var login_json = {

            timestamp : Date.now(),
            account : this.username_input.value,
            random_id : salt,
        }

        var shuffle = {}
        for(var x=0;x<3;x++)
        {
            let index =Math.floor(Math.random()*Object.keys(login_json).length);
            shuffle[Object.keys(login_json)[index]]=login_json[Object.keys(login_json)[index]];
            delete login_json[Object.keys(login_json)[index]];
            
        }

        // Convert text to bytes
        var text = JSON.stringify(shuffle);
        var textBytes = aesjs.utils.utf8.toBytes(text);
        
        // The counter is optional, and if omitted will begin at 1
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);
        
        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        console.log(encryptedHex);
        
        var formdata = {
            username : this.username_input.value,
            text : encryptedHex,
        }

        raw_post(JSON.stringify(formdata),"/login");


        // When ready to decrypt the hex string, convert it back to bytes
        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        console.log(decryptedText);
        // "Text may be any length you wish, no padding is required."
        
        

    }
    destory(){
        this.parent.removeChild(this.self);
    }
}
export {div}; 