import {CE_uni, generate_id,raw_post,loadStyle} from './general.js';
import {page_var} from './page_var_get_set.js';
class top_navbar {

    constructor(parent) {
        this.parent = parent;
        let section = CE_uni("section","hero is-info is-medium is-bold",this.parent);

        let herohead = CE_uni("div","hero-head",section);
        let navbar = CE_uni("nav","navbar",herohead);
        let container = CE_uni("div","container",navbar);
        let navbarbrand = CE_uni("div","navbar-brand",container);
        let nbba = CE_uni("a","navbar-item",navbarbrand);
        nbba.setAttribute("href","../");
        let nbbai = CE_uni("img","",nbba);
        nbbai.setAttribute("src","https://bulma.io/images/bulma-type-white.png");
        nbbai.setAttribute("alt","Logo");

        let nbbs = CE_uni("span","navbar-burger burger",navbarbrand);
        nbbs.setAttribute("data-target","navbarMenu");
        CE_uni("span","",nbbs);
        CE_uni("span","",nbbs);
        CE_uni("span","",nbbs);

        let navbarMenu = CE_uni("div","navbar-menu",container);
        navbarMenu.setAttribute("id","navbarMenu");
        let nbmnbe = CE_uni("div","navbar-end",navbarMenu);
        let nbmnbet = CE_uni("div","tabs is-right",nbmnbe);
        let nbmnbetu = CE_uni("ul","",nbmnbet);
        CE_uni("li","is-active",nbmnbetu,"<a>Home</a>");
        CE_uni("li","",nbmnbetu,"<a>Examples</a>");
        CE_uni("li","",nbmnbetu,"<a>Features</a>");
        CE_uni("li","",nbmnbetu,"<a>Team</a>");
        CE_uni("li","",nbmnbetu,"<a>Help</a>");
        
        let nbmnbets = CE_uni("span","navbar-item",nbmnbet);
        
        let nbmnbetsa = CE_uni("a","button is-white is-outlined",nbmnbets);
        //export button
        this.testbutton = nbmnbetsa;
        //nbmnbetsa.addEventListener("click",eventlist)
        

        //nbmnbetsa.setAttribute("href","https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/hero.html");
        let nbmnbetsas = CE_uni("span","icon",nbmnbetsa);
        CE_uni("i","fab fa-github",nbmnbetsas);
        CE_uni("span","",nbmnbetsa,"View Github").setAttribute("title","Hello from the other side");


        let hero_body = CE_uni("div","hero-body",section);
        let hbc = CE_uni("div","container has-text-centered",hero_body);
        CE_uni("h1","title",hbc,"The new standard in &lt;insert industry here&gt;");
        CE_uni("h2","subtitle",hbc,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
        
    }
    onlogin_submit(){
    }
}

class colum_with_shady_card {
    constructor(parent,icon,content)
    {
        this.parent = parent;
        this.self = CE_uni("div","column is-4",this.parent);
        let cardis = CE_uni("div","card is-shady",this.self);
        let cardisd = CE_uni("div","card-image has-text-centered",cardis);
        CE_uni("i",icon,cardisd);

        let cardcontent = CE_uni("div","card-content",cardis);
        cardcontent.appendChild(content);
        //let content = CE_uni("div","content",cardcontent);
    }
}

class single_tile{
    constructor(parent,content)
    {
        this.parent = parent;
        for(let x in content)
        {
            let tad = CE_uni("div",content[x].class,parent);
            
            if(content[x].face_color!=undefined)
            {
                var tada = CE_uni("article","tile is-child notification "+content[x].face_color,tad);
            }
            else
            {
                var tada = CE_uni("article","tile is-child notification is-white",tad);
            }
            for(let y in content[x].tile_detail)
            {
                
                let tile_detail = content[x].tile_detail[y];
                CE_uni("p","title",tada,tile_detail.title);
                CE_uni("p","subtitle",tada,tile_detail.subtitle);
                switch(typeof(tile_detail.content))
                {
                    case "string":
                        CE_uni("div","content",tada,tile_detail.content);
                    break;
                    case "object":
                        let content_div = CE_uni("div","content",tada);
                        for(var obj_list in tile_detail.content)
                        {
                            content_div.appendChild(tile_detail.content[obj_list]);
                        }
                    break;
                }
            }            
        }
    }
}

class hero_body {

    constructor(parent) {
        this.parent = parent;
        this.self = CE_uni("section","container",this.parent);

        let colfeat = CE_uni("div","columns features",this.self);
        
        let content01 = CE_uni("div","content",this.self);
        CE_uni("h4","",content01,"Tristique senectus et netus et. ");
        CE_uni("p","",content01,"Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam. ");
        CE_uni("p","",content01,'<a href="#">Learn more</a>');
        new colum_with_shady_card(colfeat,"fa fa-paw",content01);

        let content02 = CE_uni("div","content",this.self);
        CE_uni("h4","",content02,"Tempor orci dapibus ultrices in.");
        CE_uni("p","",content02,"Ut venenatis tellus in metus vulputate. Amet consectetur adipiscing elit pellentesque. Sed arcu non odio euismod lacinia at quis risus. Faucibus turpis in eu mi bibendum neque egestas cmonsu songue. Phasellus vestibulum lorem sed risus.");
        CE_uni("p","",content02,'<a href="#">Learn more</a>');
        new colum_with_shady_card(colfeat,"fa fa-empire",content02);
        
        let content03 = CE_uni("div","content",this.self);
        CE_uni("h4","",content03," Leo integer malesuada nunc vel risus. ");
        CE_uni("p","",content03,"Imperdiet dui accumsan sit amet nulla facilisi morbi. Fusce ut placerat orci nulla pellentesque dignissim enim. Libero id faucibus nisl tincidunt eget nullam. Commodo viverra maecenas accumsan lacus vel facilisis.");
        CE_uni("p","",content03,'<a href="#">Learn more</a>');
        new colum_with_shady_card(colfeat,"fa fa-apple",content03);

        let intro_column = CE_uni("div","intro column is-8 is-offset-2",this.self);
        CE_uni("h2","title",intro_column,"Perfect for developers or designers!");
        CE_uni("br","",intro_column);
        CE_uni("p","subtitle",intro_column,"Vel fringilla est ullamcorper eget nulla facilisi. Nulla facilisi nullam vehicula ipsum a. Neque egestas congue quisque egestas diam in arcu cursus.");

        let sandbox = CE_uni("div","sandbox",this.self);
        this.sandbox = sandbox;
        let ta01 = CE_uni("div","tile is-ancestor",sandbox);
        new single_tile(
            ta01,
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "Hello World",
                    subtitle : "What is up?",
                    content : ""
                }]
            }]
        )
        new single_tile(
            ta01,
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "Foo",
                    subtitle : "Bar",
                    content : ""
                }]
            }]
        )
        new single_tile(
            ta01,
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "Third column",
                    subtitle : "With some content",
                    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>"
                }]
            }]
        )
        
        let ta02 = CE_uni("div","tile is-ancestor",sandbox);
        let ta02d = CE_uni("div","tile is-vertical is-8",ta02);
        let ta02dt = CE_uni("div","tile",ta02d);

        let download_button = CE_uni("button","button is-link",null,"Download File");
        download_button.addEventListener("click",(event)=>{
            const startTime = new Date().getTime();
            request = new XMLHttpRequest();
            request.responseType = "blob";
            request.open("get",IMG_URL,true);
            request.send();
            request.onreadystatechange = function (){
                if(this.readyState == 4 && this.status == 200)
                {
                    const imageURL = window.URL.createObjectURL(this.response);
                    const anchor = document.createElement("a");
                    anchor.href = imageURL;
                    anchor.download = FILE_NAME;
                    document.body.appendChild(anchor);
                    anchor.click();
                }
            }
            request.onprogress = function (e) {
                const percent_complete = Math.floor((e.loaded / e.total) * 100);
                const duration = (new Date().getTime() - startTime)/1000;
                const bps = e.loaded / duration;
                const kbps = Math.floor(bps / 1024);
                const time = (e.total - e.loaded)/bps;
                const seconds = Math.floor(time % 60);
                const minutes = Math.floor(time / 60);
                console.log(`${percent_complete}% - ${kbps} Kbps - ${minutes} min ${seconds} sec remaining`);
            }
        });


        new single_tile(
            ta02dt,
            [{
                class : "tile is-parent is-vertical",
                tile_detail : [{
                    title : "Vertical tiles",
                    subtitle : "Top box",
                    content : ""
                },
                {
                    title : "Vertical tiles",
                    subtitle : "Bottom box",
                    content : [download_button] 
                }]
            }]
        )
        new single_tile(
            ta02dt,
            [{
                class : "tile is-parent",
                tile_detail : [
                    {
                        title : "Middle box",
                        subtitle : "With an image",
                        content : '<figure class="image is-4by3">                        <img src="https://picsum.photos/640/480/?random" alt="Description">                    </figure>'
                    }
                ]
            }]
        )

        new single_tile(
            ta02d,
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "Wide column",
                    subtitle : "Aligned with the right column",
                    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>"
                }]
            }]
        )

        let ta02t_content=[
            CE_uni("p","title",this.parent,"Tall column"),
            CE_uni("p","subtitle",this.parent,"With even more content"),
            CE_uni("div","content",this.parent,'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p><p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p><p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquamut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>'),
        ]
        new single_tile(
            ta02,
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "",
                    subtitle : "",
                    content : ta02t_content
                }]
            }]
        )

        let ta03 = CE_uni("div","tile is-ancestor",sandbox);
        new single_tile(
            ta03,
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "Side column",
                    subtitle : "With some content",
                    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>"
                }]
            }]
        )
        new single_tile(
            ta03,
            [{
                class : "tile is-parent is-8 is-shady",
                tile_detail : [{
                    title : "Main column",
                    subtitle : "With some content",
                    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>"
                }]
            }]
        )
        let ta04 = CE_uni("div","tile is-ancestor",sandbox);
        new single_tile(
            ta04,
            [{
                class : "tile is-parent is-8 is-shady",
                tile_detail : [{
                    title : "Murphy's law",
                    subtitle : "Anything that can go wrong will go wrong",
                    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>"
                }]
            }]
        )
        new single_tile(
            ta04,
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "Main column",
                    subtitle : "With some content",
                    content : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>"
                }]
            }]
        )
    }
    clear_all_tiles()
    {
        //
        this.sandbox.innerHTML="";
    }
    get_col()
    {
        const cell_of_col = 3;
        let last_col = this.sandbox.lastChild;
        if(this.sandbox.lastChild==null)
        {
            return CE_uni("div","tile is-ancestor",this.sandbox);
        }
        if(cell_of_col<=last_col.childNodes.length)
        {
            return CE_uni("div","tile is-ancestor",this.sandbox);
        }
        else
        {
            return last_col;
        }

        
    }
    add_tile(tile_info)
    {
        //
        let content=[
            CE_uni("p","",this.parent,"did &#10148; "+tile_info.did),
            CE_uni("p","",this.parent,"model &#10148; "+tile_info.model),
            CE_uni("p","",this.parent,"desc &#10148; "+tile_info.desc),
            CE_uni("p","",this.parent,"method &#10148; "+JSON.stringify(tile_info.method)),
            CE_uni("p","",this.parent,"ssid &#10148; "+tile_info.ssid),
            CE_uni("p","",this.parent,"rssi &#10148; "+tile_info.rssi),
        ];
        
        new single_tile(
            this.get_col(),
            [{
                class : "tile is-parent is-shady",
                tile_detail : [{
                    title : "name &#10148; " + tile_info.name,
                    subtitle : "prop &#10148;" + JSON.stringify(tile_info.prop),
                    content : content
                }],
                face_color : tile_info.monitor_selected==1?"is-primary":"is-white",
            }]
        )
    }
    onlogin_submit(){
        //
        
    }
}

class hero_footer {
    constructor(parent) {
        this.self = CE_uni("div","hero-foot",parent);
        let container = CE_uni("div","container",this.self);
        let cols = CE_uni("div","columns",container);
        let c01 = CE_uni("div","column is-3 is-offset-2",cols);
        let c01h2 = CE_uni("h2","",c01,"<strong>Category</strong>");
        let c01ul = CE_uni("ul","",c01);
        CE_uni("li","",c01ul,'<a href="#">Vestibulum errato isse</a>');
        CE_uni("li","",c01ul,'<a href="#">Aisia caisia</a>');
        CE_uni("li","",c01ul,'<a href="#">Flimsy Lavenrock</a>');
        CE_uni("li","",c01ul,'<a href="#">Maven Mousie Lavender</a>');

        let c02 = CE_uni("div","column is-3",cols);
        CE_uni("h2","",c02,"<strong>Category</strong>");
        let c02ul = CE_uni("ul","",c02);
        CE_uni("li","",c02ul,'<a href="#">Labore et dolore magna aliqua</a>');
        CE_uni("li","",c02ul,'<a href="#">Kanban airis sum eschelor</a>');
        CE_uni("li","",c02ul,'<a href="#">Course Correction</a>');
        CE_uni("li","",c02ul,'<a href="#">Better Angels</a>');

        let c03 = CE_uni("div","column is-4",cols);
        CE_uni("h2","",c03,"<strong>Category</strong>");
        let c03ul = CE_uni("ul","",c03);
        CE_uni("li","",c03ul,'<a href="#">Objects in space</a>');
        CE_uni("li","",c03ul,'<a href="#">Playing cards with coyote</a>');
        CE_uni("li","",c03ul,'<a href="#">Future Shock</a>');
    ////////////////////////////////////////////
        let content = CE_uni("div","content has-text-centered",container);
        let cp = CE_uni("p","",content);
        let cpa = CE_uni("a","icon",cp);
        cpa.setAttribute("href","https://github.com/BulmaTemplates/bulma-templates");
        CE_uni("i","fab fa-github",cpa);

        let cc = CE_uni("div","control level-item",content);
        let cca = CE_uni("a","",cc);
        cca.setAttribute("href","https://github.com/BulmaTemplates/bulma-templates");
        let ccad = CE_uni("div","tags has-addons",cca);
        CE_uni("span","tag is-dark",ccad,"Bulma Templates");
        CE_uni("span","tag is-info",ccad,"MIT license");
    }
    speak() {/*console.log(`${this.parent} makes a noise.`);*/}
}



class section_hero{
        
    constructor(parent){

      this.parent = parent;//,this.destory.bind(this)
      this.header = new top_navbar(parent);

      let box_cta = CE_uni("div","box cta",parent);
      let bcp = CE_uni("p","has-text-centered",box_cta);
      CE_uni("span","tag is-primary",bcp,"New");
      CE_uni("span","",bcp," Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

      this.body = new hero_body(parent);
      this.footer = new hero_footer(parent);
      
      this.onload();
    }
    onload()
    {
      this.css_list = [];
      this.css_list.push(loadStyle("./css/hero.css"));
      this.css_list.push(loadStyle("./css/modal-fx.min.css"));
    }
    destory()
    {
      for(let y = this.parent.childNodes.length-1;y>0;y-- )
      {
        if(this.parent.childNodes[y].tagName){
          this.parent.childNodes[y].remove();
        }
      }
      //this.parent.remove();
      for(let x in this.css_list)
      {
        this.css_list[x].remove();
      }

    }
}
export {
    top_navbar as hero_head,
    hero_footer as hero_tail,
    hero_body as hero_body,
    section_hero as section_hero,
}; 