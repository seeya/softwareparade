//variables to be used by the MenuLayer
var iconArray = [];
var startArray = [];
var scoreArray = [];

var MenuLayer = cc.Layer.extend({
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
        scrollView.setInnerContainerSize(cc.size(3000, size.height - 100));
        scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        scrollView.setPosition(cc.p(size.width/2, size.height/2 - 50));

        this.addChild(scrollView);

        var innerContainer = scrollView.getInnerContainerSize();

        var section = [];

        for (var i = 0; i < 4; i++){
            section[i] = (innerContainer.width / 4) * (i+1);
        }
        var that = this;

        gameManager.getGames(function(response){
            var games = response;
            for(var i = 0; i <1; i++){
                var game = games[i];

                var stageView = new ccui.ImageView();
                stageView.setScale9Enabled(true);
                stageView.loadTexture(res.stage_bg);
                stageView.setContentSize(cc.size(400, 400));
                stageView.x = section[i] / 2;
                stageView.y = innerContainer.height/2 + 50;

                var stageIcon = new ccui.Button();
                stageIcon.setScale9Enabled(true);
                stageIcon.setTouchEnabled(true);

               
                if(i == 0) {
                    stageIcon.loadTextures(res.stage1_bg, "", "");
                    stageIcon.addTouchEventListener(that.touchStageIcon, that);                    
                }
                else
                    stageIcon.loadTextures(res.comingsoon, "", "");


                stageIcon.setContentSize(cc.size(400, 400));
                stageIcon.x = section[i] / 2;
                stageIcon.y = innerContainer.height/2 + 50;

                iconArray.push(stageIcon);

                var stageStart = new ccui.Button();
                stageStart.setScale9Enabled(true);
                
                stageStart.loadTextures(res.stage_start, "", "");
                stageStart.setContentSize(cc.size(100, 100));
                stageStart.x = section[0] / 2 - 75;
                stageStart.y = innerContainer.height/2 + 50;
                stageStart.setOpacity(0);

                startArray.push([stageStart, game]);

                var stageScore = new ccui.Button();
                stageScore.setScale9Enabled(true);
                stageScore.setTouchEnabled(true);
                stageScore.loadTextures(res.stage_highscore, "", "");
                stageScore.setContentSize(cc.size(100, 100));
                stageScore.x = section[i] / 2 + 75;
                stageScore.y = innerContainer.height/2 + 50;
                stageScore.setOpacity(0);

                scoreArray.push([stageScore, game]);

                var stageText = new ccui.Text(game.name, "AmericanTypewriter", 40);
                stageText.setPosition(cc.p(section[i] / 2, innerContainer.height/2 - 200));

                scrollView.addChild(stageView);
                scrollView.addChild(stageIcon);
                scrollView.addChild(stageStart);
                scrollView.addChild(stageScore);
                scrollView.addChild(stageText);
            }

            var stageView = new ccui.ImageView();
            stageView.setScale9Enabled(true);
            stageView.loadTexture(res.stage_bg);
            stageView.setContentSize(cc.size(400, 400));
            stageView.x = section[2] / 2;
            stageView.y = innerContainer.height/2 + 50;

            var stageIcon = new ccui.Button();
            stageIcon.setScale9Enabled(true);
            stageIcon.setTouchEnabled(true);            
            stageIcon.loadTextures(res.comingsoon, "", "");
            stageIcon.setContentSize(cc.size(400, 400));
            stageIcon.x = section[2] / 2;
            stageIcon.y = innerContainer.height/2 + 50;            
        
            var stageText = new ccui.Text(response[1].name, "AmericanTypewriter", 40);
            stageText.setPosition(cc.p(section[2] / 2, innerContainer.height/2 - 200));     
            scrollView.addChild(stageView);
            scrollView.addChild(stageIcon);  
            scrollView.addChild(stageText);
                                 
        });

    },

    touchProfile: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                sceneManager.transit("ProfileScene");
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
                        startArray[i][0].setTouchEnabled(true);
                        startArray[i][0].addTouchEventListener(this.touchBeginStage, this);
                        startArray[i][0].runAction(fade_in_start);
                        scoreArray[i][0].runAction(fade_in_score);
                        scoreArray[i][0].addTouchEventListener(this.touchScoreboard, this);
                    }
                }
                
                break;
            default:
                break;
        }
    },

    /*
        Touch Event when Player selects a stage
    */
    touchBeginStage: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                //identify which stage is it
                for(var i = 0 ; i < startArray.length; i++){
                    if (startArray[i][0] == sender){
                        gameManager.setCurrentGame(startArray[i][1].gameId);
                        break;
                    }
                }
                cc.log(gameManager.getCurrentGame().gameId);
                if (gameManager.getCurrentGame() != null){
                    sceneManager.transit("InfoScene");
                }
                break;
            default:
                break;
        }
    },

    touchScoreboard: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                //identify which stage is it
                for(var i = 0 ; i < startArray.length; i++){
                    if (scoreArray[i][0] == sender){
                        //display popup for highscore
                        var lbLayer = new LeaderboardLayer(scoreArray[i][1]);
                        var scene = this.getParent();
                        scene.addChild(lbLayer);
                        break;
                    }
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

