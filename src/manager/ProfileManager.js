var ProfileManager = function() {
	this.profileName = ds.getProfile.name;	
	this.classroomCode = ds.getProfile.classroomCode;
	this.classroomName = ds.getProfile.classroomName;
}	


ProfileManager.prototype.getProfile = function(cb){
	var that = this;
	return ds.getProfile(cb);
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



ProfileManager.prototype.leaveClassroom = function(code, cb) {
	var that = this;
	ds.leaveClassroom(code, cb);
	cc.sys.localStorage.removeItem("classroomCode");
	cc.sys.localStorage.removeItem("classroomName");

	this.classroomCode = null;
	this.classroomName = null;
};