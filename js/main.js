$(document).ready(function() {

  //data for the whole quiz
  var data =
    [
      {
        question: "Who is the main antagonist of the fellowship of the ring?",
        solutions: ["The Balrog", "Sauron", "Saruman", "The Witch King"],
        correctAnswer: 1
      },
      {
        question: "During the Siege of Barad-dur, whom was responsible for disposing the One Ring?",
        solutions: ["Elrond", "Frodo", "Gandalf", "Isildur"],
        correctAnswer: 3
      },
      {
        question: "Who, or what, were the Ringwraiths?",
        solutions: ["Dark elves that sought revenge", "Guardians of Rivendell", "9 kings of men corrupted by Sauron", "Bandits that had a fascination for rings"],
        correctAnswer: 2
      },
      {
        question: "In the Third Age, the Ring of Power remained untouched until ________ found it.",
        solutions: ["Deagol", "Bilbo Baggins", "Smeagol", "Frodo"],
        correctAnswer: 2
      },
      {
        question: "?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 1
      },
      {
        question: "6 lkfjvbfv oirsbhfbvr?",
        solutions: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 2
      },
      {
        question: "In the coming of the Second Age of Middle-Earth, twenty magical rings were crafted for the leaders of Middle-Earth to do what?",
        solutions: ["Corrupt Middle-Earths rulers", "Bring peace and prosperity", "Unite all Kingdoms", "Feed their Egos"],
        correctAnswer: 0
      },
      {
        question: "What is the true purpose of the Master Ring?",
        solutions: ["Make the user invisible", "Dominate the will of others", "Keep Sauron alive", "Augment the power of its user"],
        correctAnswer: 3
      },
      {
        question: "Bilbo Baggins may arguably be the most important character to this series for this reason. Why?",
        solutions: ["He helped the dwarves, which brought about peace", "He wrote about his adventures and inspired Frodo", "He didn't kill Gollum, which led to Gollum destroying the ring", "He met Gandalf and provided him with friendship"],
        correctAnswer: 2
      },
      {
        question: "How many people wore the Ring of Power?",
        solutions: ["Nine", "Five", "Four", "Seven"],
        correctAnswer: 0
      }

  ];

  //renders the questions and choices as well as the correct solution
  var render = function(data, index, element) {
    var left = '';
    var right = '';
    currentQuestion = Quiz.currentQuestion + 1;

    element.find('.question').html('<p class="current">' + data[index].question + '</p>' + '<br>' +'<span class="progress-span">' + currentQuestion + ' of 10</span>');

    var counter = 0;
    data[index].solutions.forEach(function(e) {
      if (counter <= 1) {
        left += '<button class="button" data-choice="' + counter + '">' + e + '</button>';
      } else {
        right += '<button class="button" data-choice="' + counter + '">' + e + '</button>';
      }
      counter++;
    });

    element.find(".buttons-left").html(left);
    element.find(".buttons-right").html(right);

    //stores the data value of the progress bar
    var health = $("progress").prop("value");
    console.log(health);

     //clicking on a button causes an event and grabs the value to check if choice is correct
    $(".button").on("click", function(e) {
      var userChoice = "";
      e.preventDefault();
      userChoice = $(e.target).data("choice");
      //console.log(userChoice);
      Quiz.checkAnswer(data, userChoice, $(".main-container"));
    });

  };

 
  //check the answer before moving on to the next question
  var checkAnswer = function(data, userChoice, element, health) {
    var index = Quiz.currentQuestion;
    console.log(health);
    if( index < data.length ) {
      if (userChoice === data[index].correctAnswer) {
        Quiz.currentQuestion++;
        Quiz.render(data, Quiz.currentQuestion, element);
        alert("correct!");
      } else {
        health--;
        document.getElementById("health").value = health;
        alert("incorrect!");
      }
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