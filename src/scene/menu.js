var iconArray = [];
var startArray = [];
var scoreArray = [];

var MENU_INITIALIZED = false;

var MenuLayer = cc.Layer.extend({
    sprite:null,
    
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        iconArray = [];
        startArray = [];
        scoreArray = [];

        var text = new ccui.Text("Welcome", "AmericanTypewriter", 40);
        text.setPosition(cc.p(text.width - 30, size.height - 50));
        this.addChild(text);

        //add side buttons
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setScale9Enabled(true);
        button.loadTextures(res.profile_png, res.profile_highlighted_png, "");
        button.x = size.width - 165;
        button.y = size.height - 50;
        button.setContentSize(cc.size(75, 75));
        button.addTouchEventListener(this.touchProfile, this);

        var power = new ccui.Button();
        power.setTouchEnabled(true);
        power.setScale9Enabled(true);
        power.loadTextures(res.power_png, res.power_highlighted_png, "");
        power.x = size.width - 60;
        power.y = size.height - 50;
        power.setContentSize(cc.size(75, 75));
        power.addTouchEventListener(this.touchLogout, this);
        
        this.addChild(button);
        this.addChild(power);

        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setBounceEnabled(true);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(size.width, size.height - 100));
        scrollView.setInnerContainerSize(cc.size(2000, size.height - 100));
        scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        scrollView.setPosition(cc.p(size.width/2, size.height/2 - 50));

        this.addChild(scrollView);

        var innerContainer = scrollView.getInnerContainerSize();

        var section = [];

        for (var i = 0; i < 4; i++){
            section[i] = (innerContainer.width / 4) * (i+1);
        }

        //stages
        //stage1
        var stage1View = new ccui.ImageView();
        stage1View.setScale9Enabled(true);
        stage1View.loadTexture(res.stage_bg);
        stage1View.setContentSize(cc.size(400, 400));
        stage1View.x = section[0] / 2;
        stage1View.y = innerContainer.height/2 + 50;

        var stage1Icon = new ccui.Button();
        stage1Icon.setScale9Enabled(true);
        stage1Icon.setTouchEnabled(true);
        stage1Icon.loadTextures(res.stage1_bg, "", "");
        stage1Icon.setContentSize(cc.size(400, 400));
        stage1Icon.x = section[0] / 2;
        stage1Icon.y = innerContainer.height/2 + 50;
        stage1Icon.addTouchEventListener(this.touchStageIcon, this);

        iconArray.push(stage1Icon);

        var stage1Start = new ccui.Button();
        stage1Start.setScale9Enabled(true);
        //stage1Start.setTouchEnabled(true);
        stage1Start.loadTextures(res.stage_start, "", "");
        stage1Start.setContentSize(cc.size(100, 100));
        stage1Start.x = section[0] / 2 - 75;
        stage1Start.y = innerContainer.height/2 + 50;
        stage1Start.setOpacity(0);
        //stage1Start.addTouchEventListener(this.touchBeginStage, this);

        startArray.push(stage1Start);

        var stage1Score = new ccui.Button();
        stage1Score.setScale9Enabled(true);
        stage1Score.setTouchEnabled(true);
        stage1Score.loadTextures(res.stage_highscore, "", "");
        stage1Score.setContentSize(cc.size(100, 100));
        stage1Score.x = section[0] / 2 + 75;
        stage1Score.y = innerContainer.height/2 + 50;
        stage1Score.setOpacity(0);

        scoreArray.push(stage1Score);

        var stage1Text = new ccui.Text("Whack-a-Requirement", "AmericanTypewriter", 40);
        stage1Text.setPosition(cc.p(section[0] / 2, innerContainer.height/2 - 200));

        scrollView.addChild(stage1View);
        scrollView.addChild(stage1Icon);
        scrollView.addChild(stage1Start);
        scrollView.addChild(stage1Score);
        scrollView.addChild(stage1Text);

        
        //add background
        /*var layout = new ccui.Layout();
        layout.setContentSize(cc.size(scrollView.getInnerContainerSize().width, scrollView.getInnerContainerSize().height));
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColor(cc.color(128, 128, 128));
        layout.x = 0;
        layout.y = 0;

        scrollView.addChild(layout);*/
        

        return true;
    },

    touchProfile: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var scene = new ProfileScene();
                cc.director.pushScene(scene);
                break;
            default:
                break;
        }
    },

    touchLogout: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_ENDED:
                resetScenes();
                sceneManager.toRoot();
                loginManager.logoutFacebook();
                break;
            default:
                break;
        }
    },

    touchStageIcon: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var fade_out = cc.FadeOut.create(1);
                var fade_in_start = cc.FadeIn.create(1);
                var fade_in_score = cc.FadeIn.create(1);
                sender.runAction(fade_out);
                for (var i = 0; i < iconArray.length; i++){
                    if (sender == iconArray[i]){
                        startArray[i].setTouchEnabled(true);
                        startArray[i].addTouchEventListener(this.touchBeginStage, this);
                        startArray[i].runAction(fade_in_start);
                        scoreArray[i].runAction(fade_in_score);
                    }
                }
                
                break;
            default:
                break;
        }
    },

    touchBeginStage: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                //identify which stage is it
                var stageNo = -1;
                for(var i = 0 ; i < startArray.length; i++){
                    if (startArray[0] == sender){
                        stageNo = i+1;
                        break;
                    }
                }
                if (stageNo != -1){
                    startStage(stageNo);
                }
                
                break;
            default:
                break;
        }
    }
});

var resetScenes = function(){
    PROFILE_INITIALIZED = false;
    MENU_INITIALIZED = false;
}

var startStage = function(stageNo){
    switch(stageNo){
        case 1:
            sceneManager.transit("Game1Layer");
            break;
        default:
            break;
    }
}

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if (MENU_INITIALIZED == false){
            MENU_INITIALIZED = true;

            var layer = new MenuLayer();
            this.addChild(layer);
        }
    }
});

