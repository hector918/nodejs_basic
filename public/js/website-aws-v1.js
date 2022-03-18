import {CE_uni, page_var ,generate_id,raw_post} from './general.js';

class top_navbar {

    constructor(parent) {
        this.parent = parent;
        let herohead = CE_uni("div","hero-head",parent);
        let navbar = CE_uni("nav","navbar",herohead);
        let container = CE_uni("div","container",navbar);
        let navbarbrand = CE_uni("div","navbar-brand",container);
        let navbaritem = CE_uni("a","navbar-item",navbarbrand);
        navbaritem.setAttribute("href","../");
        let img = CE_uni("img","",navbaritem);
        img.setAttribute("src","./images/logo.png");
        img.setAttribute("alt","logo");
        img.setAttribute("style","max-height:5rem;border:none;");
        let burger = CE_uni("span","navbar-burger burger",navbarbrand);
        burger.setAttribute("data-target","navbarMenu");
        CE_uni("span","",burger);
        CE_uni("span","",burger);
        CE_uni("span","",burger);

        let navbarmenu = CE_uni("div","navbar-menu",container);
        navbarmenu.setAttribute("id","navbarMenu");
        let navbarend = CE_uni("div","navbar-end",navbarmenu);
        let tabs = CE_uni("div","tabs is-right",navbarend);
        let ul = CE_uni("ul","",tabs);
        let Home = CE_uni("li","is-active",ul);
        let a = CE_uni("a","",Home,"Home");
        let Examples = CE_uni("li","",ul,'<a href="">Examples</a>');
        let Features = CE_uni("li","",ul,'<a href="">Features</a>');
        let Team = CE_uni("li","",ul,'<a href="">Team</a>');
        let Help = CE_uni("li","",ul,'<a href="">Help</a>');

    }
    onlogin_submit(){
    }
}

class body {

    constructor(parent) {
        this.parent = parent;
        this.self = CE_uni("section","hero is-fullheight is-default is-bold",this.parent);
        let hb = CE_uni("div","hero-body",this.self);
        let bc = CE_uni("div","container has-text-centered",hb);
        let bcc = CE_uni("div","columns is-vcentered",bc);
        let bccc = CE_uni("div","column is-5",bcc);
        let bcccf = CE_uni("figure","image is-4by3",bccc);
        let bcccfi = CE_uni("img","",bcccf);
        bcccfi.setAttribute("src","https://picsum.photos/800/600/?random");
        
        bcccfi.setAttribute("alt","Description");
        bcccfi.setAttribute("style","padding: 5px;border: 1px solid #ccc;")
        let bcc6 = CE_uni("div","column is-6 is-offset-1",bcc);
        CE_uni("h1","title is-2",bcc6,"Superhero Scaffolding");
        CE_uni("h2","subtitle is-4",bcc6,"Let this cover page describe a product or service.");
        CE_uni("br","",bcc6);
        let bcc6p = CE_uni("p","has-text-centered",bcc6);
        this.testbutton = CE_uni("a","button is-medium is-info is-outlined",bcc6p,"Learn more");


    }
    onlogin_submit(){
    }
}

class footer {
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
export {
    top_navbar as hero_head,
    footer as hero_tail,
    body as hero_body,
}; 