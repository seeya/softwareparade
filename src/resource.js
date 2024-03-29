var folder = "";

if(!cc.sys.isNative){
	folder = "res/mediumRes";
}

var res = {
    HelloWorld_png : folder + "/HelloWorld.png",
    CloseNormal_png : folder + "/CloseNormal.png",
    CloseSelected_png : folder + "/CloseSelected.png",
    title_png : "res/title.png",
    fb_png : "res/loginFacebook.png",
    fb_active_png : "res/loginFacebookActive.png",
    button_png : "res/button.png",
    button_highlighted_png : "res/buttonHighlighted.png",
    back_png : "res/back.png",
    profile_png : "res/profile.png",
    profile_highlighted_png : "res/profile_highlighted.png",
    power_png: "res/power.png",
    power_highlighted_png: "res/power_highlighted.png",
    stage_bg: "res/stage_bg.png",
    stage1_bg: "res/stage1.png",
    stage_start: "res/play-button.png",
    stage_highscore: "res/statistics.png",
    pause_png: "res/pause.png",
    game1Sprite_close: "res/hole.png",
    game1Sprite_open: "res/hole_opened.png",
    wrong_png: "res/wrong.png",
    correct_png: "res/correct.png",
    loading_png: "res/loading.png",
    load_bg: "res/loaderbackground.png",
    facebook_share_png: "res/facebookShare.png",
    leave_png:"res/leave.png",
    enter_png:"res/enterClass.png",
    savename_png:"res/saveName.png",
    bg:"res/bg.png",
    popup:"res/audio/popup.mp3",
    success:"res/audio/success.mp3",
    fail:"res/audio/fail.mp3",
    comingsoon: "res/comingsoon.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
