$(document).ready(function() {

  //data for the whole quiz
  var data =
    [
      {
        question: "1 blajndas?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 0
      },
      {
        question: "2 abdcsghjkyhnfgbr?",
        solutions: ["answer 5", "answer 6", "answer 7", "answer 8"],
        correctAnswer: 1
      },
      {
        question: "3 dovjeidvjbeinorfnv?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 2
      },
      {
        question: "4 slkdnvoijewbtoiwenr?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 3
      },
      {
        question: "5 dovuheipvbef vn?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 1
      },
      {
        question: "6 lkfjvbfv oirsbhfbvr?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 2
      },
      {
        question: "7 blajndas?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 0
      },
      {
        question: "8 abdcsghjkyhnfgbr?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 1
      },
      {
        question: "9 dovjeidvjbeinorfnv?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 2
      },
      {
        question: "10 blajndas?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 0
      }

  ];

  //renders the questions and choices as well as the correct solution
  var render = function(data, index, element) {
    var left = '';
    var right = ''; 
    element.find('.question').html('<p class="current">' + data[index].question + '</p>');
    var counter = 0;
    data[index].solutions.forEach(function(e) {
      if (counter <= 1) {
        left += '<li class="button" data-choice="' + counter + '">' + e + '</li>';
      } else {
        right += '<li class="button" data-choice="' + counter + '">' + e + '</li>';
      }
      counter++;
    });

    element.find(".buttons-left").html(left);
    element.find(".buttons-right").html(right);

     //clicking on a button causes an event and grabs the value to check if choice is correct
    $(".button").on("click", function(e) {
      var userChoice = "";
      e.preventDefault();
      userChoice = $(this).data("choice");
      //console.log(userChoice);
      Quiz.checkAnswer(data, userChoice, $(".main-container"));
    });

  };

 
  //check the answer before moving on to the next question
  var checkAnswer = function(data, userChoice, element) {
    var index = Quiz.currentQuestion;
    if( index < data.length ) {
      console.log(userChoice);
      if (userChoice === data[index].correctAnswer) {
        console.log("correct!");
      } else {
        console.log("incorrect!");
      }

      Quiz.currentQuestion++;
      Quiz.render(data, Quiz.currentQuestion, element);
    } else {
      Quiz.currentQuestion--;
      console.log("Done!")
    }
    
  };

  //Quiz object
  var Quiz = {
    totalQuestions: data.length,
    currentQuestion: 0,
    score: 0,

    render: render,
    checkAnswer: checkAnswer
  }

  //initialize the app
  var initialize = function() {
    Quiz.render(data, Quiz.currentQuestion, $(".main-container"));
  };

  initialize();

});