// Global scoped objects; quiz questions array
var quiz = [
    {
        question: "The console.log() method outputs a message to..",
        answer: ["local storage", "the internet", "VS code", "the web console"],
        correct: 3
    },
    {        
        question: "The var statement declares a function-scoped or..",
        answer: ["globally-scoped variable", "total-global variable", "local-scoped variable", "total-local variable"],
        correct: 0
    },
    {
        question: "HTML is the standard markup language for..",
        answer: ["wordpress", "web pages", "applications", "javascript"],
        correct: 1
    },
    {
        question: "The addEventListener() method attaches an event handler to the specified..",
        answer: ["attribute", "element", "location", "type"],
        correct: 1
    },
    {
        question: "CSS is the language we use to style a(n) ____ document.",
        answer: ["WWW", "CS", "JS", "HTML"],
        correct: 3
    }];

var timer;
var time = 50;
var display = document.querySelector('#time');
var questionNumber = -1;


// start quiz; target DOM element, set timer & call timer, call 'questions' function
function start() {
    var begin = document.getElementById("begin");
    begin.style.display = 'none';
    timer = setInterval(timerOn, 1000);
    questions();        
    

    // start timer; if timer ends call 'gameover'function
    function timerOn() {
        time = time - 1;
        display.textContent = time;
        if (time <= 0) { gameover(); }
    };


    // start questions; questions increment & after 5 questions call 'gameover' function
    function questions() {
        if (questionNumber >= 4) {
            return gameover();
        }; questionNumber++;

        // question generate as h1, choices generate as ol
        var questionCurrent = quiz[questionNumber];
        var questionEl = document.createElement('h1');
        var choicesEl = document.createElement('ol');
        choicesEl.addEventListener("click", function (e) {correctAns(e);});   
        // individual choices generate as li
        var one = document.createElement('li');
        one.setAttribute("id", "ans1");
        var two = document.createElement('li');
        two.setAttribute("id", "ans2");
        var three = document.createElement('li');
        three.setAttribute("id", "ans3");
        var four = document.createElement('li');
        four.setAttribute("id", "ans4");
        // text content will change to current question
        questionEl.textContent = questionCurrent.question;
        one.textContent = questionCurrent.answer[0];
        two.textContent = questionCurrent.answer[1];
        three.textContent = questionCurrent.answer[2];
        four.textContent = questionCurrent.answer[3];
        // append 
        var generateEl = document.getElementById("questionHtml");
        generateEl.innerHTML = "";
        generateEl.appendChild(questionEl);
        questionEl.appendChild(choicesEl);
        choicesEl.appendChild(one);
        choicesEl.appendChild(two);
        choicesEl.appendChild(three);
        choicesEl.appendChild(four);
    };
    

    // checks choice to answer-index, lose 5 points for wrong answer 
    function correctAns(e) {
        let questionCurrent = quiz[questionNumber];
        let correctIndex = questionCurrent.correct;
        let correctText = questionCurrent.answer[correctIndex];
        if (e.target.textContent === correctText) {time -= 0;
        } else { time -= 5;
        } setTimeout(questions, 1000);
    };


    //  replace question-content with score-content, call finalScore function
    function gameover() {
        clearInterval(timer);
        var score = document.querySelector('.complete')
        var finish = document.querySelector('.done');
        finish.style.display = 'block';
        var nextQuestion = document.querySelector('#questionHtml');
        nextQuestion.style.display = 'none';
        score.textContent = `Score:${time}`;
        finalScore();
    };


    // use score array or generate if empty
    function finalScore() {
        if (!localStorage.getItem("highScores")) {
        localStorage.setItem("highScores", JSON.stringify([]));
        };
        // enter name, submit name and score together to localStorage
        var saveScore = document.querySelector('#btnScore');
        saveScore.addEventListener('click', function() {
            let nameEl = document.querySelector('#name');
            let initials = nameEl.value;
            let localScore = JSON.parse(localStorage.getItem('highScores'));
            localScore.push({ name: initials, score: time});
            localStorage.setItem('highScores', JSON.stringify(localScore));
        });
    };  
};       

// pull and display name and scores
const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
highScoreList.innerHTML = highScores
    .map(highScores => {
        return `<h4 class="highScoreList">${highScores.name}:${highScores.score}</h4>`;
    }).join("");

// 'click' event listener to run scripts    
var btnA = document.getElementById("btnA");
btnA.addEventListener("click", start);
