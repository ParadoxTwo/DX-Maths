/*
This function determines the gameplay.
It's called continuously during gameplay.
*/

window.game = function(){
    console.log(level);
    //drawing begins
    drawBackground("#CCFFCC");
    bar.draw();
    answer.dropAnswer();
    ball.draw();
    bricks.draw();
    drawScore();
    drawQuestion();
    //drawing ends

    //checking brick collisions
    bricks.collisionCheck();

    //controls
    if(keydown){
        if(currentKey=="L"){
            bar.moveLeft();
        }
        else if(currentKey=="R"){
            bar.moveRight();
        }
    }
}


/*
The function which shows the end of the game.
It's called when the player loses.
*/
function gameOver(){
    alert("GAME OVER!");
    document.location.reload();
    clearInterval(gameStart);
}
/*
Draws the background of the game and the menu.
It also performs the function of clearing old drawings on the canvas.
It accepts 2 parameters: the background color and the border color.
Is called during all times of the game.
*/
function drawBackground(color="white",border="black"){
    //outsides:
    cx.beginPath();
    cx.rect(0, 0, canvas.width, canvas.height);
    cx.fillStyle = border;
    cx.fill();
    cx.closePath();
    //insides:
    cx.beginPath();
    if(inGame){
        cx.rect(2, 2, canvas.width-4, canvas.height-2);
        cx.fillStyle = color;
        cx.fill();
        cx.closePath();
        cx.beginPath();
        cx.fillStyle = border;
        cx.rect(0, bricks.marginTop-ball.radius, canvas.width-2, 2);
    }
    else{
        cx.rect(2, 2, canvas.width-4, canvas.height-4);
        cx.fillStyle = color;
    }
    cx.fill();
    cx.closePath();

}
/*
Changes the level of the game. If it's 12, then ends the game.
It's called whenever the player clears a level.
*/
function changeLevel(){
    if(level==12){
        if(!mute){
            gameClear = new sound("sounds/gameClear.wav");
            gameClear.play();
        }
        setTimeout(function(){
            alert("You have cleared the game!");
        },100);
        document.location.reload();
        clearInterval(gameStart);
    }
    else{
        if(!mute){
            levelClear = new sound("sounds/level-clear.wav");
            levelClear.play();
        }
        level++;
        setTimeout(function(){
            alert("Level Cleared! Progressing to level "+level);
        },100);
        score=0;
        ball.x=canvas.width/2;
        ball.y=canvas.height/2;
        bar.width=barWidth;
        bricks.paintLevel();
        bricks.set();
        bricks.shapeUp();
    }
}

/*
function to display the score as well as the current level.
It also determines when the player has cleared a level.
It's called continuously during the gameplay.
*/
function drawScore() {
    cx.font = fontSize+"px Arial";
    cx.fillStyle = "#000000";
    cx.fillText("Score: "+score, canvas.width-canvas.width/8, fontSize*3/2);
    cx.fillText("Level: "+level, canvas.width-canvas.width/8-80, fontSize*3/2);
    if(score<0){
        if(reduction){
            bar.width = bar.width - bar.width/10;
            reduction = false;
        }
        score = 0;
    }
    
    //A score of 5 or breaking of all bricks will clear the level
    if(score>=5||bricks.isCleared()){
        changeLevel();
    }
}
/*
Displays the current question that the player has to answer.
It needs to be called continuously during gameplay.
*/
function drawQuestion(){
    cx.font = fontSize+"px Arial";
    cx.fillStyle = "#000000";
    cx.fillText("Q"+(questionNumber+1)+") "+questions[questionNumber][0], fontSize/2, fontSize*3/2);
}
/*
Functions which help in navigation between game, legal section and mark justification.
*/
function showLegal(){
    legal = document.getElementById("legal");
    game1.style.display = "none";
    legal.style.display = "block";
}
function showGame(){
    legal = document.getElementById("legal");
    legal.style.display = "none";
    game1.style.display = "block";
}

/*
Sound object/function. This object is reusable and is used each time a sound has to be played.
*/
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    /*
    Plays the sound (as per src).
    Called whenever a sound has to be played.
    */
    this.play = function(){
        try{
            this.sound.play();
        }
        catch(exception){
            console.log(exception);
        }
    }
    /*
    Stops the sound which is currently playing.
    Called when a particular sound has to be stopped before it finishes playing.
    */
    this.stop = function(){
        try{
            this.sound.pause();
        }
        catch(exception){
            console.log(exception);
        }
    }
  }


/*
These functions are used to simulate keypress events.
They are used in the mobile version of the game. 
*/
function keyboardDown(){
    console.log("Down!");
    var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Down", char : "&#8964;", shiftKey : true});
    document.dispatchEvent(e);
}
function keyboardUp(){
    console.log("Up!");
    var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Up", char : "&#708;", shiftKey : true});
    document.dispatchEvent(e);
}
function keyboardLeft(){
    console.log("Left!");
    var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Left", char : "&#60;", shiftKey : true});
    document.dispatchEvent(e);
}
function keyboardRight(){
    console.log("Right!");
    var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Right", char : "&#707;", shiftKey : true});
    document.dispatchEvent(e);
}
function keyboardEnter(){
    console.log("Enter");
    var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Enter", char : "&#9166;", shiftKey : true});
    document.dispatchEvent(e);
}
function keyboardEscape(){
    console.log("Escape");
    var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Escape", char : "", shiftKey : true});
    document.dispatchEvent(e);
}