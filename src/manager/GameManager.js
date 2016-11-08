var GameManager = function() {
	this.games = null;
    this.currentGame = null;
}

GameManager.prototype.getGames = function(cb) {
    if (this.games == null){
        cc.log("asd");
    	var that = this;
    	ds.getGames(function(response){
       		that.games = response;
    		cb(response);
    	});
    }
    else{
    	cb(this.games);
    }
    
};

GameManager.prototype.setCurrentGame = function(gameId) {
    if (this.games != null){
        for(var i = 0; i < this.games.length; i++){
            if (this.games[i].gameId == gameId){
                this.currentGame = this.games[i];
                break;
            }
        }
    }
};

GameManager.prototype.getCurrentGame = function() {
    if (this.games != null){
        return this.currentGame;
    }
    else{
        return null;
    }
};

GameManager.prototype.getGameLayer = function(){
    switch(this.currentGame.gameId){
        //Whack-a-Requirement
        case "w1Ooczp9pN":
            return new Game1Layer();
            break;
        default:
            return null;
            break;
    }
};

