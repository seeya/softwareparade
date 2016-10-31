var LoginManager = function() {

}

LoginManager.prototype.loginFacebook = function() {
    if(this.isLoggedIn() != null)
    	sceneManager.transit("MenuScene");
    else
    	sdkbox.PluginFacebook.login(["public_profile", "email"]);
};


LoginManager.prototype.onLogin = function(isLogin, msg) {
	var that = this;
	// Login Successful in FB
	console.log("Checking login status");
	if(isLogin) {
		//Login SoftwareParage
	    ds.login(sdkbox.PluginFacebook.getUserID(), function(response) {
	    	if(response) {// Account Found
				cc.sys.localStorage.setItem("facebookId", sdkbox.PluginFacebook.getUserID());
	    		sceneManager.transit("MenuScene");
	    	}
	    	else // Account Not Found, Register New Account
	    		sceneManager.transit("RegisterScene", {name: "Test"});
	  
	    });
	}
	else {

	}
}

LoginManager.prototype.isLoggedIn = function(id) {
	if(id)
		cc.sys.localStorage.setItem("facebookId", id);
	else
		return cc.sys.localStorage.getItem("facebookId");
};


LoginManager.prototype.logoutFacebook = function() {
	cc.sys.localStorage.removeItem("facebookId");
	sdkbox.PluginFacebook.logout();
}

LoginManager.prototype.loginSoftwareParade = function(facebookId) {
	// check if token exists else post to backend with facebook id

};
