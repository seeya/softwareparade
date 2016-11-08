//Initialize Global Variables
var TAG_LOADING = 1;

//Global variables initialized to prevent the same layer from being added twice, overlapping one another
var MENU_INITIALIZED = false;
var WELCOME_INITIALIZED = false;
var PROFILE_INITIALIZED = false;

//Global Functions

/*
	addBackButton
	Function to add back button onto the page
*/
var addBackButton = function(layer){
	var size = cc.winSize;

    var backButton = new ccui.Button();
    backButton.setScale9Enabled(true);
    backButton.setTouchEnabled(true);
    backButton.loadTextures(res.back_png, "", "");
    backButton.setContentSize(cc.size(75, 75));
    backButton.setPosition(cc.p(50, size.height - 50));
    backButton.addTouchEventListener(layer.touchBack, layer);
    
    layer.addChild(backButton);
}