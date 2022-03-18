import {raw_post} from "./general.js";
import {page_var} from './page_var_get_set.js';
import {section_hero} from './website-aws-v2.js';

function get_devices_list_()
{
    //
    
    Object.defineProperty(page_var.mihome_devices_list, 'list', {
        set: function(value) {
            let filter = ["did","name","desc","method","model","rssi","ssid","prop","monitor_selected"];
            page_var.section.body.clear_all_tiles();
            for(let x in value.data)
            {
                
                page_var.section.body.add_tile(value.data[x]);
            }
            this._list = value;
        }
      });
    raw_post({action:"get_devices_list",data:"dsahdjaskhdjkasa"},"./api/v1");
}


export {
    get_devices_list_ as get_devices_list
}; 