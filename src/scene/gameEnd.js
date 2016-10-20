var GAME_END_INITIALIZED = false;

var GameEndLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setScale9Enabled(true);
        button.loadTextures(res.button_png, res.button_highlighted_png, "");
        button.setTitleText("Return to Menu");
        button.setTitleFontSize(20);
        button.x = size.width / 2;
        button.y = size.height / 2 - 100;
        button.setContentSize(cc.size(150, 48));
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button);

        return true;
    },

    touchEvent: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                MENU_INITIALIZED = false;
                sceneManager.transit("MenuScene");
                break;
            default:
                break;
        }
    }
});

var GameEndScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameEndLayer();
        this.addChild(layer);
    }
});