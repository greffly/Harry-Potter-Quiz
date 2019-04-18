function startQuiz() {
 // takes the user from the home page to the first question of the quiz
  $('.startQuiz').on('click', function() {
    $('header').hide();
    $('form').show();
    $('#container').show();
    renderQuestion();
    //handleNextQuestion();
    console.log('startQuiz is working');
  });
}

let questionNumber = 1;
let score = 0;

function generateQuestion() {
 //this function will be responsible for creating the  question along with possible answers for the current page
  return `<section class="questionPage" role="main">
    <h2 class="question">${STORE[questionNumber-1].question}</h2>
      <form role="form" accept-charset="UTF-8">
        <fieldset>
          <label>
            <input type="radio" class="answer" name="option"/>
            ${STORE[questionNumber-1].answer1}<br>
          </label>
          <label>
            <input type="radio" class="answer" name="option"/>
            ${STORE[questionNumber-1].answer2}<br>
          </label>
          <label>
            <input type="radio" class="answer" name="option"/> 
            ${STORE[questionNumber-1].answer3}<br>
          </label>  
          <label>
            <input type="radio" class="answer" name="option"> 
            ${STORE[questionNumber-1].answer4}<br>
          </label> 
        </fieldset>
      </form>
      <button type="submit" class="nextPage">Submit</button>
      </section>
      `;
  
  console.log('generateQuestion is working');  
}

function renderQuestion() {
  $('button').on('click', function() {
    if (questionNumber < 9) {
      $('#container').html(generateQuestion());
      handleNextQuestion();
      questionNumber++;
      console.log('renderQuestion is working');
    }
    else {
      renderResults();
    }
  });
}

function handleNextQuestion() {
  //this function will proceed to the next question and rerender the page to display the following question and possible answer set
  //$('button').on('click', function() {
  if (questionNumber < STORE.length) {
    renderQuestion();  
  }
  else {
    renderResults();
  }  
  console.log('handleNextQuestion is working');
  //});
}

function handleAnswerSelected() {
 //this function will be responsible for logging the answer that the user selects

  $('button').on('click', function() {
    event.preventDefault();
    checkUserAnswer();
  });
}

function checkUserAnswer() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  let userAnswer = $('input:checked');
  let answerText = userAnswer.val();

  if (answerText == correctAnswer) {
    console.log('correctAnswer selected');
  }
  else {
    console.log('incorrectAnswer selected');
  }  
}

function isAnswerCorrect() {
 //this function will see the selected answer and determine if it is correct or not 
  if (answerText === correctAnswer) {
    score++;
  }
  console.log('isAnswerCorrect is working');
}

function updateScore() {
 //this function will add 1 point to the score if the previously selected answer was correct, if not it will leave the score as is

  console.log('updateScore is working');
}

function generateResults() {
  if (score >= 8) {
    return `<header role="banner">
        <h1>You Are The Chosen One!</h1>
        <h2>Show Score Here</h2>
        <button type="submit" class="restartQuiz">Restart Quiz</button>
      </header >`
  }
  else {
    return `<header role="banner">
        <h1>Avada Kedavra!</h1>
        <h2>Show Score Here</h2>
        <button type="submit" class="restartQuiz">Restart Quiz</button>
      </header >`
  }  
}
function renderResults() {
 //this function will show the user the final tally of their results at the end of the quiz
  $('button').on('click', function() {
  if (questionNumber === 9) {
  $('#container').html(generateResults());
  }
  console.log('renderResults is working');
  });
}

function restartQuiz() {
 //this function will look for the users' click on the restart button to restart the quiz **THIS IS NOT WORKING YET 4/16
  $('button').on('click', '.restartQuiz', function() {
  console.log('restartQuiz is working');
  });
}

function handleQuiz() {
  startQuiz();
  generateQuestion();
  //handleAnswerSelected();
  //checkUserAnswer();
  renderQuestion();
  handleNextQuestion();
  renderResults();
  restartQuiz();
}

$(handleQuiz);