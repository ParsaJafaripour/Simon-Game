// Color array for the game
var buttonColors = ["red", "blue", "green", "yellow"];

// Arrays to hold the game and user patterns
var gamePattern = [];
var userClickedPattern = [];

// Flags to check if the game has started and to track the current level
var started = false;
var level = 0;

// Detects keypress to start the game
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Handles button clicks by the user
$(".btn").click(function() {
    // Identifies which button was clicked
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // Plays sound and animates the button press
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Checks the user's answer against the game pattern
    checkAnswer(userClickedPattern.length - 1);
});

// Generates the next sequence in the game
function nextSequence() {
    // Resets the user's pattern for the new sequence
    userClickedPattern = [];

    // Increments the game level and updates the display
    level++;
    $("#level-title").text("Level " + level);

    // Generates a random color and adds it to the game pattern
    var randomNum1 = Math.floor(Math.random() * 4);
    var randomChosenColors = buttonColors[randomNum1];
    gamePattern.push(randomChosenColors);

    // Animates the new color in the sequence
    $("#" + randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);

    // Plays the corresponding sound
    playSound(randomChosenColors);
}

// Function to play sound
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Animates a button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Checks the user's answer against the game pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // Proceeds to the next sequence if the user has completed the current one
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1500);
        }
    } else {
        // Handles incorrect answers
        playWrongSoundAndAnimate();

        // Resets the game for a new start
        startOver();
    }
}

// Plays the wrong answer sound and animates the game-over screen
function playWrongSoundAndAnimate() {
    var audioGameOver = new Audio('sounds/wrong.mp3');
    audioGameOver.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }, 300);

    console.log("wrong");
}

// Resets the game to its initial state
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
