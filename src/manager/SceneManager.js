// This class handles the creation, navigation of all the scenes available in the game

var SceneManager = function() {

}

SceneManager.prototype.transit = function(scene, data) {
	cc.director.pushScene(new window[scene](data));
};

SceneManager.prototype.toRoot = function() {
	cc.director.popToRootScene();
};