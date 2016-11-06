var PROFILE_INITIALIZED = false;

var ProfileLayer = cc.Layer.extend({
	sprite:null,
	labelName:null,
	labelShowClassName:null,
	textFieldName:null,
	textFieldClassroom:null,
	pname:null,
	pclassroomname:null,
	pclassroomCode:null,
	cb:null,

	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();
		var size = cc.winSize;
		var that=this;

		profileManager.getProfile(function(response) { 

			pname= response.name;	
			pclassroomName=response.classroomName;
			pclassroomCode=response.classroomCode;

			textFieldName.setString(pname);
			labelShowClassName.setString(pclassroomName);
			textFieldClassroom.setString(pclassroomCode);
			if(response.classroomName=="null" && response.classroomCode == "null"){
				labelShowClassName.setString("");
				textFieldClassroom.setString("");
			}

			cc.log("getProfile callback: pname:"+pname);
			cc.log("getProfile callback: pclassroomName:"+pclassroomName);
			cc.log("getProfile callback: pclassroomCode:"+pclassroomCode);
		});//getProfile callback

/////////////////////////////////////////BUTTONS_START/////////////////////////////////////////
//		back button
		var backButton = new ccui.Button();
		backButton.setScale9Enabled(true);
		backButton.setTouchEnabled(true);
		backButton.loadTextures(res.back_png, "", "");
		backButton.setContentSize(cc.size(75, 75));
		backButton.setPosition(cc.p(50, size.height - 50));
		backButton.addTouchEventListener(this.touchBack, this);
		this.addChild(backButton);
//		back button


//		leave classroom button
		var leaveButton = new ccui.Button();
		leaveButton.setScale9Enabled(true);
		leaveButton.setTouchEnabled(true);
		leaveButton.loadTextures(res.leave_png, "", "");
		leaveButton.setContentSize(cc.size(45, 45));
		leaveButton.setPosition(cc.p(size.width/2+180, size.height/2 +5));
		leaveButton.addTouchEventListener(this.touchLeave, this);
		this.addChild(leaveButton);
//		leave classroom button


//		enter classroom button
		var enterButton = new ccui.Button();
		enterButton.setScale9Enabled(true);
		enterButton.setTouchEnabled(true);
		enterButton.loadTextures(res.enter_png, "", "");
		enterButton.setContentSize(cc.size(45, 45));
		enterButton.setPosition(cc.p(size.width/2+265, size.height/2 -48));
		enterButton.addTouchEventListener(this.touchEnter, this);
		this.addChild(enterButton);
//		enter classroom button

//		save name button
		var saveNameButton = new ccui.Button();
		saveNameButton.setScale9Enabled(true);
		saveNameButton.setTouchEnabled(true);
		saveNameButton.loadTextures(res.savename_png, "", "");
		saveNameButton.setContentSize(cc.size(40, 40));
		saveNameButton.setPosition(cc.p(size.width/2+270, size.height/2 +55));
		saveNameButton.addTouchEventListener(this.touchSaveName, this);
		this.addChild(saveNameButton);
//		save name button
/////////////////////////////////////////BUTTONS_END/////////////////////////////////////////


/////////////////////////////////////////LABELS_START/////////////////////////////////////////
//		Name label
		this.labelName = new cc.LabelTTF("Name:", "AmericanTypewriter", 30);
		this.labelName.setColor(cc.color(255,255,255));//white
		this.labelName.setPosition(cc.p(size.width / 2 -100, size.height / 2 + 50 ));
		this.addChild(this.labelName);
//		Name label

//		Class Name label
		this.labelClassName = new cc.LabelTTF("Class:", "AmericanTypewriter", 30);
		this.labelClassName.setColor(cc.color(255,255,255));//white
		this.labelClassName.setPosition(cc.p(size.width / 2 -100, size.height / 2 ));
		this.addChild(this.labelClassName);
//		Class Name label

//		Show Class Name label
		labelShowClassName = new cc.LabelTTF("", "AmericanTypewriter", 30);
		labelShowClassName.setColor(cc.color(255,255,255));//white
		labelShowClassName.setPosition(cc.p(size.width / 2 + 100 , size.height / 2  ));
		this.addChild(labelShowClassName);
//		Show Class Name label

//		Class Code label
		this.labelClassCode = new cc.LabelTTF("Enter Class Code:", "AmericanTypewriter", 30);
		this.labelClassCode.setColor(cc.color(255,255,255));//white
		this.labelClassCode.setPosition(cc.p(size.width / 2 -180, size.height / 2 - 50 ));
		this.addChild(this.labelClassCode);
//		Class Code label



//		if (changes == 1){
//		change status label
		this.labelStatus = new cc.LabelTTF(null, "Helvetica", 20);
		this.labelStatus.setColor(cc.color(255,255,255));//white
		this.labelStatus.setPosition(cc.p(size.width / 2 , size.height / 2 - 90 ));
		this.addChild(this.labelStatus);
//		change status label
//		}
/////////////////////////////////////////LABELS_END/////////////////////////////////////////


/////////////////////////////////////////TEXTFIELDS_START/////////////////////////////////////////
//		Create the textfields
		//name field
		textFieldName = new ccui.TextField();
		textFieldName.setTouchEnabled(true);
		textFieldName.x = size.width / 2.0 + 100;
		textFieldName.y = size.height / 2.0 + 50 ;
		textFieldName.setMaxLength(20);
		textFieldName.fontSize = 30;
		textFieldName.fontName = "Marker Felt";
		textFieldName.setPlaceHolder("NAME"); 
		textFieldName.addEventListener(this.textFieldNameEvent, this);
		this.addChild(textFieldName);
		//name field

		//class field
		textFieldClassroom = new ccui.TextField("classroomCode", "Marker Felt", 30);
		textFieldClassroom.setTouchEnabled(true);
		textFieldClassroom.x = size.width / 2.0 + 100 ;
		textFieldClassroom.y = size.height / 2.0 - 50;
		textFieldClassroom.setMaxLength(20);
		textFieldClassroom.fontSize = 30;
		textFieldClassroom.fontName = "Marker Felt";
		textFieldClassroom.setPlaceHolder("Classroom Code");
		textFieldClassroom.addEventListener(this.textFieldClassEvent, this);
		this.addChild(textFieldClassroom);
		//class field	
/////////////////////////////////////////TEXTFIELD_END/////////////////////////////////////////

		return true;
	},//cthor:function



	touchBack: function(sender, type){
		switch (type) {
		case ccui.Widget.TOUCH_ENDED:
			PROFILE_INITIALIZED = false;
			cc.director.popScene();
			break;
		default:
			break;
		}
	},

	touchSaveName: function(sender, type){//savename button, update name
		switch (type) {
		case ccui.Widget.TOUCH_ENDED:	
			var that = this;

			//if name textfield is blank
			if(textFieldName.string==""){//empty inputs
				this.labelStatus.setString("Textfield is empty. Please enter name.");
				cc.log("touchSaveName: nothing entered in textFieldName");
				break;
			}
			//if name in txtfield same as current name
			else if(textFieldName.string==pname){
				this.labelStatus.setString("Your name is already '"+textFieldName.string+"'.");
				break;
			}
			else{		
				profileManager.editPlayerName(textFieldName.string, function(response) {
					if(!response) { //name change failure
						that.labelStatus.setString("Error saving name.");
					}
					else{ 	//name change success
						that.labelStatus.setString("Name saved to: "+response);
						pname=response;
					}
				});//editPlayerName		
			}
			break;
		default:
			break;
		}//case
	},//touchEdit

	touchEnter: function(sender, type){//enter classroom button, assignplayertoclassroom
		switch (type) {
		case ccui.Widget.TOUCH_ENDED:	
			var that = this;

			//if class textfield is blank
			if(textFieldClassroom.string=="null"){
				this.labelStatus.setString("You are not in a class. Enter a classroom code from your teacher.");
				break;
			}
			else if(textFieldClassroom.string==""){//empty inputs
				this.labelStatus.setString("Please enter a classroom code from your teacher.");
				cc.log("touchLeave: nothing entered in textFieldClassroom");
				break;
			}//if
			else if(pclassroomCode == textFieldClassroom.string || pclassroomName == textFieldClassroom.string){
				this.labelStatus.setString("You are already in this class.");
				break;
			}
			else{
///////////////////////////////////callbacks//////////////////////////////////////////			
				profileManager.assignPlayerToClassroom(textFieldClassroom.string, function(response) {
					if(response==false) {// player not enrolled in class/invalid code
						that.labelStatus.setString("Invalid classroom code. Please try again.");
					}
					else{ // success
						that.labelStatus.setString("Success! Joined classroom "+ response.classroomName +" with: "+response.classroomCode);
						//textFieldClassroom.setString(response.classroomName);
						labelShowClassName.setString(response.classroomName);
						pclassroomCode=response.classroomCode;
						pclassroomName=response.classroomName;
						cc.log("profile: new pclassroomCode: "+pclassroomCode);
						cc.log("profile: new pclassroomName: "+pclassroomName);
					}
				});//assignPlayerToClassroom
			}
///////////////////////////////////callbacks//////////////////////////////////////////					
			break;
		default:
			break;
		}//case
	},


	touchLeave: function(sender, type){ //leave classroom
		switch (type) {
		case ccui.Widget.TOUCH_ENDED:	
			var that = this;

			cc.log("string:"+textFieldClassroom.string+":");
			//if class textfield is blank
			if(textFieldClassroom.string=="null"){
				this.labelStatus.setString("You are not in a class. Nothing to leave.");
				break;
			}
			else if(textFieldClassroom.string==""){//empty inputs
				this.labelStatus.setString("Textfield empty. Please enter your class code to leave class.");
				cc.log("touchLeave: nothing entered in textFieldClassroom");
				break;
			}//if
			else if(textFieldClassroom.string==pclassroomName){
				this.labelStatus.setString("Please enter your classroom code, not classroom name.");
				cc.log("touchLeave: class name entered, class code required.");
				break;
			}	
			else{	
				profileManager.leaveClassroom(textFieldClassroom.string, function(response) {
					if(response) {// leave classroom success
						that.labelStatus.setString("Success! You have left the classroom.");
						textFieldClassroom.setString("");
						pclassroomCode=="null";
						pclassroomName=="null";
						labelShowClassName.setString("");
					}
					else // player not enrolled in class/invalid code
						that.labelStatus.setString("Invalid classroom code. Please try again.");
					cc.log("touchLeave: player not enrolled in class or class code invalid");

				});
//				}//checkLeaveClassroom
			}
			break;
		default:
			break;
		}//case
	},//touchLeave


	textFieldNameEvent: function (textField, type) {
		switch (type) {
		case ccui.TextField.EVENT_INSERT_TEXT:
			//	cc.log("Insert Character");
			//	cc.log(textFieldName.string);
			break;

		case ccui.TextField.EVENT_DELETE_BACKWARD:
			//	cc.log("Delete Character");
			//	cc.log(textFieldName.string);
			break;

		default:  
			break;
		}
	},

	textFieldClassEvent: function (textField, type) {
		switch (type) {
		default:
			break;
		}
	}


});

var ProfileScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		if (PROFILE_INITIALIZED == false){
			PROFILE_INITIALIZED = true;
			var layer = new ProfileLayer();
			this.addChild(layer);
		}
	}
});