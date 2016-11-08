var InfoLayer = cc.Layer.extend({
    gameData:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        //add Back Button
        addBackButton(this);

        //add Game Information
        this.gameData = gameManager.getCurrentGame();

        //add Title of Game
        var titleText = new ccui.Text(this.gameData.name, "AmericanTypewriter", 40);
        titleText.x = size.width / 2;
        titleText.y = size.height / 2 + 250;
        this.addChild(titleText);

        //add Description of Game
        var descView = new ccui.ScrollView();
        descView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        descView.setBounceEnabled(true);
        descView.setTouchEnabled(true);
        descView.setContentSize(cc.size(size.width - 500, size.height - 400));
        descView.setAnchorPoint(cc.p(0.5, 0.5));
        descView.setPosition(cc.p(size.width/2, size.height/2 + 30));

        this.addChild(descView);

        var innerContainer = descView.getInnerContainerSize();

        var descText = new ccui.Text(this.gameData.description, "AmericanTypewriter", 30);
        descText.setContentSize(cc.size(innerContainer.width, 200));
        descText.ignoreContentAdaptWithSize(false);
        descText.x = descView.width / 2;
        descText.y = innerContainer.height - descText.height / 2;


        descView.setInnerContainerSize(cc.size(size.width, descText.height));

        descView.addChild(descText);

        //add Begin Game Button
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setScale9Enabled(true);
        button.loadTextures(res.button_png, res.button_highlighted_png, "");
        button.setTitleText("Game Start");
        button.setTitleFontSize(20);
        button.x = size.width / 2;
        button.y = size.height / 2 - 200;
        button.setContentSize(cc.size(175, 98));
        button.addTouchEventListener(this.touchBeginGame, this);
        this.addChild(button);
        return true;
    },

    /*
        Touch event when Player selects to return to previous menu
    */
    touchBack: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                sceneManager.back();
                break;
            default:
                break;
        }
    },

    /*
        Touch event when Player selects to start the game
    */
    touchBeginGame: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                GAME_INITIALIZED = false;
                sceneManager.replace("GameScene");
                break;
            default:
                break;
        }
    }

});

var InfoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new InfoLayer();
        this.addChild(layer);
    }
});