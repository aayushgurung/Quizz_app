document.getElementById("start-quiz").addEventListener("click", function(event) {
    event.preventDefault(); 
    var questionNumber = document.getElementById("question-number").value;
    var category = document.getElementById("trivia-category").value;
    var difficulty = document.getElementById("difficulty").value;
    var questionType = document.getElementById("question-type").value;
    
    // Perform further actions with the extracted values
    console.log("Question Number:", questionNumber);
    console.log("Category:", category);
    console.log("Difficulty:", difficulty);
    console.log("Question Type:", questionType);
    
    // You can use these values to make API requests or perform any other desired operations
    
    // Reset the form
    document.getElementById("quiz-form").reset();
  });

let question=document.querySelector('#question');
let quizOptions=document.querySelector('.quiz-options');
let correctAnswer="", correctScore=askedCount=0,totalQuestion=10;
const _correctScore=document.getElementById('correct-score');
const _totalQuestion=document.getElementById('total-question');
const _checkAnswer=document.getElementById('check-answer');
const _playAgain=document.getElementById('play-again');
const _result=document.getElementById('result');



function eventListerners(){
    _checkAnswer.addEventListener('click',Question.checkAnswer);
}
document.addEventListener('DOMContentLoaded',()=>{
    Question.fetchQuestion();
    eventListerners();
    _totalQuestion.textContent=totalQuestion;
    _correctScore.textContent=correctScore;
    
    
});

let Question={
    fetchQuestion:function(){
        const self=this;
        _checkAnswer.disabled=false;
        fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`)
        .then((response)=> response.json())
        .then((data)=>this.displayQuestion(data));
    },
    displayQuestion:function(data){
        _result.innerHTML="";
        const category=data.results[0].category;
        const quiz_question=data.results[0].question;
        const correctAnswer=data.results[0].correct_answer;
        const incorrectAnswer=data.results[0].incorrect_answers;
        this.correct=correctAnswer;
        question.innerHTML=`${quiz_question} <br> <span class="category"> ${category}</span>`;
        const optionList=[];
        optionList.push(...incorrectAnswer);
        optionList.splice(Math.floor(Math.random()*(incorrectAnswer.length+1)),0,correctAnswer);
        quizOptions.innerHTML=`${optionList.map((option,index)=>`
        <li>${index+1}. <span>${option}</span></li>
        `).join('')}
        `;
        console.log("Correct Answer is :"+ correctAnswer);
        console.log(category);
        console.log(data);
        console.log(data.results[0].category);
        console.log(optionList);
        this.selectOption();
        
    },
    selectOption:function (){
        console.log("selectOption");
        quizOptions.querySelectorAll('li').forEach((option) => {
            option.addEventListener('click',()=>{
                if(quizOptions.querySelector('.selected')){
                    const activeOption=quizOptions.querySelector('.selected');
                    activeOption.classList.remove('selected');
                }
                option.classList.add('selected');
            });
        });
    },
    checkAnswer:function(){
        _checkAnswer.disabled=true;
        if(quizOptions.querySelector('.selected')){
            let selectedAnswer = quizOptions.querySelector('.selected span').textContent.toString();
            if (selectedAnswer.trim()==HTMLDecoder(Question.correct)){
                console.log(Question.correct);
                console.log("Congratulation Correct Answer");
                correctScore++;
                _result.innerHTML=`<p> <i class="fa-solid fa-circle-check fa-fade" style="color: #f9db8e;"></i> Correct Answer! </p>`;
                
            }
            else{
                console.log("Incorrect");
                _result.innerHTML=`<p> <i class="fa-solid fa-circle-xmark fa-fade" style="color: #ff5252;"></i> Incorrect Answer<br><small><b>Correct Answer:</b>
                ${Question.correct}</small></p>
                `
            }
        }
        checkCount();
        console.log('Inside checkanaswer function');
    }
    
}

function HTMLDecoder(textString){
    let doc = new DOMParser().parseFromString(textString,"text/html");
    return doc.documentElement.textContent;
}

function checkCount(){
    console.log('CheckCount');
    askedCount++;
    setCount();
    if (askedCount===totalQuestion){

    }
    else{
        setTimeout(()=>{
            Question.fetchQuestion();
        },300);
    }
}
function setCount(){
    _totalQuestion.textContent=totalQuestion;
    _correctScore.textContent=correctScore;
}