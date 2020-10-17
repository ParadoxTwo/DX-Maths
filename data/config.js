
var canvas = document.getElementById("theCanvas");
var game1 = document.getElementById("game1");
canvas.setAttribute("height",window.innerHeight*0.8);
canvas.setAttribute("width",window.innerWidth*0.8);
document.body.style.backgroundImage = "url('images/background.jpg')";
var cx = canvas.getContext("2d");
var play = true;
var level = 1;
var score = 0;
var questionNumber = 0;
var fontSize = canvas.height/40; // canvas.height/36= 20 for 720px based screen height
var reduction = true;
var inGame=false;
var inRules=false;
var inOptions=false;
var paused = false;
var barWidth = canvas.height/7.2; // = 100 for 720px based screen height 
var keydown = false;
var currentKey = null;
var gameStart = null;
var showRules = null;
var showOptions = null;
var mute = false;
var backgroundMusic = null;
var navigate = null;
var navigateIn = null;
var navigateOut = null;
var navError = null;
var alertSound = null;
var brickBreakSound = null;
var pauseSound = null;
var wallBounce = null;
var barBounce = null;
var scoreSound = null;
var scoreError = null;
var gameover = null;
var gameClear = null;


