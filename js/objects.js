/* this bar works after these 2 objects are given to it*/
// bar.board = ctx;
// bar.enabled = true;

/*
Bar object of the game. It's reused in each level. It is user-controlled.
*/
window.bar = {
    width: 100,
    height: 20,
    radius: 10,
    x: 1,
    y: 700,
    dx: 7,
    color: "#111111",
    enabled: false,
    /*
    Sets the iitial values of the bar component.
    This function needs to be when the game is initialized.
    */
    set: function(){
        this.width = barWidth;
        this.height = canvas.height/36;
        this.radius = this.height/2;
        this.y = canvas.height-this.height;
        this.x = canvas.width/2;
        this.dx = canvas.width/183;
    },
    /*
    Draws the bar as per its position.
    The shape of the bar is a curved rectangle which is made by using a rectangle and 2 semi-circles.
    It needs to be called continuosly when the game is running.
    */ 
    draw: function(){ //simply draws the bar.. 
            // rectangle
            cx.beginPath();
            cx.rect(this.x+this.radius, this.y, this.width-this.radius*2, this.height);
            cx.fillStyle = this.color;
            cx.fill();
            cx.closePath();
            // for curved looks: 
            cx.beginPath();
            cx.arc(this.x+this.radius, this.y+this.radius, this.radius, Math.PI/2, Math.PI*3/2);
            cx.fillStyle = this.color;
            cx.fill();
            cx.closePath();
            cx.beginPath();
            cx.arc(this.x+this.radius+this.width-this.radius*2, this.y+this.radius, this.radius, Math.PI/2, Math.PI*3/2, true);
            cx.fillStyle = this.color;
            cx.fill();
            cx.closePath();
    },
    /*
    Moves the bar leftward by dx number of pixels.
    This function is called whenever left arrow is pressed in the game.
    */
    moveLeft: function (){ //to move the bar left
        if(this.enabled && this.x>1){
            //console.log("Leftward movement");
            this.x-=this.dx;
        }
    },
    /*
    Moves the bar righward by dx number of pixels.
    This function is called whenever right arrow is pressed in the game.
    */
    moveRight: function (){ //to move the bar to right
        if(this.enabled && this.x+this.width+1<canvas.width){
            //console.log("Rightward movement");
            this.x+=this.dx;
        }
    }
}
/*
The reusable object - ball (needed in each level)
*/
window.ball = {
    radius: canvas.height/72, // height based radius.. =10 for 720px screen height.
    x: canvas.width/2,
    y: canvas.height/2,
    color: "rgb(11,11,11)",
    dx: 2,          //horizontal speed of the ball.
    dy: -2,         //vertical speed of the ball.
    enabled: false,
    /*
    Draws the ball as per its position. It also checks if the ball is colliding to the wall or bar.
    In case of any collision, the direction of the ball is reversed. Also, when the ball lands on the bar,
    if it lands on 1st third of it, it's horizontal speed is decreased (increased if negative). Similarly,
    when it lands on the 3rd third of it, it's horizontal speed is increased (decreased if negative).
    It needs to be called continuosly when the game is running.
    */ 
    draw: function(){ //simply draws and moves the ball
        if(this.enabled){
            //conditions of wall
            if(this.x+this.dx>canvas.width-this.radius || this.x+this.dx<this.radius) {
                this.dx = -this.dx;
                if(!mute){
                    wallBounce = new sound("sounds/bounce-wall.wav");
                    wallBounce.play();
                }
            }
            if(this.y+this.dy<this.radius+bricks.marginTop) {
                this.dy = -this.dy;
                if(!mute){
                    wallBounce = new sound("sounds/bounce-wall.wav");
                    wallBounce.play();
                }
            }
            else if(this.y>canvas.height-this.radius-bar.height){
                if(this.x<bar.x+bar.width && this.x>bar.x){
                    if(!mute){
                        barBounce = new sound("sounds/bounce-bar.wav");
                        barBounce.play();
                    }
                    this.dy = -this.dy;
                    //changing direction of the ball depending on which part of bar it lands on.
                    if(this.x+this.dx<bar.x+bar.width/3){
                        this.dx-=0.2;
                        if(this.dx<2)
                            this.dy-=0.2;
                        else
                            this.dy+=0.2;
                        console.log("currently, "+this.dx);
                    }
                    else if(this.x+this.dx>bar.x+bar.width*2/3){
                        this.dx+=0.2;
                        if(this.dx<2)
                            this.dy-=0.2;
                        else
                            this.dy+=0.2;
                        console.log("currently, "+this.dx);
                    }
                }
                else{
                    gameOver();
                }
            }
            //movement
            this.x+=this.dx;
            this.y+=this.dy;
            //a 3D looking ball
            for(var rad=this.radius;rad>1;){
                rad-=0.1;
                for (var R=100,G=0,B=0;rad != Math.floor(rad) && rad>1;rad-=0.1,R++,G++,B++){
                    cx.beginPath();
                    cx.arc(this.x, this.y, rad, 0, Math.PI*2);
                    this.color="rgb("+R+","+G+","+B+")";
                    cx.fillStyle = this.color;
                    cx.fill();
                    cx.closePath();
                }
            }
        }
    }
}
/*
Bricks - the collective object which holds all bricks together.
It's reused in every level.
*/
window.bricks = {
    enabled: false,
    brickArray: [],
    rowCount: 3,
    colCount: 10,
    cWidth: canvas.width/24, //core width i.e. the rectangle = 85 for 1280px screen width
    height: canvas.height/36, // = 20 for 720px screen height. It is also used as the diameter of the arcs/semi-circles surrounding the core. radius will be height/2
    padding: canvas.height/72, //height based padding.. = 10 for 720px screen height
    marginTop: canvas.height/14.4, // =50 for 720px screen height.
    marginLeft: canvas.width/64, // =20 for 1280px screen width.
    colors: ["#9999FF","#666699","#333399","#111166"], 
    /*
    Creates bricks in a grid form and sets their initial values. Number of rows and columns is determined by rowCount & colCount.
    It's called during level change; right after the properties of grid is determined.
    */
    set: function(){
        bricks.marginLeft = (canvas.width - (this.cWidth+this.height+this.padding)*11)/2;
        for(var c=0; c<bricks.colCount; c++) {
            bricks.brickArray[c] = [];
            for(var r=0; r<bricks.rowCount; r++) {
                var i = Math.ceil(Math.random()*4-1);
                console.log(i);
                bricks.brickArray[c][r] = {
                    x: (c*(bricks.cWidth+bricks.padding+bricks.height))+bricks.marginLeft,
                    y: (r*(bricks.height+bricks.padding))+bricks.marginTop,
                    enabled: true,
                    color: bricks.colors[i]
                };
                console.log(bricks.brickArray[c][r]);
            }
        }
    },
    /*
    Draws the whole brick set according to the rows and columns.
    A brick is a curved rectangle which is made by using a rectangle and 2 semi-circles.
    Called continuously during gameplay.
    */
    draw: function(){ 
        if(bricks.enabled){
            for(var c=0; c<bricks.colCount; c++) {
                for(var r=0; r<bricks.rowCount; r++) {
                    if(bricks.brickArray[c][r].enabled){
                        cx.beginPath();
                        //rectangle of brick
                        cx.rect(bricks.brickArray[c][r].x, bricks.brickArray[c][r].y, bricks.cWidth, bricks.height);
                        cx.fillStyle = bricks.brickArray[c][r].color;
                        cx.fill();
                        cx.closePath();
                        //left curve of brick
                        cx.beginPath();
                        cx.arc(bricks.brickArray[c][r].x, bricks.brickArray[c][r].y+bricks.height/2, bricks.height/2, Math.PI/2, 3*Math.PI/2, false);
                        cx.fillStyle = bricks.brickArray[c][r].color;
                        cx.fill();
                        cx.closePath();
                        //right curve of brick
                        cx.beginPath();
                        cx.arc(bricks.brickArray[c][r].x+bricks.cWidth, bricks.brickArray[c][r].y+bricks.height/2, bricks.height/2, Math.PI/2, 3*Math.PI/2, true);
                        cx.fillStyle = bricks.brickArray[c][r].color;
                        cx.fill();
                        cx.closePath();
                    }
                }
            }
        }
    },
    /*
    Checks if the ball is colliding with the brick and breaks/pops the particular brick accordingly.
    It uses the enabled property of the brick to manage whether it's already broken or broken now.
    The vertical direction of the ball is reversed in each hit.
    It has to be called continuously during gameplay.
    */
    collisionCheck: function(){
        for(var c=0; c<bricks.colCount; c++) {
            for(var r=0; r<bricks.rowCount; r++) {
                if(bricks.brickArray[c][r].enabled){
                    if(ball.x>bricks.brickArray[c][r].x&&ball.x<bricks.brickArray[c][r].x+bricks.cWidth+bricks.height){
                        if(ball.y+ball.radius>bricks.brickArray[c][r].y&&ball.y-ball.radius<bricks.brickArray[c][r].y+bricks.height){
                            //collision occurs & the direction of the ball is reversed
                            if(!mute){
                                brickBreakSound = new sound("sounds/brick-pop.wav");
                                brickBreakSound.play();
                            }
                            console.log("bam");
                            ball.dy = -ball.dy;
                            bricks.brickArray[c][r].enabled=false;
                        }
                    }
                }
            }
        }
    },
    /*
    Just a function used to check the current property-values of each brick in the grid.
    Is not a neccessary function. Is used during debugging.
    */
    checkStatus: function(){
        for(var c=0; c<bricks.colCount; c++) {
            for(var r=0; r<bricks.rowCount; r++) {
                console.log(bricks.brickArray[c][r].x+", "+bricks.brickArray[c][r].y+", "+bricks.brickArray[c][r].enabled);
            }
        }
    },
    /*
    Checks if all the bricks in the grid are broken/ have been popped.
    Called continuously during the game and is helpful to determine if the current level is cleared or not.
    */
    isCleared: function(){
        for(var c=0; c<bricks.colCount; c++) {
            for(var r=0; r<bricks.rowCount; r++) {
                if (bricks.brickArray[c][r].enabled){
                    return false;
                }
            }
        }
        return true;
    },
    /*
    This function can change the shape of the brick grid. A pattern may be used to do so. 
    The enabled property of the brick is manipulated.
    It's called during level change and right after the initial values of bricks have been set.
    */
    shapeUp: function(){
        //uses the enabled property of bricks object to modify the brick design for each level.
        switch(level){
            case 6:{
                for(var c=0; c<bricks.colCount; c++) {
                    for(var r=0; r<bricks.rowCount; r++) {
                        if(r>c||r>=bricks.colCount-c){
                            bricks.brickArray[c][r].enabled = false;
                        }
                    }
                } 
            }
            case 1:{
                for(var c=0; c<bricks.colCount; c++) {
                    for(var r=0; r<bricks.rowCount; r++) {
                        if(r>c||r>=bricks.colCount-c){
                            bricks.brickArray[c][r].enabled = false;
                        }
                    }
                } 
            }
            case 12:{
                for(var c=0; c<bricks.colCount; c++) {
                    for(var r=0; r<bricks.rowCount; r++) {
                        if(r>c||r>=bricks.colCount-c){
                            bricks.brickArray[c][r].enabled = false;
                        }
                    }
                } 
            }
        }
    },
    /*
    This function is what helps in changing the level. It sets the new values for the next level.
    It is called during level change before setting the bricks.
    */ 
    paintLevel: function(){
        bricks.rowCount = levels[level-1].rowCount;
        bricks.colors = levels[level-1].colors;
        ball.dx = levels[level-1].dx;
        ball.dy = levels[level-1].dy;
        answer.dy = levels[level-1].answerSpeed;
        questions = levels[level-1].questions;
    }
}
/*
This reusable object is the answer that's dropped during gameplay.
*/
window.answer = {
    x: canvas.width/2,
    y: 0,
    switch: true,
    curAnsNum: 1,
    dy: 2,
    background: "yellow",
    color: "black",
    /*
    Drops the answers for a given question by drawing it on the canvas.
    It also checks if the dropped answer is caught by the user or not and also determines the scoring. 
    switch variable determines if an answer is being dropped or not. 
    If it's true, then new answer is set and switch is set to false until the current answer reaches the end of the screen.
    This function's called continuously during gameplay. 
    */
    dropAnswer : function(){
        if(this.switch){
            this.curAnsNum = Math.ceil(Math.random()*4); //will give a random number from 1 to 4 (included)
            /*
            |    |~~~~.~~~~|    |
            |                   |
            |                   |
            */ 
           //the above text-image shows the start and end positions between which the answer to the question will appear from.
            this.x = Math.ceil(Math.random()*canvas.width/2 + canvas.width/4);
            this.switch=false;
        }
        if(this.y>canvas.height-bar.height){
            this.switch=true;
            this.y=0;
            //checking if the dropped answer falls on the bar or not. if it does, then score++ & question change
            console.log("ans x: "+this.x);
            console.log("init: "+bar.x+"finish: "+(bar.x+bar.width+bar.height));
            if(this.x>bar.x&&this.x<bar.x+bar.width+bar.height){
                console.log("caught");
                if(questions[questionNumber][this.curAnsNum]==questions[questionNumber][1]){
                    console.log("Correct answer! score++");
                    if(!mute){
                        scoreSound = new sound("sounds/score.wav");
                        scoreSound.play();
                    }
                    score++;
                    //cycling through the questions
                    console.log(barWidth+", "+bar.width)
                    if(bar.width<barWidth)
                        bar.width = bar.width + bar.width/10;
                    questionNumber = (questionNumber + 1)%questions.length;
                }
                else{
                    console.log("Wrong answer! score--");
                    if(!mute){
                        scoreError = new sound("sounds/error2.wav");
                        scoreError.play();
                    }
                    score--;
                    reduction = true;
                }
            }
        }
        //""
        //drawing a outer-circle surrrounding the answer:
        cx.beginPath();
        cx.arc(this.x+(fontSize/1.8), this.y-(fontSize/2.85), fontSize+3, 0, 2*Math.PI);
        cx.fillStyle = this.background;
        cx.fill();
        //drawing a circle surrrounding the answer:
        cx.beginPath();
        cx.arc(this.x+(fontSize/1.8), this.y-(fontSize/2.85), fontSize, 0, 2*Math.PI);
        cx.fillStyle = "#FFFFEE";
        cx.fill();
        //select the question number. select the random answer 
        cx.closePath();
        cx.font = fontSize+"px Arial";
        cx.fillStyle = this.color;
        cx.fillText(questions[questionNumber][this.curAnsNum], this.x, this.y);
        this.y+=this.dy;
    }
}

/*
This object forms the menu of the game.
*/
window.menu = {
    items : ["Play", "Rules", "Options"],
    pointerX: canvas.width/2 - fontSize*7,
    pointerY: canvas.height/3 - fontSize/1.2,
    gap: canvas.height/7,
    pointer: 0,
    enabled: true,
    /*
    Draws the pointer according to its position.
    It's called continuously in the menu screen.
    */
    drawPointer: function(){
        cx.beginPath();
        cx.arc(menu.pointerX, menu.pointerY, fontSize/1.2, 0, Math.PI*2);
        cx.fillStyle = "black";
        cx.fill();
        cx.closePath();
    },
    /*
    Draws the background for the menu items.
    It's called continuously in the menu screen.
    */
    divBackground: function(){
        cx.fillStyle = "green";
        cx.fillRect(canvas.width/4,2,canvas.width/2,canvas.height-4);
    },
    /*
    Draws the menu.
    It's called continously when the user is in the menu. 
    */
    draw: function(){
        drawBackground("#CCFFCC");
        menu.divBackground();
        menu.drawPointer();
        cx.font = (fontSize*2.8)+"px  undefined";
        cx.fillStyle = "white";
        for(var i=0;i<menu.items.length;i++){
            cx.fillText(menu.items[i], canvas.width/2 - canvas.width/18, canvas.height/3 + i*menu.gap);
        }
        //menu control handling is in index itself
    },
    /*
    Moves the menu pointer to the next item downward. There's a limit set to how far down the pointer can be moved.
    It's called when user presses down arrow in the menu.
    */
    moveDown: function(){
        if(menu.pointer<menu.items.length-1){
            menu.pointer++;
            menu.pointerY+=menu.gap;
            console.log(menu.pointer);
            console.log(menu.pointerY);
            if(!mute){
                navigate = new sound("sounds/navigate.wav");
                navigate.play();
            }
        }
        else{
            if(!mute){
                navError = new sound("sounds/error.wav");
                navError.play();
            }
        }
    },
    /*
    Moves the menu pointer to the next item upward. There's a limit set to how far up the pointer can be moved.
    It's called when user presses up arrow in the menu.
    */
    moveUp: function(){
        if(menu.pointer>0){
            menu.pointer--;
            menu.pointerY-=menu.gap;
            console.log(menu.pointer);
            console.log(menu.pointerY);
            if(!mute){
                navigate = new sound("sounds/navigate.wav");
                navigate.play();
            }
        }
        else{
            if(!mute){
                navError = new sound("sounds/error.wav");
                navError.play();
            }
        }
    },
    /*
    Performs certain actions as per the menu-item selected.
    It's called when the user presses the Enter key in the menu.
    */
    enter: function(){
        if(!mute){
            navigateIn = new sound("sounds/navigateInto.wav");
            navigateIn.play();
        }
        switch(menu.pointer){
            case 0:{
                //start
                inGame=true;
                bricks.paintLevel();
                bricks.set();
                gameStart = setInterval(game,10);
                clearInterval(menuStart);
                break;
            }
            case 1:{
                //rules
                inRules = true;
                showRules = setInterval(rules.draw,10);
                clearInterval(menuStart);
                break;
            }
            case 2:{
                //options
                menu.enabled = false;
                inOptions = true;
                showOptions = setInterval(options.draw,10);
                clearInterval(menuStart);
                break;
            }
            default: {
                console.log("Pointer error");
                break;
            }
        }
    }
}
/*
The object which is used to show the rules of the game.
*/
window.rules = {
    size: fontSize*2,
    gap: canvas.height/10,
    ruleSet: [
        "RULES",
        "1) Clear level by breaking all bricks or getting a score of 5.",
        "2) Maths questions will be displayed on the top left of the screen.",
        "3) Collecting right answer will increase the score by 1.",
        "4) Collecting wrong answer will decrease the score by 1.",
        "CONTROLS",
        "1) Use arrow keys to navigate.",
        "2) Use enter and escape keys to navigate in and out."
    ],
    /*
    Draws all the rules from the ruleSet.
    It's continuously called when the user is in the Rules menu.
    */
    draw: function(){
        drawBackground("#CCFFCC");
        cx.font = (fontSize*2)+"px  undefined";
        cx.fillStyle = "black";
        for(var i=0;i<rules.ruleSet.length;i++){
            if(!isNaN(rules.ruleSet[i][0]))
                cx.fillText(rules.ruleSet[i], canvas.width/10, canvas.height/5 + i*rules.gap);
            else
                cx.fillText(rules.ruleSet[i], canvas.width/2.5, canvas.height/5 + i*rules.gap);
        }
    },
    /*
    Switches from rules to the main menu.
    It's called when the user presses escape key from the rules menu.
    */
    escape: function(){
        if(!mute){
            navigateOut = new sound("sounds/navigateOut.wav");
            navigateOut.play();
        }
        inRules = false;
        menuStart = setInterval(menu.draw);
        clearInterval(showRules);
    }
}
/*
The object which helps in pausing/unpausing the game.
*/
window.pause = {
    size: fontSize*2,
    /*
    Draws the pause screen.
    Called when the user presses escape during the game.
    */
    draw: function(){
        cx.beginPath();
        cx.fillStyle = "#228822";
        cx.fillRect(canvas.width/3,canvas.height/3,canvas.width/3,canvas.height/3);
        cx.fill
        cx.closePath();
        cx.beginPath();
        cx.fillStyle = "#228822";
        cx.fillRect(fontSize/2, fontSize/2, canvas.width-fontSize,fontSize*1.3);
        cx.fill
        cx.closePath();
        cx.font = (fontSize*2)+"px  undefined";
        cx.fillStyle = "white";
        cx.fillText("PAUSED", canvas.width/2.25, canvas.height/1.95);
        
    },
    /*
    Resumes the gameplay after the pause.
    Called when the user presses escape after pausing the game.
    */
    escape: function(){
        if(!mute){
            pauseSound = new sound("sounds/pauseon.ogg");
            pauseSound.play();
        }
        paused = false;
        inGame = true;
        gameStart = setInterval(game, 10);
        clearInterval(pauseGame);
    }
}

window.options = {
    items : ["Mute", "Set start level"],
    pointerX: canvas.width/2 - fontSize*7,
    pointerY: canvas.height/2.5 - fontSize/1.2,
    gap: canvas.height/7,
    pointer: 0,
    enabled: true,
    /*
    Draws the pointer in the options menu.
    Called continously when the user is in the options menu.
    */
    drawPointer: function(){
        cx.beginPath();
        cx.arc(options.pointerX, options.pointerY, fontSize/1.2, 0, Math.PI*2);
        cx.fillStyle = "black";
        cx.fill();
        cx.closePath();
    },
    /*
    Draws the background for the menu items.
    It's called continuously in the menu screen.
    */
    divBackground: function(){
        cx.beginPath();
        cx.fillStyle = "green";
        cx.fillRect(canvas.width/4,2,canvas.width/2,canvas.height-4);
        cx.fill();
        cx.closePath();
    },
    /*
    Draws the options in the screen.
    Is called continuosly when the user is in the options menu.
    */
    draw: function(){
        drawBackground("#CCFFCC");
        options.divBackground();
        options.drawPointer();
        cx.font = (fontSize*2.8)+"px  undefined";
        cx.fillStyle = "white";
        for(var i=0;i<options.items.length;i++){
            cx.fillText(options.items[i], canvas.width/2 - canvas.width/16, canvas.height/2.5 + i*options.gap);
        }
    },
    /*
    Moves the pointer downwards. There's a limit set to how far down the pointer can be moved.
    Called whenever the user presses down arrow in the options menu.
    */
    moveDown: function(){
        if(options.pointer<options.items.length-1){
            options.pointer++;
            options.pointerY+=options.gap;
            console.log(options.pointer);
            if(!mute){
                navigate = new sound("sounds/navigate.wav");
                navigate.play();
            }
        }
        else{
            if(!mute){
                navError = new sound("sounds/error.wav");
                navError.play();
            }
        }
    },
    /*
    Moves the pointer upwards. There's a limit set to how far up the pointer can be moved.
    Called whenever the user presses up arrow in the options menu.
    */
    moveUp: function(){
        if(options.pointer>0){
            options.pointer--;
            options.pointerY-=options.gap;
            console.log(options.pointer);
            if(!mute){
                navigate = new sound("sounds/navigate.wav");
                navigate.play();
            }
        }
        else{
            if(!mute){
                navError = new sound("sounds/error.wav");
                navError.play();
            }
        }
    },
    /*
    Performs a specific action as per the choice of the user.
    Called when the user presses enter key after selecting a particular option.
    */
    enter: function(){
        navigateIn = new sound("sounds/navigateInto.wav");
        if(!mute){
            navigateIn.play();
        }
        switch(options.pointer){
            case 0:{
                console.log("mute/unmute");
                if(mute){
                    mute=false;
                    options.items[0]="Mute";
                }
                else{
                    mute=true;
                    options.items[0]="Unmute";
                }
                //mute/unmute
                break;
            }
            case 1:{
                console.log("set start level");
                //set start level
                window.level = window.prompt("Enter the level you want to start at (1-12): ","1");
                console.log(level);
                //If the user enters incorrect level, the error is handled here. There was no need of try-catch here.
                if(level<1||level>12){
                    if(!mute){
                        navigateIn.stop();
                        alertSound = new sound("sounds/ui-alert.wav");
                        alertSound.play();
                    }
                    alert("You entered incorrect level. Currently set to 1.");
                    level = 1;
                }
                break;
            }
            default: {
                console.log("Pointer error");
                break;
            }
        }
    },
    /*
    Switches from options to the main menu.
    Called when the user presses escape key in the options menu.
    */
    escape: function(){
        if(!mute){
            navigateOut = new sound("sounds/navigateOut.wav");
            navigateOut.play();
        }
        console.log(level);
        inOptions = false;
        menu.enabled = true;
        menuStart = setInterval(menu.draw, 10);
        clearInterval(showOptions);
        console.log(level);
    }
}