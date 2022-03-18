var page_var = {
    token : "",
    requests_line : [],
    messages_line : [],
    sha256key : null,
    rigs_status : {
        get list() {
            return this._list;
        },
      
        set list(value) {
            this._list = value;
            for(var x in this.callback)
            {
                this.callback[x](value);
            }
        },
        callback:{},
        _list : {}
    },
    language : "eng",
}
export {
    page_var,
};