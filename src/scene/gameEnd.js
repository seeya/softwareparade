var GameEndLayer = cc.Layer.extend({
    gameData:null,
    score: 0,
    ctor:function (score) {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        //add Game Information
        this.gameData = gameManager.getCurrentGame();

        this.score = score;

        //add Title of Game
        var titleText = new ccui.Text(this.gameData.name, "AmericanTypewriter", 40);
        titleText.x = size.width / 2;
        titleText.y = size.height / 2 + 250;
        this.addChild(titleText);

        var scoreText = new ccui.Text("Score:", "AmericanTypewriter", 40);
        scoreText.x = size.width / 2;
        scoreText.y = size.height / 2 + 170;
        this.addChild(scoreText);

        var scoreNo = new ccui.Text(score, "AmericanTypewriter", 50);
        scoreNo.x = size.width / 2;
        scoreNo.y = size.height / 2 + 100;
        this.addChild(scoreNo);

        var scoreNo = new ccui.Text("Share Your Score!!:", "AmericanTypewriter", 30);
        scoreNo.x = size.width / 2;
        scoreNo.y = size.height / 2 + 25;
        this.addChild(scoreNo);

        var shareFacebookBtn = new ccui.Button();
        shareFacebookBtn.setTouchEnabled(true);
        shareFacebookBtn.loadTextures(res.facebook_share_png, res.facebook_share_png);
        shareFacebookBtn.setTitleFontSize(20);
        shareFacebookBtn.x = size.width / 2;
        shareFacebookBtn.y = size.height / 2 - 50;
        shareFacebookBtn.addTouchEventListener(this.shareFacebook, this);
        this.addChild(shareFacebookBtn);

        //add Begin Game Button
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setScale9Enabled(true);
        button.loadTextures(res.button_png, res.button_highlighted_png, "");
        button.setTitleText("Return to Menu");
        button.setTitleFontSize(20);
        button.x = size.width / 2;
        button.y = size.height / 2 - 200;
        button.setContentSize(cc.size(175, 98));
        button.addTouchEventListener(this.returnToMenu, this);
        this.addChild(button);
        return true;
    },

    shareFacebook: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                socialManager.shareFacebook("I have just earned " + this.score + " points from Software Parade - " + this.gameData.name + "!!");
                break;
            default:
                break;
        }
    },

    returnToMenu: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                MENU_INITIALIZED = false;
                sceneManager.replace("MenuScene");
                break;
            default:
                break;
        }
    }
});

var GameEndScene = cc.Scene.extend({
    ctor:function (score) 
    {
        this._super();
        this.init(score);
    },
    init:function (score) {
        this._super();
        //load ui for the game
        cc.log(score);
        var gameEndLayer = new GameEndLayer(score);
        this.addChild(gameEndLayer);
    }
});