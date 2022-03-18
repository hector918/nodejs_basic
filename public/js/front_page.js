
import {top_navbar} from './components/top_navbar.js';

class div {
    
    
    constructor(parent) {

        this.parent = parent;

        this.top_navbar = new top_navbar(this.parent);
 

    }
    
    onlogin_submit(){

        

    }
    
}

export {div as front_page}; 