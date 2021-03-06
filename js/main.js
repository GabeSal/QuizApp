$(document).ready(function() {

  //data for the whole quiz
  var data =
    [
      {
        question: "Who is the main antagonist of the fellowship of the ring?",
        solutions: ["The Balrog", "Sauron", "Saruman", "The Witch King"],
        correctAnswer: 1,
        hint: "He is mostly seen as an eye in the films"
      },
      {
        question: "During the Siege of Barad-dur, whom was responsible for disposing the One Ring?",
        solutions: ["Elrond", "Frodo", "Gandalf", "Isildur"],
        correctAnswer: 3,
        hint: "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them..."
      },
      {
        question: "Who, or what, were the Ringwraiths?",
        solutions: ["9 kings of men corrupted by Sauron", "Dark elves that sought revenge", "Guardians of Rivendell", "Bandits that had a fascination for rings"],
        correctAnswer: 0,
        hint: "They were born of noble blood and bent to the will of the Dark Lord"
      },
      {
        question: "In the Third Age, the Ring of Power remained untouched until ________ found it.",
        solutions: ["Deagol", "Bilbo Baggins", "Smeagol", "Frodo"],
        correctAnswer: 2,
        hint: "My precious!"
      },
      {
        question: "How many races make up all of Middle-Earth?",
        solutions: ["Eleven", "Twenty-six", "Three", "Thirteen"],
        correctAnswer: 1,
        hint: "Although the leading races include humans, elves, and dwarves there are many more sentient beings as well"
      },
      {
        question: "Tom Bombadil is an enigma in the J.R.R. Tolkien mythology. What is he best known for?",
        solutions: ["His blue jacket and yellow boots", "Saving Pip and Mary from Old Man Willow", "He doesn't exist", "The One Ring has no effect on him"],
        correctAnswer: 3,
        hint: "His abilities stretch beyond any human or elf"
      },
      {
        question: "In the coming of the Second Age of Middle-Earth, twenty magical rings were crafted for the leaders of Middle-Earth to do what?",
        solutions: ["Corrupt Middle-Earths rulers", "Bring peace and prosperity", "Unite all Kingdoms", "Feed their Egos"],
        correctAnswer: 0,
        hint: "One was crafted in the fires of Mordor after the creation of the previous rings"
      },
      {
        question: "What is the true purpose of the Master Ring?",
        solutions: ["Make the user invisible", "Augment the power of its user", "Dominate the will of others", "Keep Sauron alive"],
        correctAnswer: 1,
        hint: "Only mortals experience negative side effects from the ring, however in the right hands, its power ensured victory"
      },
      {
        question: "Bilbo Baggins may arguably be the most important character to this series for this reason. Why?",
        solutions: ["He helped the dwarves, which brought about peace", "He wrote about his adventures and inspired Frodo", "He didn't kill Gollum, which led to Gollum destroying the ring", "He met Gandalf and provided him with friendship"],
        correctAnswer: 2,
        hint: "At the end of the Return of the King, Frodo reached Mount Doom..."
      },
      {
        question: "How many people wore the Ring of Power?",
        solutions: ["Nine", "Five", "Four", "Seven"],
        correctAnswer: 0,
        hint: "Many are not known in the films but in the Silmarillion, all known bearers are specified"
      }

  ];

  //renders the questions and choices as well as the correct solution
  var render = function(data, index, element) {
    var list = '';
    currentQuestion = Quiz.currentQuestion + 1;

    element.find('.container').html('<p class="current">' + data[index].question + '</p>' + '<br>' +'<span class="progress-span">' + currentQuestion + ' of 10</span>');

    var counter = 1;
    for(var i = 0; i < 4; i++) {
      list += '<button class="button" data-choice="' + i + '">' + counter + ". " + data[index].solutions[i] + '</button>' + '<div class="clear-fix"></div>';
      counter++;
    }

    element.find(".buttons-group").html(list);

     //clicking on a button causes an event and grabs the value to check if choice is correct
    $(".button").on("click", function(e) {
      var userChoice = "";
      var currentButton = $(e.target);
      e.preventDefault();
      userChoice = $(e.target).data("choice");
      Quiz.checkAnswer(data, userChoice, currentButton, $(".main-container"));
    });

    $(".close-button").on("click", function(e) {
      e.preventDefault();
      removeOverlay();
    });

  };

  //event functions
  function removeOverlay() {
    $(document).find(".overlay").addClass('hidden');
  }

  function correctAnswer(data, element) {
    Quiz.currentQuestion++;
    if (Quiz.currentQuestion < data.length) {
      setTimeout( function() {
        Quiz.render(data, Quiz.currentQuestion, element);
      }, 700);
    } else if (Quiz.currentQuestion === data.length) {
      gameOver();
    }
  }

  function incorrectAnswer() {
    Quiz.score--;
    $("progress").animate({ "value": Quiz.score }, 500);
    if (Quiz.score >= 1) {
      $(document).find(".overlay").removeClass('hidden');
      $(".overlay").find("p").text( data[Quiz.currentQuestion].hint );

    } else if (Quiz.score === 0) {
      setTimeout( function() {
        youLose();
      }, 600);
    }
  }

  // you lose
  function youLose() {
    $(document).find(".main-container").addClass('hidden');
    $(document).find(".start-menu").removeClass('hidden');
    $(".start-menu-title").text("Game Over");
    $(".start-quiz").text("Reset");
  }

  // you win
  function gameOver() {
    $(document).find(".main-container").addClass('hidden');
    $(document).find(".start-menu").removeClass('hidden');
    $(".start-menu-title").text("You Win!");
    $(".start-quiz").text("Reset");
  }

 
  //check the answer before moving on to the next question
  var checkAnswer = function(data, userChoice, currentButton, element, health) {
    var index = Quiz.currentQuestion;
    if( index < data.length ) {
      //if answer is correct -> highlight answer and move on to the next question 
      if (userChoice === data[index].correctAnswer) {
        var data = data;
        var element = $('.main-container');

        $("form").find(currentButton).addClass('highlight');
        $(currentButton).html("<span>Correct!</span>");
        correctAnswer(data, element);

      } else { //if answer is wrong, lose one health point and update progress bar
        incorrectAnswer();
        Quiz.render(data, Quiz.currentQuestion, element);
      }
    }
  };

    //Quiz object
  var Quiz = {
    totalQuestions: data.length,
    currentQuestion: 0,
    score: 3,
    render: render,
    checkAnswer: checkAnswer
  }

  //initialize the app
  var initialize = function() {
    Quiz.currentQuestion = 0;
    Quiz.score = 3;
    Quiz.render(data, Quiz.currentQuestion, $(".main-container"));

    // create score progress bar
    $(".main-container").find('.health-bar').html(
      '<progress class="progress-bar" max="3" value="'
      + Quiz.score
      +'"></progress>');
  };

  $(".start-quiz").on("click", function(event) {
    setTimeout( function() {
      $(document).find(".main-container").removeClass('hidden');
      $(document).find(".start-menu").addClass('hidden');
      initialize();
    }, 75);
  });

});