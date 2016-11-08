var ProfileLayer = cc.Layer.extend({
    labelName:null,
    labelShowClassName:null,
    textFieldName:null,
    textFieldClassroom:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        var that=this;

        /////////////////////////////////////////BUTTONS_START/////////////////////////////////////////
//      back button
        addBackButton(this);
//      back button

//      leave classroom button
        var leaveButton = new ccui.Button();
        leaveButton.setScale9Enabled(true);
        leaveButton.setTouchEnabled(true);
        leaveButton.loadTextures(res.leave_png, "", "");
        leaveButton.setContentSize(cc.size(45, 45));
        leaveButton.setPosition(cc.p(size.width/2+275, size.height/2 +5));
        leaveButton.addTouchEventListener(this.touchLeave, this);
        this.addChild(leaveButton);
//      leave classroom button


//      enter classroom button
        var enterButton = new ccui.Button();
        enterButton.setScale9Enabled(true);
        enterButton.setTouchEnabled(true);
        enterButton.loadTextures(res.enter_png, "", "");
        enterButton.setContentSize(cc.size(45, 45));
        enterButton.setPosition(cc.p(size.width/2+265, size.height/2 -78));
        enterButton.addTouchEventListener(this.touchEnter, this);
        this.addChild(enterButton);
//      enter classroom button

//      save name button
        var saveNameButton = new ccui.Button();
        saveNameButton.setScale9Enabled(true);
        saveNameButton.setTouchEnabled(true);
        saveNameButton.loadTextures(res.savename_png, "", "");
        saveNameButton.setContentSize(cc.size(40, 40));
        saveNameButton.setPosition(cc.p(size.width/2+270, size.height/2 +85));
        saveNameButton.addTouchEventListener(this.touchSaveName, this);
        this.addChild(saveNameButton);
//      save name button
/////////////////////////////////////////BUTTONS_END/////////////////////////////////////////


/////////////////////////////////////////LABELS_START/////////////////////////////////////////
//      Name label
        this.labelName = new cc.LabelTTF("Name:", "AmericanTypewriter", 30);
        this.labelName.setColor(cc.color(255,255,255));//white
        this.labelName.setPosition(cc.p(size.width / 2 -100, size.height / 2 + 80 ));
        this.addChild(this.labelName);
//      Name label

//      Class Name label
        this.labelClassName = new cc.LabelTTF("Class:", "AmericanTypewriter", 30);
        this.labelClassName.setColor(cc.color(255,255,255));//white
        this.labelClassName.setPosition(cc.p(size.width / 2 -100, size.height / 2 ));
        this.addChild(this.labelClassName);
//      Class Name label

//      Show Class Name label
        this.labelShowClassName = new cc.LabelTTF("", "AmericanTypewriter", 30);
        this.labelShowClassName.setColor(cc.color(255,255,255));//white
        this.labelShowClassName.setPosition(cc.p(size.width / 2 + 100 , size.height / 2  ));
        this.addChild(this.labelShowClassName);
//      Show Class Name label

//      Class Code label
        this.labelClassCode = new cc.LabelTTF("Enter Class Code:", "AmericanTypewriter", 30);
        this.labelClassCode.setColor(cc.color(255,255,255));//white
        this.labelClassCode.setPosition(cc.p(size.width / 2 -180, size.height / 2 - 80 ));
        this.addChild(this.labelClassCode);
//      Class Code label


//      change status label
        this.labelStatus = new cc.LabelTTF(null, "Helvetica", 20);
        this.labelStatus.setColor(cc.color(255,255,255));//white
        this.labelStatus.setPosition(cc.p(size.width / 2 , size.height / 2 - 140 ));
        this.addChild(this.labelStatus);
//      change status label
//      }
/////////////////////////////////////////LABELS_END/////////////////////////////////////////


/////////////////////////////////////////TEXTFIELDS_START/////////////////////////////////////////
//      Create the textfields
        //name field
        this.textFieldName = new ccui.TextField();
        this.textFieldName.setTouchEnabled(true);
        this.textFieldName.x = size.width / 2.0 + 100;
        this.textFieldName.y = size.height / 2.0 + 80 ;
        this.textFieldName.setMaxLength(20);
        this.textFieldName.fontSize = 30;
        this.textFieldName.fontName = "Marker Felt";
        this.textFieldName.setPlaceHolder("NAME"); 
        this.addChild(this.textFieldName);
        //name field

        //class field
        this.textFieldClassroom = new ccui.TextField("classroomCode", "Marker Felt", 30);
        this.textFieldClassroom.setTouchEnabled(true);
        this.textFieldClassroom.x = size.width / 2.0 + 100 ;
        this.textFieldClassroom.y = size.height / 2.0 - 80;
        this.textFieldClassroom.setMaxLength(20);
        this.textFieldClassroom.fontSize = 30;
        this.textFieldClassroom.fontName = "Marker Felt";
        this.textFieldClassroom.setPlaceHolder("Classroom Code");
        this.addChild(this.textFieldClassroom);
        //class field   
/////////////////////////////////////////TEXTFIELD_END/////////////////////////////////////////
        var that = this;
        profileManager.getProfile(function(response) { 
            cc.log(profileManager.getProfileName());
            that.textFieldName.setString(profileManager.getProfileName());
            that.labelShowClassName.setString(profileManager.getClassroomName());
            that.textFieldClassroom.setString(profileManager.getClassroomCode());
            if(response.classroomName=="null" && response.classroomCode == "null"){
                labelShowClassName.setString("");
                textFieldClassroom.setString("");
            }

        });//getProfile callback



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
            else if(textFieldName.string==profileManager.getProfileName()){
                this.labelStatus.setString("Your name is already '"+textFieldName.string+"'.");
                break;
            }
            else{       
                profileManager.editPlayerName(textFieldName.string, function(response) {
                    if(!response) { //name change failure
                        that.labelStatus.setString("Error saving name.");
                    }
                    else{   //name change success
                        that.labelStatus.setString("Name saved to: "+response);
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
            else if(profileManager.getClassroomCode() == textFieldClassroom.string || profileManager.getClassroomName() == textFieldClassroom.string){
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
            else if(textFieldClassroom.string==profileManager.getClassroomName()){
                this.labelStatus.setString("Please enter your classroom code, not classroom name.");
                cc.log("touchLeave: class name entered, class code required.");
                break;
            }   
            else{   
                profileManager.leaveClassroom(textFieldClassroom.string, function(response) {
                    if(response) {// leave classroom success
                        that.labelStatus.setString("Success! You have left the classroom.");
                        textFieldClassroom.setString("");
                        labelShowClassName.setString("");
                    }
                    else // player not enrolled in class/invalid code
                        that.labelStatus.setString("Invalid classroom code. Please try again.");
                    cc.log("touchLeave: player not enrolled in class or class code invalid");

                });
//              }//checkLeaveClassroom
            }
            break;
        default:
            break;
        }//case
    }//touchLeave


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