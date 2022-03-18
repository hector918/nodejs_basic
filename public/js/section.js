import {div} from './div.js';
import {CE_UNIVERSAL} from './general.js';

class section { 
    constructor(parent) {
        
        this.parent = parent;

        this.self = document.createElement("div");
        parent.appendChild(this.self);
        this.self.classList.add("container");

        this.div = new div(this.self);
       
    }

    speak() {
        console.log(`${this.parent} makes a noise.`);
    }
}

export {section}; 