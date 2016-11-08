var GameUiLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        //add Back Button
        var pauseButton = new ccui.Button();
        pauseButton.setScale9Enabled(true);
        pauseButton.setTouchEnabled(true);
        pauseButton.loadTextures(res.pause_png, "", "");
        pauseButton.setContentSize(cc.size(75, 75));
        pauseButton.setPosition(cc.p(size.width - 60, size.height - 50));
        pauseButton.addTouchEventListener(this.touchPause, this);
        
        this.addChild(pauseButton);
    },

    /*
        Touch event when Player selects to return to previous menu
    */
    touchPause: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                sceneManager.transit("PauseScene");
                break;
            default:
                break;
        }
    }
});

/*
    There will be multiple GameLayers, each corresponding to one mini-game
*/
var Game1Layer = cc.Layer.extend({
    size: null,
    points:0,
    timer: 0,
    timerBoard: null,
    pointsBoard: null,
    holes: [],
    countdownTimer: 3,
    gameData: null,
    questionNo: 0,
    questions: null,
    questionText: null,
    optionText: null,
    currentOption: 0,
    appearedOptions: [],
    listener: [],
    attempt: null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.size = cc.winSize;

        //preload questions
        this.gameData = gameManager.getCurrentGame();
        var that = this;
        questionManager.getGameQuestions(this.gameData.topicId, function(response){
            that.questions = response;
            that.initializeGame();
        });
    },

    onExit:function() {
        this.timer.release();
        this.timerBoard.release();
        this.pointsBoard.release();
        this.holes.release();
        this.countdownTimer.release();
        this.gameData.release();
        this.questionNo.release();
        this.questions.release();
        this.questionText.release();
        this.optionText.release();
        this.currentOption.release();
        this.appearedOptions.release();
        this.listener.release();
        this.attempt.release();
        this._super();
    },

    initializeGame: function(){
        //rendering of sprites and ui for the game

        this.attempt = [];

        var timeBoard = new cc.LabelTTF("32", "Arial");
        timeBoard.setFontSize(60);
        timeBoard.x = this.size.width /2;
        timeBoard.y = this.size.height / 2 + 100;

        this.timerBoard = timeBoard;

        this.addChild(timeBoard);

        var pointsBoard = new cc.LabelTTF(this.points.toString(), "Arial");
        pointsBoard.setFontSize(60);
        pointsBoard.x = this.size.width /2;
        pointsBoard.y = 50;

        this.addChild(pointsBoard);
        this.pointsBoard = pointsBoard;

        this.holes = [];

        //Top-left
        var hole1 = new cc.Sprite.create(res.game1Sprite_close);
        hole1.setAnchorPoint(cc.p(0.5, 0.5));
        hole1.x = this.size.width/2 - 250;
        hole1.y = this.size.height/2;

        this.addChild(hole1, 100);
        hole1.setScale(0.7, 0.7);

        this.holes.push(hole1);

        //Bottom-left
        var hole2 = new cc.Sprite.create(res.game1Sprite_close);
        hole2.setAnchorPoint(cc.p(0.5, 0.5));
        hole2.x = this.size.width/2 - 300;
        hole2.y = this.size.height/2 - 100;

        this.addChild(hole2, 100);
        hole2.setScale(0.9, 0.9);

        this.holes.push(hole2);

        var hole3 = new cc.Sprite.create(res.game1Sprite_close);
        hole3.setAnchorPoint(cc.p(0.5, 0.5));
        hole3.x = this.size.width/2 + 250;
        hole3.y = this.size.height/2;

        this.addChild(hole3, 100);
        hole3.setScale(0.7, 0.7);

        this.holes.push(hole3);

        var hole4 = new cc.Sprite.create(res.game1Sprite_close);
        hole4.setAnchorPoint(cc.p(0.5, 0.5));
        hole4.x = this.size.width/2 + 300;
        hole4.y = this.size.height/2 - 100;

        this.addChild(hole4, 100);
        hole4.setScale(0.9, 0.9);

        this.holes.push(hole4);

        this.timer = 32;
        this.timerBoard.setString(this.timer);

        this.schedule(this.countdownStart, 1);
    },

    countdownStart: function(){
        if(this.countdownTimer > 0){
            var countdownText = new ccui.Text(this.countdownTimer, "AmericanTypewriter", 70);
            countdownText.x = this.size.width/2;
            countdownText.y = this.size.height/2;
            var fade_out = cc.FadeOut.create(1);
            this.addChild(countdownText);
            countdownText.runAction(fade_out);
            this.countdownTimer--;
        }
        else{
            this.unschedule(this.countdownStart);
            var startText = new ccui.Text("Start", "AmericanTypewriter", 70);
            startText.x = this.size.width/2;
            startText.y = this.size.height/2;
            this.addChild(startText);
            var fade_out_startText = cc.FadeOut.create(1);
            startText.runAction(fade_out_startText);
            this.gameInstance();
        }
    },

    gameInstance: function(){
        //load Question
        var question = this.questions[this.questionNo];
        if (this.questionText != null){
            this.removeChild(this.questionText);
        }
        //reset appearedOptions
        this.appearedOptions = [[false,1], [false,1], [false,1], [false,1]];
        
        var questionText = new ccui.Text(question.questionText, "AmericanTypewriter", 30);
        questionText.ignoreContentAdaptWithSize(false);
        questionText.x = this.size.width / 2;
        questionText.y =  this.size.height / 2 + 200 - questionText.height;
        questionText.setContentSize(cc.size(this.size.width - 300, 300));
        questionText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addChild(questionText);
        this.questionText = questionText;

        this.popupHole();

        this.schedule(this.decrementTimer, 1);
    },

    popupHole: function(){
        this.unschedule(this.popupHole);
        var done = false;
        var optionDisplayed  = -1;
        var question = this.questions[this.questionNo];
        while (!done){
            optionDisplayed = Math.floor(Math.random() * 4) + 1;
            optionDisplayed--;
            if (this.appearedOptions[optionDisplayed][0] == false){
                if(this.appearedOptions[optionDisplayed][1] == 1){
                    this.appearedOptions[optionDisplayed][1] = 0;
                }
                else{
                    this.appearedOptions[optionDisplayed][0] = true;
                }
                done = true;
            }
        }
        this.currentOption = optionDisplayed;
        var holeDisplayed = Math.floor(Math.random() * 4) + 1;
        holeDisplayed--;
        var hole = this.holes[holeDisplayed];

        //reset all holes 1st
        this.closeAllHoles();
        
        this.holes[holeDisplayed].setTexture(res.game1Sprite_open);
        var optionText = new cc.LabelTTF(question.options[optionDisplayed].optionText, "AmericanTypewriter");
        if (holeDisplayed == 1 || holeDisplayed == 3){
            optionText.setFontSize(40);
            optionText.x = hole.x;
            optionText.y =  hole.y + 70;
        }
        else{
            optionText.setFontSize(30);
            optionText.x = hole.x;
            optionText.y =  hole.y + 60;
        }
        optionText.color = cc.color(0, 84, 166);
        optionText.setContentSize(cc.size(450, 200));

        this.addChild(optionText);
        optionText.setLocalZOrder(200);
        this.optionText = optionText;
        this.optionText._fixedPriority = 10;
        hole._fixedPriority = 100;

        var selfPointer = this.optionText;
        var that = this;

        //add listener
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function                      
            onTouchBegan: function (touch, event) { 
                var locationInNode = selfPointer.convertToNodeSpace(touch.getLocation());
                var s = selfPointer.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {         
            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {         
                that.answerQuestion();
            }
        });

        //this.reorderChild(hole, 200);
        cc.eventManager.addListener(listener, 10);
        this.listener = listener;

        this.schedule(this.popupHole, 4);
    },

    answerQuestion: function(){
        //get option
        this.unscheduleAllCallbacks();
        var question = this.questions[this.questionNo];
        var optionSelected = question.options[this.currentOption];

        //get isCorrect
        var isCorrect = optionSelected.isCorrect;
        if(isCorrect){
            //correct option
            this.displayCorrect();
            //add points
            this.points += 10;
            this.pointsBoard.setString(this.points);
        }
        else{
            this.displayIncorrect();
        }
        this.attempt.push(optionSelected.optionId);
        this.closeAllHoles();
        this.unschedule(this.decrementTimer);
        this.scheduleOnce(this.nextQuestion, 3);

    },

    closeAllHoles: function(){
        if (this.optionText != null){
            cc.eventManager.removeListener(this.listener);
            this.removeChild(this.optionText);
            this.optionText = null;

            for (var i = 0; i < this.holes.length; i++){
                this.holes[i].setTexture(res.game1Sprite_close);
            }
        }
    },

    decrementTimer: function(){
        this.timer--;
        this.timerBoard.setString(this.timer);
        if(this.timer == 0){
            this.unscheduleAllCallbacks();
            //call timeout
            this.timeOut();
        }
    },

    timeOut: function(){

        this.closeAllHoles();

        this.displayIncorrect();
        this.scheduleOnce(this.nextQuestion, 3);
    },

    nextQuestion: function(){
        this.questionNo++;
        if (this.questionNo < this.questions.length){
            this.timer = 32;
            this.timerBoard.setString(this.timer);
            this.gameInstance();
            this.schedule(this.decrementTimer, 1);
        }
        else{
            this.gameEnd();
        }
    },

    displayCorrect: function(){
        var correct = new cc.Sprite.create(res.correct_png);
        correct.setAnchorPoint(cc.p(0.5, 0.5));
        correct.x = this.size.width/2;
        correct.y = this.size.height/2;
        this.addChild(correct);
        var fade_out = cc.FadeOut.create(1);
        correct.runAction(fade_out);
    },

    displayIncorrect: function(){
        var incorrect = new cc.Sprite.create(res.wrong_png);
        incorrect.setAnchorPoint(cc.p(0.5, 0.5));
        incorrect.x = this.size.width/2;
        incorrect.y = this.size.height/2;
        this.addChild(incorrect);
        var fade_out = cc.FadeOut.create(1);
        incorrect.runAction(fade_out);
    },

    gameEnd: function(){
        this.unscheduleAllCallbacks();
        var endText = new ccui.Text("Game End", "AmericanTypewriter", 100);
        endText.x = this.size.width/2;
        endText.y = this.size.height/2;
        endText.setContentSize(cc.size(this.size.width - 300, 300));
        this.addChild(endText);
        var fade_out = cc.FadeOut.create(1);
        endText.runAction(fade_out);

        this.scheduleOnce(this.cleanUp, 3);
    },

    cleanUp: function(){
        var score = this.points;
        scoreManager.createGameAttempt(this.gameData.gameId, this.attempt, function(response){
            sceneManager.replace("GameEndScene", score);
        });
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //check gameId and load relevant layers based on it
        var gameLayer = null;
        gameLayer = gameManager.getGameLayer();
        if (gameLayer != null){
            this.addChild(gameLayer);
        }
        //load ui for the game
        var gameUiLayer = new GameUiLayer();
        this.addChild(gameUiLayer);
    }
});