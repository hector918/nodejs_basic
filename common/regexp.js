
module.exports.name = {
	validator : function (v){
		//用户名正则，4到16位（字母，数字，下划线，减号）
		var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
		//输出 true
		//console.log(uPattern.test(v));
		return uPattern.test(v);
	},
	message : "4-16 chars , number alphabet dash and underscore."
}

module.exports.no_blank = {
	validator : function (v){
		//不能 为空
		
		return v.trim()!='';
	},
	message : "cant be blank."
}

module.exports.tags_bak = {
	validator: function (v) {
        
        return v.length > 10
    },
    message: 'You must provide more than 1 tag.'
}
