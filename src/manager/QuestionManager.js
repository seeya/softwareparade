var QuestionManager = function() {
}

QuestionManager.prototype.getGameQuestions = function(topicId, cb) {
	var that = this;
	ds.getGameQuestions(topicId, function(response){
		cb(response);
	});
};