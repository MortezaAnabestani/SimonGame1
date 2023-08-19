var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
    if(!started){
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(event){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);    

    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

function checkAnswer(currentLevel){
    console.log(userClickedPattern[currentLevel]);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout (function() {
                nextSequence()
            }, 1500);
        }
    }else{

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html(`<b>Level ${gamePattern.length}</b> Stopped!<br/><br/> Game Over, Press Any Key to Restart`);
        let finalcolour = gamePattern[currentLevel];

        startOver();
        animatePress(finalcolour);

    }

}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(150).fadeIn(150);

    $("#" + randomChosenColour).on("click", function(){
        $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

        playSound(randomChosenColour);
    });

}

function playSound(name){
    new Audio(`./sounds/${name}.mp3`).play();

}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
      }, 200);
    
}

function startOver(){
    level = 0; 
    started = false;
    gamePattern = [];
}