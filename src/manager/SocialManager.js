var SocialManager = function() {

};


SocialManager.prototype.shareFacebook = function(caption) {

	
};

SocialManager.prototype.onFacebookShareSuccess = function(data) {

};

SocialManager.prototype.onFacebookShareFailed = function(data) {

};

SocialManager.prototype.onFacebookShareCancel = function(data) {

};

SocialManager.prototype.onFacebookAPI = function(tag, data) {
	cc.log("============");
      cc.log("tag=%s", tag);
      cc.log("data=%s", data);
      if (tag == "me") {
        var obj = JSON.parse(data);
        cc.log(obj.name + " || " + obj.email);
      } 
};

