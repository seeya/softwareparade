var LoginManager = function() {

}

LoginManager.prototype.loginFacebook = function() {
    var that = this;
    ds.login("imtheboss", function(response) {
    	if(response) {
    		sceneManager.transit("MenuScene");
    	}
    });
};


LoginManager.prototype.logoutFacebook = function() {

}
LoginManager.prototype.loginSoftwareParade = function(facebookId) {
	// check if token exists else post to backend with facebook id

};

LoginManager.prototype.statusChangeCallback = function(response) {
	var that = this;


};
