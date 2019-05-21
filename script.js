function handleStartQuiz() {
  $('.nextQuestion').on('click', function() {
    $('header').hide();
    $('form').show();
    $('#container').show();
    $('footer').show();
    $('.questionAnswerForm').hide();
    console.log('startQuiz is working');
  });
}

let questionNumber = 1;
let score = 0;

function generateQuestion() {
  iterateQuestion();
  iterateScore();
  $('.results').hide();
  return `<section class="questionPage" role="Question Page">
    <h2 class="question">${STORE[questionNumber-1].question}</h2>
      <form role="form" accept-charset="UTF-8">
        <fieldset>
          <label>
            <input type="radio" class="answer" name="option" value="${STORE[questionNumber-1].answer1}"/>
            ${STORE[questionNumber-1].answer1}<br>
          </label>
          <label>
            <input type="radio" class="answer" name="option" value="${STORE[questionNumber-1].answer2}"/>
            ${STORE[questionNumber-1].answer2}<br>
          </label>
          <label>
            <input type="radio" class="answer" name="option" value="${STORE[questionNumber-1].answer3}"/> 
            ${STORE[questionNumber-1].answer3}<br>
          </label>  
          <label>
            <input type="radio" class="answer" name="option" value="${STORE[questionNumber-1].answer4}"/> 
            ${STORE[questionNumber-1].answer4}<br>
          </label> 
        </fieldset>
      </form>
      <button type="submit" class="getResults">Submit</button>
      </section>
    `;
  console.log('generateQuestion is working');  
}

function renderQuestion() {
  console.log("renderQuestion question number", questionNumber);
  $('#container').html(generateQuestion());
  $('header').hide();
  $('form').show();
  $('#container').show();
  $('.questionAnswerForm').hide();
}

function handleNextQuestion() {
  $('.nextQuestion').on('click', function() {
    if (questionNumber <= STORE.length) {  
      renderQuestion();
      questionNumber++;  
    }
    else {
      renderResults();
    }  
  console.log('handleNextQuestion is working');
  });
}

function handleAnswerSubmitted() {
  $('#container').on('click', '.getResults', function() {
    //event.preventDefault();
    checkUserAnswer();
    $('.questionAnswerForm').show();
  });
}

function checkUserAnswer() {
  event.preventDefault();
  //Need to fix this so there's no -2 value
  let correctAnswer = `${STORE[questionNumber-2].correctAnswer}`;
  let userAnswer = $("input:checked").val();

  if (userAnswer == correctAnswer) {
    console.log("checkUserAnswer score", score);
    correctAnswerFeedback();
  }
  else {
    console.log('incorrectAnswer selected');
    incorrectAnswerFeedback();
  }  
}

function correctAnswerFeedback() {
  score++;
  iterateScore();
  $('header').hide();
  $('form').hide();
  $('#container').hide();
  $('footer').show();
  $('.questionAnswerForm').html(`<div role="banner" class="results">
    <iframe src="https://giphy.com/embed/DxUiFqLgDVC00" width="480" height="330" frameBorder="0" class="giphy" alt="10 Points For Gryffindor" allowFullScreen></iframe>
    <button type="submit" class="nextQuestion">Next Question</button>
    </div>`);
  if (questionNumber <= STORE.length) {  
    handleNextQuestion(); 
  }
  else {
    renderResults();
  }    
}

function incorrectAnswerFeedback() {
  iterateScore();
  $('header').hide();
  $('form').hide();
  $('#container').hide();
  $('footer').show();
  $('.questionAnswerForm').html(`<div role="banner" class="results">
    <h2>Nope, The Correct Answer Is ${STORE[questionNumber-2].correctAnswer}!</h2>
    <iframe src="https://giphy.com/embed/mqSiZYc0KxyYo" width="480" height="195" frameBorder="0" class="giphy" alt="McGonnagal says Sorry Potter" allowFullScreen></iframe>
    <button type="submit" class="nextQuestion">Next Question</button>
    </div>`);
  if (questionNumber <= STORE.length) {  
    handleNextQuestion(); 
  }
  else {
    renderResults();
  } 
}

function iterateQuestion() {
  $('.currentQuestion').html(`<p>Question: ${questionNumber} / 10</p>`);
}

function iterateScore() {
  let houseScore = score * 10;
  $('.currentScore').html(`<p>House Points Earned: ${houseScore}</p>`);
}

function generateResults() {
  if (score >= 8) {
    return $('.resultsPage').html(`<header role="banner">
        <h1>You Are The Chosen One!</h1>
        <p><iframe src="https://giphy.com/embed/gbErpwcLlizvi" width="480" height="247" frameBorder="0" class="giphy" alt="Hogwarts Celebration" allowFullScreen></iframe></p>
        <h2>You Got ${score} Out Of 10 Correct</h2>
        <button type="submit" class="restartQuiz">Restart Quiz</button>
      </header >`);
  }
  else {
      return $('.resultsPage').html(`<header role="banner"><h1>The Dark Lord Has Defeated You!</h1>
      <p><iframe src="https://giphy.com/embed/JAbAmpu1TshlS" width="480" height="198" frameBorder="0" class="giphy" alt="Voldemort Avada Kedavra" allowFullScreen></iframe></p>
      <h2>You Got ${score} Out Of 10 Correct</h2>
      <button type="submit" class="restartQuiz">Restart Quiz</button>
      </header >`);
  }  
}

function renderResults() {
  $('.nextQuestion').on('click', function() {
    $('.results').hide(); 
    generateResults();
    console.log('renderResults is working');
    restartQuiz();
  });
}

function restartQuiz() {
  $('.restartQuiz').on('click', function() {
  location.reload();
  console.log('restartQuiz is working');
  });
}

function handleQuiz() {
  handleStartQuiz();
  handleAnswerSubmitted();
  handleNextQuestion();
  restartQuiz();
}

$(handleQuiz);