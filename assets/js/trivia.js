var q1 = {
    "question" : "Who is the main character of Disney?",
    "choices" : ["Donald Duck","Minnie Mouse","Goofy","Mickey Mouse"],
    "answer" : "Mickey Mouse",
    "img" : "assets/images/mickey.gif"
};

var q2 = {
    "question" : "Cruella de Vil is the villain in which Disney movie?",
    "choices" : ["Cinderella","101 Dalmations","Beauty and the Beast","Snow White"],
    "answer" : "101 Dalmations",
    "img" : "assets/images/101Dalmations.gif"
};

var q3 = {
    "question" : "In the movie Frozen, which song does Elsa sing as she builds the castle?",
    "choices" : ["Do You Want To Build A Snowman?","For The First Time In Forever","Let It Go","Fixer Upper"],
    "answer" : "Let It Go",
    "img" : "assets/images/let_it_go.gif"
};

var q4 = {
    "question" : "In the movie Finding Nemo, which country has Nemo been taken to?",
    "choices" : ["Australia","China","United States","England"],
    "answer" : "Australia",
    "img" : "assets/images/austrailia.gif"
};

var questions = [q1,q2,q3,q4];

var intervalId;
var activeQuestion;
var time = 30;
var qq;
var game = {
    wins: 0,
    losses: 0,
    unanswered: 0,
    qCount: 0,
    startGame: function(){
        $("#time-remaining").hide();
        $("#question").hide();
        $("#choices").hide();
        $("#startOver").hide();

        $("#start").show();
        $("#start").text("Start Game");
        $("#start").on("click",function(){
            game.resetGame();
        });
    },
    resetGame: function(){
        game.qCount = 0;
        game.wins = 0;
        game.losses = 0;
        game.unanswered = 0;
        resetQuestion();
        triviaStart();
        showQuestion();
        handleClick();
    }
};



function resetQuestion(){
    time = 30;
    activeQuestion = false;
    qq = getRandomQuestion();
    game.qCount++;
    
}

function triviaStart(){
    $("#start").hide();
    $("#startOver").hide();
    $("#time-remaining").show();
    $("#question").show();
    $("#choices").show();
    if(!activeQuestion){
        activeQuestion = true;
        clearInterval(intervalId);
        intervalId = setInterval(timeRemaining,1000);
    }
    
}

function getRandomQuestion(){
    //for random Math.floor(Math.random()*questions.length)
    //return questions[Math.floor(Math.random()*questions.length)];
    console.log("Getting Next Question");
    console.log("qcount: " +game.qCount);
    console.log("q length: " + questions.length);
    
    if(game.qCount < questions.length){
        var rval =  questions[game.qCount];
        return rval;
    }
    else{
        showResults();
    }
    
}
function showQuestion(){
    $("#time-remaining").text("Time Remaining: " + time + " Seconds");
    q = qq;
    $("#question").text(q.question);

    q.choices.forEach(function(x,i){
        $("#ans"+i).text(x);
    });

}

function handleClick(){
    //I really want to put this stuff in a loop and I tried but the loop doesn't just sets the "click" events
    //it runs them, which is not what i want. i only want to run the checkAnswer() when a user clicks
    $("#ans0").on("click",function(){
        var chosen = $("#ans0").text();
        var correct = qq.answer;
        checkAnswer(chosen,correct);
    });

    $("#ans1").on("click",function(){
        var chosen = $("#ans1").text();
        var correct = qq.answer;
        checkAnswer(chosen,correct);
    });

    $("#ans2").on("click",function(){
        var chosen = $("#ans2").text();
        var correct = qq.answer;
        checkAnswer(chosen,correct);
    });

    $("#ans3").on("click",function(){
        var chosen = $("#ans3").text();
        var correct = qq.answer;
        checkAnswer(chosen,correct);
    });
    
}

function reset(){
    console.log("resetting");
    console.log("qcount: " +game.qCount);
    console.log("q length: " + questions.length);
    if(game.qCount < questions.length){
        resetQuestion();
        triviaStart();
        showQuestion();
    }
    else{
        showResults();
    }
}

function checkAnswer(chosen,correct){
    if(chosen === correct){
        game.wins++;
        showCongrats();
        setTimeout(function(){
            reset()
        },1000*3);
    }
    else{
        game.losses++;
        $("#time-remaining").hide();
        showCorrectAnswer("Nope");
        setTimeout(function(){
            reset()
        },1000*3);
       
    }
}

function showCorrectAnswer(input){
    $("#choices").hide();
    var html = input + "!! <br><br> The correct answer was : " + qq.answer + "! <br>";
    html += "<img src='"+qq.img+"'/>";
    $("#question").html(html);
}

function showCongrats(){
    $("#choices").hide();
    var html = "<br><br> Correct!!! <br>";
    html += "<img src='assets/images/correct.gif'/>";
    $("#question").html(html);
}

function showResults() {
    $("#time-remaining").hide();
    $("#question").show();
    $("#choices").hide();
    $("#start").hide();

    var html = "<br><br> All done, Here's how you did.<br><br>";
    html += "Correct Answers: " + game.wins + "<br>";
    html += "Incorrect Answers: " + game.losses + "<br>";
    html += "Unanswered: " + game.unanswered + "<br>";
    $("#question").html(html);

    $("#startOver").show();
        $("#startOver").text("Start Over?");
        $("#startOver").on("click",function(){
            game.resetGame();
            
    });
}

function timeRemaining(){
    if(time > 0) {
        time--;
        $("#time-remaining").text("Time Remaining: " + time + " Seconds");
    }    
    else{
        game.unanswered++;
        clearInterval(intervalId);
        showCorrectAnswer("Out Of Time")
        setTimeout(function(){
            reset()
        },1000*5);
        
        //show time run out screen
    }
    
}


$(document).ready(function () {
    game.startGame();
});