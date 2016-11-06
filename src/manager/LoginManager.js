var LoginManager = function() {
	this.isInitialized = false;
	this.w = null;
	this.facebookToken = ds.getKV("facebookToken");
	this.facebookId = ds.getKV("facebookId");
	this.name = ds.getKV("name");
}

LoginManager.prototype.loginFacebook = function() {
	var that = this;

	// If Facebook Token and Facebook Id Exist
    if(this.facebookToken != null && this.facebookId != null && this.name != null) {
    	// Login Software Parade
		this.loginSoftwareParade(this.facebookId, "Name");   	
    }
    else {
    	this.w = new ccui.WebView();
    	this.w.loadURL("https://www.facebook.com/dialog/oauth?client_id=1043603122426009&response_type=token&redirect_uri=http://hexabot.no-ip.org:8000/token.php");
    	this.w.setContentSize(cc.winSize.width, cc.winSize.height);
        this.w.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
        this.w.setEventListener(ccui.WebView.EventType.LOADED, function(sender, url){
        	if(url.indexOf("access_token") !== -1) {
        		// Parse Token
        		that.facebookToken = url.split("access_token=")[1].split("&")[0];
        		
        		// Save Token to Disk
        		ds.setKV("facebookToken", that.facebookToken);

        		// Remove WebView
        		cc.director.getRunningScene().removeChild(that.w);
				
        		// Get Facebook Name and Id
				ds.get("https://graph.facebook.com/me", {access_token: that.facebookToken}, function(response) {
					that.name = response.name;
					that.facebookId = response.id;

					// Save Values
					ds.setKV("name", response.name);
					ds.setKV("facebookId", response.id);

					// Login Software Parade
					that.loginSoftwareParade(response.id, response.name);
	    		});        		
        	}
        	else
        		cc.log("not found");
        });
    	cc.director.getRunningScene().addChild(this.w);
    }
};


LoginManager.prototype.logoutFacebook = function() {
	cc.sys.localStorage.removeItem("facebookToken");
	cc.sys.localStorage.removeItem("facebookId");
	cc.sys.localStorage.removeItem("name");
	this.facebookToken = null;
	this.facebookId = null;
	this.name = null;
}

LoginManager.prototype.loginSoftwareParade = function(facebookId, name) {
	ds.login(facebookId, function(response) {
		if(response)
			sceneManager.transit("MenuScene");
		else
			sceneManager.transit("RegisterScene", {name: name});
	});    	
};
