# Software Parade

## Setting up
Create a new cocos project to generate the framework folder.
`cocos new -d SoftwareParade -l js`

Download this repo and paste everything inside.

**Do NOT upload the frameworks and simulator folder.**

## REMOVED Dependency of SDKBox
## Explaination of folder structure 

`index.html` - Loads all the scripts

`project.json` - Tells cocos2d which files to import, remember to import your files into `jsList` to prevent any undefined variables

`main.js` - Initializes cocos2d framework and creates a `new WelcomeScene()`

`res` - Contains media files (images)

`src` - Contains all supporting codes

`src/resource.js` - Contains the files (images) name and variable linked to

`src/welcome.js` - Welcome Scene (Initializes main login screen)

`src/manager` - Manager classes are kept here 

`src/manager/SceneManager.js` - Handles transition and creation of new scenes

`src/manager/LoginManager.js` - Handles login to backend and other social networks

`src/manager/DataService.js` - Handles communication between client and server (database)

`src/manager/SocialManager.js` - Handles sharing of scores to social networks

`src/scene` - Scenes are kept here

`src/scene/menu.js` - Scene displaying all the games available

`src/scene/name.js` - Scene displaying name creation

`src/scene/profile.js` - Scene displaying profile update page

`src/scene/game.js` - Game Scene
