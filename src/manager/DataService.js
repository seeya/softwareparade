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

DataService.prototype.getProfile = function(cb) {
	var that = this;
	this.post(this.endpoint + 'getProfile', {facebookId: that.user.facebookId/*facebookId*/, sessionToken:that.token/*token*/}, function(response) {
		cc.log("getProfile: response.name:"+response.name);
		cc.log("getProfile: response.classroomCode:"+response.classroomCode);
		cc.log("getProfile: response.classroomName:"+response.classroomName);

		console.log("getProfile success");

		return cb(response);
		//return that.profile;
	});
};//getProfile

DataService.prototype.editPlayerName = function(name,cb) {
	var that = this;
	this.post(this.endpoint + 'editPlayerName', {facebookId: that.user.facebookId/*facebookId*/, sessionToken:that.token/*token*/, name:name}, function(response) {

		if(response.name == name || response=="success") {
			cc.log("editPlayerName: Name Changed to: "+response.name);
			return cb(response.name);
		}//if success
		else {//response=="failure"){
			console.log("editPlayerName: Name change failure.");
			return cb(false);
		}//else failure
	});//post
};//editplayername

DataService.prototype.assignPlayerToClassroom = function(classroomCode,cb) {
	var that = this;
	this.post(this.endpoint + 'assignPlayerToClassroom', {classroomCode:classroomCode/*'EZUxClsU4R'*/, facebookId: that.user.facebookId/*facebookId*/, sessionToken:that.token/*token*/}, function(response) {
	if(response.classroomCode == classroomCode) {
			cc.log("if response.classroomCode == classroomCode : assignPlayerToClassroom: classroom changed to: "+response.classroomName+" "+response.classroomCode);
			return cb(response);
		}//if success
		else {
			console.log("assignPlayerToClassroom: classroomCode change failure.");
			return cb(false);
		}//else failure
	});//post
};//assignPlayerToClassroom

DataService.prototype.leaveClassroom = function(classroomCode,cb) {
	var that = this;
	this.post(this.endpoint + 'leaveClassroom', {classroomCode:classroomCode/*'EZUxClsU4R'*/, facebookId: that.user.facebookId/*facebookId*/, sessionToken:that.token/*token*/}, function(response) {

		cc.log("leaveClassroom: response:"+response);

		if(response == "success") {
			cc.log("leaveClassroom: classroom left.");
			return cb(true);
		}else if(response=="player not found || not enrolled"){
			cc.log("leaveClassroom: player not found || not enrolled");
			return cb(false);
		}
		else{
			cc.log("leaveClassroom: error");
			return cb(false);
		}

	});//post
};//assignPlayerToClassroom

DataService.prototype.createGameAttempt = function(gameId, attempt, cb){
	var that = this;
    this.post(this.endpoint + 'createGameAttempt', {facebookId: that.user.facebookId, sessionToken: that.token, gameId: gameId, selectedOptions: attempt}, function(response) {
		cb(response);
	});
};

DataService.prototype.getGames = function(cb){
	var that = this;
    this.post(this.endpoint + 'getGames', {facebookId: that.user.facebookId, sessionToken: that.token}, function(response) {
		cb(response);
	});
};

DataService.prototype.getGameQuestions = function(topicId, cb) {
	var that = this;
    this.post(this.endpoint + 'getGameQuestions', {facebookId: that.user.facebookId, sessionToken: that.token, topicId: topicId}, function(response) {
		cb(response);
	});
};

DataService.prototype.getTopPlayers = function(gameId, cb){
	var that = this;
    this.post(this.endpoint + 'getTopPlayers', {facebookId: that.user.facebookId, sessionToken: that.token, gameId: gameId}, function(response) {
		cb(response);
	});
};

DataService.prototype.setKV = function(key, value) {
	cc.sys.localStorage.setItem(key, value);
};

DataService.prototype.getKV = function(key) {
	return cc.sys.localStorage.getItem(key);
};

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
    loading.setTag(TAG_LOADING);

	var xhr = cc.loader.getXMLHttpRequest();

	var str = (method == "GET") ? "?" : "";
	for (var key in params) {
	    if (str != "") 
	        str += "&";
	    str += key + "=" + encodeURIComponent(params[key]);
	}

	xhr.open(method, (method == "GET") ? link + str : link);
	                          
	xhr.onreadystatechange = function () {
		if (cc.director.getRunningScene().getChildByTag(TAG_LOADING) != null){
			cc.director.getRunningScene().removeChild(loading);
			cc.director.getRunningScene().removeChild(bg);
		}
		
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