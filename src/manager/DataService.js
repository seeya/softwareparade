var DataService = function() {
	this.token = null;
	this.user = null;
	this.endpoint = "http://spapi.t05.sg/game/";
}

DataService.prototype.login = function(facebookId, cb) {
	var that = this;
	console.log("Facebook id: " + facebookId);
	this.post('login', {facebookId: facebookId}, function(response) {
		if(response == "not found") {
			return cb(false);
		}
		else {
			that.token = response.sessionToken;
			that.user = {
				facebookId: response.facebookId,
				name: response.name
			}
			cb(true);
			return;
		}
		return cb(false);
	});
	
};

DataService.prototype.register = function(name, facebookId) {
	this.post('register', {facebookId: facebookId, name: name});
};

DataService.prototype.getHighscore = function(gameId) {

};

DataService.prototype.setHighscore = function(score) {

};

DataService.prototype.joinClassroom = function(code) {

};

DataService.prototype.getGames = function() {
	return new Promise(function(resolve, reject) {
		resolve({name: 'Whack-a-Requirement'});
	});
};

// Post a request to an endpoint with a dictionary of parameters
DataService.prototype.post = function(link, params, cb) {
	var that = this;
    var loader = new ccui.Button();
    loader.setTouchEnabled(true);
    loader.setScale9Enabled(true);
    loader.loadTextures(res.profile_png, res.profile_highlighted_png, "");
    loader.x = (cc.winSize.width-75)/2;
    loader.y = (cc.winSize.height-75)/2;
    loader.setContentSize(cc.size(75, 75));	

	cc.director.getRunningScene().addChild(loader);
	var xhr = cc.loader.getXMLHttpRequest();

	xhr.open("POST", this.endpoint + link);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	                          
	xhr.onreadystatechange = function () {
		cc.director.getRunningScene().removeChild(loader);

		if ( xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 ) ) {
		    cc.log( JSON.parse(xhr.responseText));
		    cb(JSON.parse(xhr.responseText));
		}
	}

	var str = "";
	for (var key in params) {
	    if (str != "") 
	        str += "&";
	    str += key + "=" + encodeURIComponent(params[key]);
	}

	xhr.send(str);


};