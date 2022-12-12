let p0Health;
let p1Health;

let p0Weapon;
let p1Weapon;

let levelX;
let levelY;
let whereAreTheyComingFrom;

let hasRelic;
let firstTimeBoss;
var defeatedBosses;

//Nivel en el que se encuntra la reliquia
let relicX;
let relicY;

let numberOfLevels = 2;

let startTime;

let godMode = false; //Vida infinita para los jugadores

let skip = false;

let inGame = false;

let sceneCount = 0;
let currentScene;
let currentIdx;

let gamepad;

let isOrange = true;

let gameMode = 1; //0 single player //1 local multiplayer //2 online multiplayer

let offline = false;

//API REST
let lastTimeChecked = new Date();

let records = [];
let players = [];
let chats = [];
let player = { nick: null };

let isOnline = false;
let joined = false;
let joinedRoom = false;
let joining = false;

let origin = "https://ruins-of-light.herokuapp.com" //heroku server
//let origin = window.location.origin; //url in browser
///let origin = "http://localhost:8080"; //local
let wsOrigin = "";

if (origin.startsWith("https://")) {
	wsOrigin = "wss://" + origin.split("/")[2];
} else if (origin.startsWith("http://")) {
	wsOrigin = "ws://" + origin.split("/")[2];
}

//WEBSOCKET
let pConnection;
let friend = null;
let friendIsOnline = false;