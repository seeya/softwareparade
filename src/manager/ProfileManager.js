var ProfileManager = function() {
	this.profileName = "";	
	this.classroomCode = "";
	this.classroomName = "";
}	


ProfileManager.prototype.getProfile = function(cb){
	var that = this;
	ds.getProfile(function(response){
		that.profileName = response.name;	
		that.classroomCode = response.classroomCode;
		that.classroomName = response.classroomName;
		return cb(response);
	});
};

//set new name
ProfileManager.prototype.editPlayerName = function(name,cb) {
	var that = this;
	cc.sys.localStorage.setItem("profileName", name);	
	return ds.editPlayerName(name,cb)
};


ProfileManager.prototype.assignPlayerToClassroom = function(code, cb) {
	var that = this;
	cc.sys.localStorage.setItem("classroomCode", code);
	//cc.sys.localStorage.setItem("classroomName", name);	
	return ds.assignPlayerToClassroom(code,cb);
};

ProfileManager.prototype.getProfileName = function() {
	cc.log("getProfileName" + this.profileName);
	return this.profileName;
};

ProfileManager.prototype.getClassroomName = function() {
	return this.classroomName;
};

ProfileManager.prototype.getClassroomCode = function() {
	return this.classroomCode;
};

ProfileManager.prototype.leaveClassroom = function(code, cb) {
	var that = this;
	ds.leaveClassroom(code, cb);
	cc.sys.localStorage.removeItem("classroomCode");
	cc.sys.localStorage.removeItem("classroomName");

	this.classroomCode = null;
	this.classroomName = null;
};