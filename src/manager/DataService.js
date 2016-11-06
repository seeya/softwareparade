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


DataService.prototype.getProfile = function(cb) {
	var that = this;
	
	this.post('getProfile', {facebookId: "123"/*facebookId*/, sessionToken:'123'/*token*/}, function(response) {
		cc.log("getProfile: response.name:"+response.name);
		cc.log("getProfile: response.classroomCode:"+response.classroomCode);
		cc.log("getProfile: response.classroomName:"+response.classroomName);

		console.log("getProfile success");

		return cb(response);
		//return that.profile;
	});//post
};//getProfile



DataService.prototype.editPlayerName = function(name,cb) {
	var that = this;
	this.post('editPlayerName', {facebookId: "123"/*facebookId*/, sessionToken:'123'/*token*/, name:name}, function(response) {

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
	this.post('assignPlayerToClassroom', {classroomCode:classroomCode/*'EZUxClsU4R'*/, facebookId:'123'/*facebookId*/, sessionToken:'123'/*token*/}, function(response) {
		cc.log("assignPlayerToClassroom: response.classroomCode: "+response.classroomCode);
		cc.log("assignPlayerToClassroom: response.classroomName: "+response.classroomName);

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
	this.post('leaveClassroom', {classroomCode:classroomCode/*'EZUxClsU4R'*/, facebookId:'123'/*facebookId*/, sessionToken:'123'/*token*/}, function(response) {

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




DataService.prototype.register = function(name, facebookId) {
	this.post('register', {facebookId: facebookId, name: name});
};

DataService.prototype.getHighscore = function(gameId) {

};

DataService.prototype.setHighscore = function(score) {

};


DataService.prototype.joinClassroom = function(code) {
//	this.post('assignPlayerToClassroom', {classroomCode: classroomCode, facebookId: facebookId, sessionToken: sessionToken}).then(function(response) {

//	});
};

DataService.prototype.getGames = function() {
	return new Promise(function(resolve, reject) {
		resolve({name: 'Whack-a-Requirement'});
	});
};

//Post a request to an endpoint with a dictionary of parameters
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
//			cc.log( JSON.parse(xhr.responseText));
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