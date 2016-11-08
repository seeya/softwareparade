var WelcomeLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var menuTitle = new cc.MenuItemImage(res.title_png, res.title_png);
        var menuLogin = new cc.MenuItemImage(res.fb_png, res.fb_active_png, this.doLogin);

        menuTitle.setScale(0.7);
        menuLogin.setScale(1.2);

        menuTitle.setPosition(cc.p(size.width/2, (size.height / 2)*2));
        menuLogin.setPosition(cc.p(size.width/2, (size.height / 2)*1));

        var menu = new cc.Menu(menuTitle, menuLogin);
        menu.alignItemsVerticallyWithPadding(50);
        var bg = new cc.Sprite.create(res.bg);
        bg.setAnchorPoint(cc.p(0.5, 0.5));
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);
        this.addChild(menu);
    },

    doLogin: function(){
        loginManager.loginFacebook();
    }
});

var WelcomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if (WELCOME_INITIALIZED == false){
            window.ds = new DataService();
            window.socialManager = new SocialManager();
            window.sceneManager = new SceneManager();
            window.loginManager = new LoginManager();
            window.gameManager = new GameManager();
            window.questionManager = new QuestionManager();
            window.scoreManager = new ScoreManager();
            window.profileManager = new ProfileManager();

            cc.director.setDisplayStats(false);

            WELCOME_INITIALIZED = true;
            var layer = new WelcomeLayer();
            this.addChild(layer);

        }
        
    }
});

