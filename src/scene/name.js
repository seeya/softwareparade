var TEXT_INPUT_FONT_NAME = "Thonburi";
var TEXT_INPUT_FONT_SIZE = 36;

var NameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var bg = new cc.Sprite.create(res.bg);
        bg.setAnchorPoint(cc.p(0.5, 0.5));
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);
        
        var text = new ccui.Text("Enter your Name", "AmericanTypewriter", 30);
        text.setPosition(cc.p(size.width / 2, size.height / 2 + text.height / 4 + 75));
        this.addChild(text);

        // Create the textfield
        var textField = new ccui.TextField("Your Name", "Marker Felt", 30);
        textField.x = size.width / 2.0;
        textField.y = size.height / 2.0;
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
                var scene = new MenuScene();
                cc.director.replaceScene(scene);
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


var NameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new NameLayer();
        this.addChild(layer);
        
    }
});

