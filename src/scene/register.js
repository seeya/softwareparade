var RegisterScene = cc.Layer.extend({
    ctor:function (data) {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var text = new ccui.Text("Enter your Name", "AmericanTypewriter", 30);
        text.setPosition(cc.p(size.width / 2, size.height / 2 + text.height / 4 + 75));
        this.addChild(text);

        // Create the textfield
        textField = new ccui.TextField("Name", "Marker Felt", 30);
        textField.x = size.width / 2.0;
        textField.y = size.height / 2.0;
        textField.setString(loginManager.name);

        textField.setMaxLength(20);

        textField.setMaxLength(20);
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
    },

    //on submission of name
    touchEvent: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                // Register account with given name and transit to menu
                ds.register(textField.string, loginManager.facebookId);
                sceneManager.transit("MenuScene");
                break;
            default:
                break;
        }
    }
});

var RegisterScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new RegisterLayer();
        this.addChild(layer);
    }
});
