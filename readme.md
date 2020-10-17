Name:   Edwin John Nadarajan
SID:    218599279


DX-Maths
Maths is an essential part of our daily lives. For students, it is from simple task of calculating price during shopping of stationaries to complex calculations involved in their studies. For adults, it involves simple calculations made during household chores to complex calculations needed in their work. DX-Maths is a simple brick breaking game designed to help us improve our maths using the concept of leveling up while you calculate.
This game helps you with:
Basic maths (BODMAS)
Advanced maths
Word problems

Major Features:

Menu
The app has a proper menu which includes Play, Rules and Options.
"Play" will start the game.
"Rules" will show the user the main rules as well as the controls.
"Options" leads the user to a sub-menu which allows the user to:
    -Mute/Unmute the sound.
    -Set the starting level.
    This is option is intended to be used when a player has already cleared basic levels or already knows basic level maths.
    It would be boring for a 10th grader to solve addition problems when he should be focusing on more advanced stuffs.

Game
It's a brick breaking game wherein the player has to break the bricks while not letting the ball go beyond the bar (user-controlled).
Additionally, the user has to answer maths questions displayed at the top-left of the screen. Each question has 4 options
for answers which drop randomly from the top. The player has to collect the correct answer to increase the score.
On collecting wrong answer, the score would decrease. On reaching a score of 5 or breaking all the bricks, the user can clear the level.
If the user's score is zero and a wrong answer is collected, the size of the bar drops to 90% of its current size.
The game has a total of 12 levels featuring basic maths to advanced maths (grade 10); each level being harder than the previous.

Sound
The game uses a nice set of sounds to make the UX better. Appropriate are used at almost each event.


API Reference:

bar - Object
set: 
    Sets the iitial values of the bar component.
    This function needs to be when the game is initialized.
draw:
    Draws the bar as per its position.
    The shape of the bar is a curved rectangle which is made by using a rectangle and 2 semi-circles.
    It needs to be called continuosly when the game is running.
moveLeft:
    Moves the bar leftward by dx number of pixels.
    This function is called whenever left arrow is pressed in the game.
moveRight:
    Moves the bar righward by dx number of pixels.
    This function is called whenever right arrow is pressed in the game.

ball - Object
draw:
    Draws the ball as per its position. It also checks if the ball is colliding to the wall or bar.
    In case of any collision, the direction of the ball is reversed. Also, when the ball lands on the bar,
    if it lands on 1st third of it, it's horizontal speed is decreased (increased if negative). Similarly,
    when it lands on the 3rd third of it, it's horizontal speed is increased (decreased if negative).
    It needs to be called continuosly when the game is running.

bricks - Object
set:
    Creates bricks in a grid form and sets their initial values. 
    Number of rows and columns is determined by rowCount & colCount.
    It's called during level change; right after the properties of grid is determined.
draw:
    Draws the whole brick set according to the rows and columns.
    A brick is a curved rectangle which is made by using a rectangle and 2 semi-circles.
    Called continuously during gameplay.
collisionCheck:
    Checks if the ball is colliding with the brick and breaks/pops the particular brick accordingly.
    It uses the enabled property of the brick to manage whether it's already broken or broken now.
    The vertical direction of the ball is reversed in each hit.
    It has to be called continuously during gameplay.
checkStatus:
    Just a function used to check the current property-values of each brick in the grid.
    Is not a neccessary function. Is used during debugging.
isCleared:
    Checks if all the bricks in the grid are broken/ have been popped.
    Called continuously during the game and is helpful to determine if the current level is cleared or not.
shapeUp:
    This function can change the shape of the brick grid. A pattern may be used to do so. 
    The enabled property of the brick is manipulated.
    It's called during level change and right after the initial values of bricks have been set.
paintLevel:
    This function is what helps in changing the level. It sets the new values for the next level.
    It is called during level change before setting the bricks.

answer - Object
dropAnswer:
    Drops the answers for a given question by drawing it on the canvas.
    It also checks if the dropped answer is caught by the user or not and also determines the scoring. 
    switch variable determines if an answer is being dropped or not. 
    If it's true, then new answer is set and switch is set to false until the current answer reaches the end of the screen.
    This function's called continuously during gameplay.

menu - Object
drawPointer:
    Draws the pointer according to its position.
    It's called continuously in the menu screen.
divBackground:
    Draws the background for the menu items.
    It's called continuously in the menu screen.
draw:
    Draws the menu.
    It's called continously when the user is in the menu. 
moveDown:
    Moves the menu pointer to the next item downward. There's a limit set to how far down the pointer can be moved.
    It's called when user presses down arrow in the menu.
moveUp:
    Moves the menu pointer to the next item upward. There's a limit set to how far up the pointer can be moved.
    It's called when user presses up arrow in the menu.
enter:
    Performs certain actions as per the menu-item selected.
    It's called when the user presses the Enter key in the menu.

rules - Object
draw:
    Draws all the rules from the ruleSet.
    It's continuously called when the user is in the Rules menu.
escape:
    Switches from rules to the main menu.
    It's called when the user presses escape key from the rules menu.

pause - Object
draw:
    Draws the pause screen.
    Called when the user presses escape during the game.
escape:
    Resumes the gameplay after the pause.
    Called when the user presses escape after pausing the game.

options - Object
drawPointer:
    Draws the pointer in the options menu.
    Called continously when the user is in the options menu.
draw:
    Draws the options in the screen.
    Is called continuosly when the user is in the options menu.
moveDown:
    Moves the pointer downwards. There's a limit set to how far down the pointer can be moved.
    Called whenever the user presses down arrow in the options menu.
moveUp:
    Moves the pointer upwards. There's a limit set to how far up the pointer can be moved.
    Called whenever the user presses up arrow in the options menu.
enter:
    Performs a specific action as per the choice of the user.
    Called when the user presses enter key after selecting a particular option.
escape:
    Switches from options to the main menu.
    Called when the user presses escape key in the options menu.

game(): function
This function determines the gameplay.
It's called continuously during gameplay.

gameOver(): function
The function which shows the end of the game.
It's called when the player loses.

drawBackground(color,border): function
Draws the background of the game and the menu.
It also performs the function of clearing old drawings on the canvas.
It accepts 2 parameters: the background color and the border color.
Is called during all times of the game.

changeLevel(): function
Changes the level of the game. If it's 12, then ends the game.
It's called whenever the player clears a level.

drawScore(): function
Function to display the score as well as the current level.
It also determines when the player has cleared a level.
It's called continuously during the gameplay.

drawQuestion(): function
Displays the current question that the player has to answer.
It needs to be called continuously during gameplay.

showLegal(), showGame(), showJustification(): functions
Functions which help in navigation between game, legal section and mark justification.

sound - Object
Sound object/function. This object is reusable and is used each time a sound has to be played.
play:
    Plays the sound (as per src).
    Called whenever a sound has to be played.
stop:
    Stops the sound which is currently playing.
    Called when a particular sound has to be stopped before it finishes playing.

keyboardDown(), keyboardUp(), keyboardLeft(), keyboardRight(), keyboardEscape(), keyboardEnter(): functions
These functions are used to simulate keypress events.
They are under developement. They might be used if the mobile version of the game has to be released.

Data

questions:
It's a 2D array with rows as question/answers set and columns as answers.
The first element of the column will be the question. The second one will be the correct answer and the remain ones incorrect answers.

levels:
An object which contains objects (12 now as per the level). Each object inside holds the respective level configuration which include all the parameters that need to be changed (questions also).