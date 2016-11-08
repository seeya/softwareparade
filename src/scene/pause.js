var PauseLayer = cc.Layer.extend({
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
        
        //load Resume Game Text
        var resumeText = new ccui.Text("Resume Game","AmericanTypewriter",45);
        resumeText.ignoreContentAdaptWithSize(false);
        resumeText.setContentSize(cc.size(400, 150));
        resumeText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        resumeText.setTouchScaleChangeEnabled(true);
        resumeText.setTouchEnabled(true);
        resumeText.addTouchEventListener(this.touchResume, this);
        resumeText.setPosition(size.width / 2, size.height / 2 + 50);
        this.addChild(resumeText);

        //load Quit Game Text
        var quitText = new ccui.Text("Quit Game","AmericanTypewriter",45);
        quitText.ignoreContentAdaptWithSize(false);
        quitText.setContentSize(cc.size(400, 150));
        quitText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        quitText.setTouchScaleChangeEnabled(true);
        quitText.setTouchEnabled(true);
        quitText.addTouchEventListener(this.touchQuit, this);
        quitText.setPosition(size.width / 2, size.height / 2 - 50);
        this.addChild(quitText);

        return true;
    },

    touchQuit: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                MENU_INITIALIZED = false;
                sceneManager.replace("MenuScene");
                break;
            default:
                break;
        }
    },

    /*
        Touch event when Player selects to resume game
    */
    touchResume: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                sceneManager.back();
                break;
            default:
                break;
        }
    },
});

var PauseScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PauseLayer();
        this.addChild(layer);
    }
});