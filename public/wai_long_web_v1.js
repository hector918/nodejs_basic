
class tree_to_obj
{
    //
    //constructor(tree)
    
    constructor(parent,tree)
    {
        
        return this.ce(parent,tree)
                
        
        
        
    }
    ce(parent,tree)
    {
        /*/
            {
                tag : "div",
                attr : {
                    name : "abc",
                },
                event : {
                    click : null,
                },
                export : "abcd",
                childs : [

                ]
            }
        /*/
        var result = {};
        if(Array.isArray(tree))
        {
            //
            for(let x in tree)
            {
                if(tree[x]['tag']==undefined)
                {
                    continue
                }
                else
                {
                    //
                    var obj=document.createElement(tree[x]["tag"]);
                    parent.appendChild(obj);
                }

                for(let y in tree[x])
                {
                    switch(y)
                    {
                        case "tag":
                        break;
                        //case "class":
                        //break;
                        case "children":
                            
                            this.ce(obj,tree[x]['children']);
                        break;
                        case "html":
                            obj.innerHTML = tree[x]['html'];
                        break;
                        case "event":

                        break;
                        default:
                            //
                            obj.setAttribute(y,tree[x][y]);
                        break;
                    }
                }
                
                
            }
        }
        else
        {
            
        }
        
        return obj;
        
        
    }
}

export {
    tree_to_obj,
};