import {CE_uni, page_var ,generate_id,raw_post} from '../general.js';


class div {
    
    
    constructor(parent) {

        this.parent = parent;
        this.self = CE_uni("nav","navbar",parent);
        this.self.setAttribute("role","navigation");
        this.self.setAttribute("aria-label","main navigation");

        var brand = CE_uni("div","navbar-brand",this.self);
        var a = CE_uni("a","navbar-item",brand);
        var img = CE_uni("img","",a);
        img.setAttribute("src","https://cdn.jsdelivr.net/gh/vmlite/s/bulma/images/bulma-logo.png");
        img.setAttribute("width","112");
        img.setAttribute("height","28");
/*
<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
  <span aria-hidden="true"></span>
</a>
*/
        var a = CE_uni("a","navbar-burger",brand);
        a.setAttribute("role","button");
        a.setAttribute("aria-label","menu");
        a.setAttribute("aria-expanded","false");
        a.setAttribute("data-target","top_navbar");
        var span = CE_uni("span","",a);
        span.setAttribute("aria-hidden","true");
        var span = CE_uni("span","",a);
        span.setAttribute("aria-hidden","true");
        var span = CE_uni("span","",a);
        span.setAttribute("aria-hidden","true");

        var menu = CE_uni("div","navbar-menu",this.self);
        menu.setAttribute("id","top_navbar");
        var div = CE_uni("div","navbar-start",menu);
        var a = CE_uni("a","navbar-item",div,"Home");
        var a = CE_uni("a","navbar-item",div,"Documentation");
        var dropdown = CE_uni("div","navbar-item has-dropdown is-hoverable",div);
        var a = CE_uni("a","navbar-link",dropdown,"More");
        var dropdown_item = CE_uni("div","navbar-dropdown",dropdown)
        ;
        var a = CE_uni("a","navbar-item",dropdown_item,"About");
        var a = CE_uni("a","navbar-item",dropdown_item,"Jobs");
        var a = CE_uni("a","navbar-item",dropdown_item,"Contact");
        var hr = CE_uni("hr","navbar-divider",dropdown_item);
        var a = CE_uni("a","navbar-item",dropdown_item,"Report an issue");
        

        var div = CE_uni("div","navbar-end",menu);
        var item = CE_uni("div","navbar-item",div);
        var buttons = CE_uni("div","buttons",item);
        var a = CE_uni("a","button is-primary",buttons);
        CE_uni("strong","",a,"Sign up");
        var a = CE_uni("a","button is-light",buttons,"log in ");
        
    }
    
    onlogin_submit(){

    }
    
}
/*
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
      <img src="https://cdn.jsdelivr.net/gh/vmlite/s/bulma/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
*/
export {div as top_navbar}; 