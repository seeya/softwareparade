var LeaderboardLayer = cc.Layer.extend({
    gameData: null,
    ctor:function (game) {

        this._super();

        this.gameData = game;

        var that = this;

        //load highscore for game
        scoreManager.getTopPlayers(this.gameData.gameId, function(response){
            var size = cc.winSize;

            //create popup
            var bg = cc.Sprite.create(res.load_bg);
            bg.setAnchorPoint(cc.p(0.5, 0.5));
            bg.setPosition(cc.p(size.width/2, size.height/2));
            bg.setScale(size.width*2, size.height *2);

            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) { return true;}
            }), bg);
            
            that.addChild(bg, 100);

            var backButton = new ccui.Button();
            backButton.setScale9Enabled(true);
            backButton.setTouchEnabled(true);
            backButton.loadTextures(res.back_png, "", "");
            backButton.setContentSize(cc.size(75, 75));
            backButton.setPosition(cc.p(50, size.height - 50));
            backButton.addTouchEventListener(that.touchBack, that);

            that.addChild(backButton, 150);

            var titleText = new cc.LabelTTF(that.gameData.name, "Arial");
            titleText.setFontSize(40);
            titleText.color = cc.color(255, 255, 255);
            titleText.x = size.width /2;
            titleText.y = size.height - 50;

            that.addChild(titleText, 150);

            var section = size.height - 170;

            for (var i = 0; i < response.length; i++){
                var name = new cc.LabelTTF(i+1 + ". "+ response[i].name, "Arial");
                name.setFontSize(40);
                name.color = cc.color(255, 255, 255);
                name.x = size.width /2 - 50;
                name.y = section;
                name.setDimensions(cc.size(400, 150));
                name.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                that.addChild(name, 150);

                var highscore = new cc.LabelTTF(response[i].playerScore, "Arial");
                highscore.setFontSize(40);
                highscore.color = cc.color(255, 255, 255);
                highscore.x = size.width /2 + 150;
                highscore.y = section;
                highscore.setDimensions(cc.size(100, 150));
                highscore.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
                section -= 70;
                that.addChild(highscore, 150);
            }
        });
        
        return true;
    },

    touchBack: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.getParent().removeChild(this);
                break;
            default:
                break;
        }
    }
});
