var PROFILE_INITIALIZED = false;

var ProfileLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        
        var backButton = new ccui.Button();
        backButton.setScale9Enabled(true);
        backButton.setTouchEnabled(true);
        backButton.loadTextures(res.back_png, "", "");
        backButton.setContentSize(cc.size(75, 75));
        backButton.setPosition(cc.p(50, size.height - 50));
        backButton.addTouchEventListener(this.touchBack, this);
        
        this.addChild(backButton);
        return true;
    },

    touchBack: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                PROFILE_INITIALIZED = false;
                cc.director.popScene();
                break;
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