var DataService = function() {
	this.token = null;
	this.user = null;
	this.endpoint = "http://spapi.t05.sg/game/";
}

DataService.prototype.login = function(facebookId, cb) {
	var that = this;
	this.post(this.endpoint + 'login', {facebookId: facebookId}, function(response) {
		if(response.msg == "not found") {
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
	var that = this;
	this.post(this.endpoint + 'register', {facebookId: facebookId, name: name}, function(response) {
		that.token = response.token;
	});
};

DataService.prototype.getHighscore = function(gameId) {

};

DataService.prototype.setHighscore = function(score) {

};

DataService.prototype.joinClassroom = function(code) {

};

DataService.prototype.setKV = function(key, value) {
	cc.sys.localStorage.setItem(key, value);
};

DataService.prototype.getKV = function(key) {
	return cc.sys.localStorage.getItem(key);
};


// Post a request to an endpoint with a dictionary of parameters

DataService.prototype.post = function(link, params, cb) {
	this.request(link, params, cb, "POST");
};

DataService.prototype.get = function(link, params, cb) {
	this.request(link, params, cb, "GET");
};

DataService.prototype.request = function(link, params, cb, method) {
	var that = this;

	var size = cc.winSize;

    var bg = cc.Sprite.create(res.load_bg);
    bg.setAnchorPoint(cc.p(0.5, 0.5));
    bg.setPosition(cc.p(size.width/2, size.height/2));
    bg.setScale(size.width*2, size.height *2);

    cc.eventManager.addListener(cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) { return true;}
    }), bg);

    var loading = new cc.Sprite.create(res.loading_png);
    loading.setAnchorPoint(cc.p(0.5, 0.5));
    loading.x = size.width/2;
    loading.y = size.height/2;

    var loading_action = cc.RotateBy.create(0.75, 180);
    var repeat = cc.RepeatForever.create(loading_action);
    loading.runAction(repeat);

    cc.director.getRunningScene().addChild(bg, 100);
    cc.director.getRunningScene().addChild(loading, 101);

	var xhr = cc.loader.getXMLHttpRequest();

	var str = (method == "GET") ? "?" : "";
	for (var key in params) {
	    if (str != "") 
	        str += "&";
	    str += key + "=" + encodeURIComponent(params[key]);
	}

	xhr.open(method, (method == "GET") ? link + str : link);
	                          
	xhr.onreadystatechange = function () {
		cc.director.getRunningScene().removeChild(loading);
		cc.director.getRunningScene().removeChild(bg);
		loading = null;
		bg = null;

		if ( xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 ) ) {
		    cc.log( JSON.parse(xhr.responseText));
		    cb(JSON.parse(xhr.responseText));
		}
	}

	if(method == "GET")
		xhr.send();	
	else
		xhr.send(str);
};