var GAME_INITIALIZED = false;

var Game1Layer = cc.Layer.extend({
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
        button.setTitleText("Game Finished");
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
                sceneManager.transit("GameEndScene"); 
                break;
            default:
                break;
        }
    }
});

var Game1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Game1Layer();
        this.addChild(layer);
    }
});