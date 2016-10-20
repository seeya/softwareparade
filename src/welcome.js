var WELCOME_INITIALIZED = false;

var WelcomeLayer = cc.Layer.extend({
    sprite:null,
    _button:null,
    ctor:function () {
        this._super();


        var size = cc.winSize;

        var menuTitle = new cc.MenuItemImage(res.title_png, res.title_png);
        var menuLogin = new cc.MenuItemImage(res.fb_png, res.fb_active_png, doLogin);

        menuTitle.setScale(0.7);
        menuLogin.setScale(1.2);

        menuTitle.setPosition(cc.p(size.width/2, (size.height / 2)*2));
        menuLogin.setPosition(cc.p(size.width/2, (size.height / 2)*1));

        var menu = new cc.Menu(menuTitle, menuLogin);
        menu.alignItemsVerticallyWithPadding(50);
        this.addChild(menu);

        return true;
    }
});

var doLogin = function() {
    loginManager.loginFacebook();
}

var WelcomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if (WELCOME_INITIALIZED == false){
            window.ds = new DataService();
            window.sceneManager = new SceneManager();
            window.loginManager = new LoginManager();

            WELCOME_INITIALIZED = true;
            var layer = new WelcomeLayer();
            this.addChild(layer);

        }
        
    }
});

