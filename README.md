# Software Parade

## Setting up
Create a new cocos project to generate the framework folder.
`cocos new -d SoftwareParade -l js`

Download this repo and paste everything inside.

**Do NOT upload the frameworks and simulator folder.**

## REMOVED Dependency of SDKBox
SDKBox was not flexible enough and difficult to modify, hence I wrote my own Facebook oauth login and used the Graph API.

- The main logic for the oauth process is simply using a `WebView` and parsing the token upon successful login.
- Next the token is used to fetch the user's facebookId and name.
- Finally the data is saved locally and can be used if required.

`LoginManager.js` contains the token, facebookId and name of the current user.

`SocialManager.js` uses `loginManger` to share highscores.


## Basic Flow
The application starting point is `welcome.js`. Once loaded, it will initialize a few global variables.

```javascript
window.ds = new DataService();
window.socialManager = new SocialManager();
window.sceneManager = new SceneManager();
window.loginManager = new LoginManager();
```

Since all these variables are global, you can just call them directly. Example:

```javascript
socialManager.shareFacebook("Hi from software parade");
```

#  GET Request
```javascript
ds.get("apiendpoint", {key: value, key, value}, callback);
```

# POST Request
```javascript
ds.post("apiendpoint", {key: value, key, value}, callback);
```
The backend server url can get retrieved using `ds.endpoint` which returns `http://spapi.t05.sg/game/` 

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
