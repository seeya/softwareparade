var TEXT_INPUT_FONT_NAME = "Thonburi";
var TEXT_INPUT_FONT_SIZE = 36;

var RegisterScene = cc.Scene.extend({
    ctor:function (data) {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var text = new ccui.Text("Enter your Name", "AmericanTypewriter", 30);
        text.setPosition(cc.p(size.width / 2, size.height / 2 + text.height / 4 + 75));
        this.addChild(text);

        // Create the textfield
        var textField = new ccui.TextField("Your Name", "Marker Felt", 30);
        textField.x = size.width / 2.0;
        textField.y = size.height / 2.0;

        if(data.name)
            textField.setString(data.name);

        textField.setMaxLength(20);
        textField.addEventListener(this.textFieldEvent, this);
        this.addChild(textField);

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setScale9Enabled(true);
        button.loadTextures(res.button_png, res.button_highlighted_png, "");
        button.setTitleText("Submit");
        button.setTitleFontSize(20);
        button.x = size.width / 2;
        button.y = size.height / 2 - 100;
        button.setContentSize(cc.size(150, 48));
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button);

        return true;
    },

    //on submission of name
    touchEvent: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                sceneManager.transit("MenuScene");
                break;
            default:
                break;
        }
    },

    textFieldEvent: function (textField, type) {
        switch (type) {
            default:
                break;
        }
    }
});
