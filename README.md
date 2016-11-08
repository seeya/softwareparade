# Software Parade

## Setting up
Create a new cocos project to generate the framework folder.
`cocos new -d SoftwareParade -l js`

Download this repo and paste everything inside.

**Do NOT upload the frameworks and simulator folder.**

## Scenes & Layers

Based on the Cocos2d-JS platform architecture, every page that is displayed to the Player is known as a Scene. Every Scene would have one or more Layers stacked on top of one another for rendering of things such as buttons and text.

## Basic Flow

The application starting point is `welcome.js`. Once loaded, it will initialize a few global variables.

`window.ds = new DataService();
window.socialManager = new SocialManager();
window.sceneManager = new SceneManager();
window.loginManager = new LoginManager();`

Since all these variables are global, you can just call them directly. Example:

`socialManager.shareFacebook("Hi from software parade");`

`welcome.js` also loads up the Welcome Scene. From it, the user will transition to the other various Scenes, with each Scene's code located inside other js files inside the scene folder.

## Explaination of folder structure 

`index.html` - Loads all the scripts

`project.json` - Tells cocos2d which files to import, remember to import your files into `jsList` to prevent any undefined variables

`main.js` - Initializes cocos2d framework and creates a `new WelcomeScene()`

`res` - Contains media files (images)

`src` - Contains all supporting codes

`src/resource.js` - Contains the files (images) name and variable linked to

`src/global.js` - Contains the global variables and functions

`src/welcome.js` - Welcome Scene (Initializes main login screen)

`src/manager` - Manager classes are kept here 

`src/manager/SceneManager.js` - Handles transition and creation of new scenes

`src/manager/GameManager.js` - Handles Game Data retrieval and passing

`src/manager/ProfileManager.js` - Handles Profile display and update

`src/manager/QuestionManager.js` - Handles Question retrieval for varying topics

`src/manager/ScoreManager.js` - Handles attempt logging to be viewed by the Teachers in the web-portal

`src/manager/LoginManager.js` - Handles login to backend and other social networks

`src/manager/DataService.js` - Handles communication between client and server (database)

`src/manager/SocialManager.js` - Handles sharing of scores to social networks

`src/scene` - Scenes are kept here

`src/scene/menu.js` - Scene displaying all the games available

`src/scene/game.js` - Scene to display the actual gameplay of the application

`src/scene/pause.js` - Scene displayed when the game is paused.

`src/scene/gameInfo.js` - Scene displaying Game Information before a game is to be started

`src/scene/leaderboard.js` - Contains Leaderboard Layer displaying high scores in the Menu Scene

`src/scene/register.js` - Scene displaying name creation

`src/scene/profile.js` - Scene displaying profile update page

`src/scene/game.js` - Game Scene
