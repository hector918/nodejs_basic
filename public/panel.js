import {CE_uni, page_var ,generate_id,raw_post} from './js/general.js';

const language_patch={
    Temp:{
        chn:"温度",
        eng:"temp"
    },
    TMax:{
        chn:"最高温度",
        eng:"max temp"
    },
    TAvg:{
        chn:"平均温度",
        eng:"avg temp"
    },
    GHSspd:{
        chn:"实时速度",
        eng:"GHSspd"
    },
    GHSavg:{
        chn:"平均速度",
        eng:"GHSavg"
    },
    Elapsed:{
        chn:"运行时间",
        eng:"Elapsed"
    },
    Elapsed:{
        chn:"运行时间",
        eng:"Elapsed"
    },
    Freq:{
        chn:"频率",
        eng:"Freq"
    },
    temp_chip1:{
        chn:"芯片1温度",
        eng:"chip1 temp"
    },
    temp_chip2:{
        chn:"芯片2温度",
        eng:"chip2 temp"
    },
    temp_chip3:{
        chn:"芯片3温度",
        eng:"chip3 temp"
    },
    '5sGHS':{
        chn:"实时速度",
        eng:"GHS 5s"
    },
    'avgGHS':{
        chn:"平均速度",
        eng:"GHS avg"
    },
    'Stat':{
        chn:"状态",
        eng:"Stat"
    },
    'ipaddress':{
        chn:"地址",
        eng:"Ip address"
    },
    
}
function get_translation(text){
    try {
        return language_patch[text][page_var.language]
    } catch (error) {
        return text;
    }
}
class top_navbar {

    constructor(parent) {
        this.parent = parent;
        let container = CE_uni("div","container",this.parent);
        let c_row = CE_uni("div","row",container);
        let c_r_c1 = CE_uni("div","col",c_row);
        this.updatetimedisplay = CE_uni("span","badge bg-light text-dark",c_r_c1,"Light");
        /*
        let btnG=CE_uni("div","btn-group",c_r_c1);
        btnG.setAttribute("role","group");
        let b1 = CE_uni("button","btn btn-primary",btnG,"get rigs stats");
        b1.setAttribute("type","button");
        
        b1.addEventListener("click",(e)=>{
            //
            raw_post({action:"get_rigs_status",data:"test"},"./api/v1");
            
        });
        let b2 = CE_uni("button","btn btn-primary",btnG,"middle");
        b2.setAttribute("type","button");

        let b3 = CE_uni("button","btn btn-primary",btnG,"right");
        b3.setAttribute("type","button");
        
        
        */
        let c_row01 = CE_uni("div","row m-1 breathlight",container);
    }
    onlogin_submit(){
        //
    }
}



class body {
    #body = null;

    constructor(parent) {
        this.parent = parent;
        let container = CE_uni("div","container",this.parent);
        let c_row = CE_uni("div","row row-cols-1 row-cols-md-3 g-4",container);
        //let c_r_c = CE_uni("div","col",c_row);
        //this.#body = CE_uni("div","card-group",c_r_c);
        this.#body =c_row;
        this.cards_list={};
        page_var.rigs_status.callback['create_n_update_card']=(json)=>{this.create_n_update_card(json)};
        raw_post({action:"get_rigs_status",data:"test"},"./api/v1");
        setInterval(() => {
            raw_post({action:"get_rigs_status",data:"test"},"./api/v1"); 
        }, 10000);
    }
    onlogin_submit(){
        //
    }
    create_n_update_card(json)
    {
        page_var.header.updatetimedisplay.innerHTML=new Date().Format("yyyy-MM-dd hh:mm:ss");
        /*
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
            </div>*/
        //
        
        for(let x in json.content)
        {
            //
            if(this.cards_list[x]==undefined)
            {
                //
                let col = CE_uni("div","col",this.#body);
                this.cards_list[x]=col;                
            }
            else
            {
                var card = this.cards_list[x].childNodes[0];
                let col = card.parentNode;
                card.remove();
            }
            var card = CE_uni("div","card",col);
            card.classList.remove("border-danger");
            //console.log(json.content.data[x]);
            if(json.content[x]['text']==undefined)
            {
                var pointer = json.content[x];
                let cb1 = CE_uni("div","card-body",card);
                let h5 = CE_uni("h5","card-title",cb1,pointer['name']);
                let p = CE_uni("p","card-text",cb1,get_translation('Stat')+" : "+pointer['Stat']);
                let ul = CE_uni("ul","list-group list-group-flush",card);
                let li00 = CE_uni("li","list-group-item",ul,get_translation('ipaddress')+" : "+x)
                switch(pointer['type'])
                {
                    case "avalon1126pro":
                        //
                        
                        CE_uni("li","list-group-item",ul,get_translation('Elapsed')+" : "+pointer['Elapsed']+" "+get_translation('Freq')+" : "+pointer['Freq'])
                        CE_uni("li","list-group-item",ul,get_translation('Temp')+" : "+pointer['Temp']+" "+get_translation('TMax')+" : "+pointer['TMax']+" "+get_translation('TAvg')+" : "+pointer['TAvg'])
                        CE_uni("li","list-group-item",ul,get_translation('GHSspd')+" : "+pointer['GHSspd']+" "+get_translation('GHSavg')+" : "+pointer['GHSavg'])
                        
                    break;
                    case "antminers19pro":
                        //
                        CE_uni("li","list-group-item",ul,get_translation('Elapsed')+" : "+pointer['Elapsed']+" "+get_translation('Freq')+" : "+pointer['Freq'])
                        CE_uni("li","list-group-item",ul,get_translation('temp_chip1')+" : "+pointer['temp_chip1']+" "+get_translation('temp_chip2')+" : "+pointer['temp_chip2']+" "+get_translation('temp_chip3')+" : "+pointer['temp_chip3'])
                        CE_uni("li","list-group-item",ul,get_translation('5sGHS')+" : "+pointer['5sGHS']+" "+get_translation('avgGHS')+" : "+pointer['avgGHS'])
                    break;
                    case "gminer":
                        
                        CE_uni("li","list-group-item",ul,get_translation('Elapsed')+" : "+pointer['Elapsed']+" "+get_translation('algorithm')+" : "+pointer['algorithm'])
                        CE_uni("li","list-group-item",ul,get_translation('Temp')+" : "+pointer['Temp'])
                        CE_uni("li","list-group-item",ul,get_translation('Fan')+" : "+pointer['Fan'])
                        CE_uni("li","list-group-item",ul,get_translation('pool_speed')+" : "+pointer['pool_speed'])
                    break;
                    default:
                        //
                        let p = CE_uni("p","card-text",cb1,pointer['text']);
                    break;
                }
                

                
            }
            else
            {
                //undefine
                card.classList.add("border-danger");
                let cb1 = CE_uni("div","card-body",card);
                let h5 = CE_uni("h5","card-title",cb1,x);
                let p = CE_uni("p","card-text",cb1,json.content[x]['text']);

            }
            
        }
    }
}

class footer {
    constructor(parent) {
        
    }
    speak() {/*console.log(`${this.parent} makes a noise.`);*/}
}
function get_rigs_status()
{

    //
    
}


export {
    top_navbar as hero_head,
    footer as hero_tail,
    body as hero_body,
}; 