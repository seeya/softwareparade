var ScoreManager = function() {
}

ScoreManager.prototype.createGameAttempt = function(gameId, attempt, cb) {
	var that = this;
	var stringify = JSON.stringify(attempt);
	ds.createGameAttempt(gameId, stringify, function(response){
		cb(response);
	});
};

ScoreManager.prototype.getTopPlayers = function(gameId, cb) {
	var that = this;
	ds.getTopPlayers(gameId, function(response){
		cb(response);
	});
};