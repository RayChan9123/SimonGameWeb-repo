
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = 1;
var level  = 0;

$(document).keydown(function () {
  if (start)
  {
    nextSequence();
    start = 0;
  }
});

//play sound and flash button randomly
function nextSequence() {
  //clear user input
  userClickedPattern = [];

  var randomNumber = Math.floor( Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;

  $("h1").text("Level " + level);
}

//play sound when button is clicked
$(".btn").click(function () {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //length - 1 as the element of the array start from 0, check answer bases on user input pattern
  checkAnswer(userClickedPattern.length - 1);

});

function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");
  //remove class after 0.1s
  setTimeout(function () { $("." + currentColour).removeClass("pressed"); }, 100);

}
//play sound accroding color
function playSound (color) {

      var sound = new Audio("sounds/" + color + ".mp3");
      sound.play();
}

//check if user clicked the correct button
function checkAnswer(currentLevel) {

  //check if the most recent button is right
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel])
  {
    //check if user finished the pattern
    if (userClickedPattern.length == gamePattern.length)
    {
      setTimeout(function () { nextSequence() }, 1000);
    }
  }
  else
  {
    //add game over effect
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over") }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver()
{
  level = 0;
  gamePattern = [];
  start = 1;
}

$(document).keypress(()=> {
  $("h1").text(event.key);
});
