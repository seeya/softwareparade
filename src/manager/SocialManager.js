var SocialManager = function() {

};


SocialManager.prototype.shareFacebook = function(caption) {
	ds.post("https://graph.facebook.com/me/feed?", {access_token: loginManager.facebookToken, message: caption}, function(response) {
		cc.log("Post shared on facebook");
	});
};
