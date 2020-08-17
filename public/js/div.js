import {CE_UNIVERSAL,ce_json} from './general.js';


class div {
    constructor(parent) {
        this.parent = parent;

        this.self = document.createElement("div");
        parent.appendChild(this.self);
        this.self.classList.add("container");
        
        this.h1 = document.createElement("h1");
        this.self.appendChild(this.h1);
        this.h1.classList.add("title");
        this.h1.innerHTML = "Hello World";

        this.p = document.createElement("p");
        this.self.appendChild(this.p);
        this.p.classList.add("subtitle");
        this.p.innerHTML = "My first website with <strong>Bulma</strong>!";

    }

    speak() {
        console.log(`${this.parent} makes a noise.`);
    }
}
export {div}; 
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