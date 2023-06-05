let question=document.querySelector('#question');
let quizOptions=document.querySelector('.quiz-options');
let correctAnswer="", correctScore=askedCount=0,totalQuestion=10;
const _correctScore=document.getElementById('correct-score');
const _totalQuestion=document.getElementById('total-question');

document.addEventListener('DOMContentLoaded',()=>{
    _totalQuestion.textContent=totalQuestion;
    _correctScore.textContent=correctScore;
    fetch_question.fetchQuestion();
})

let fetch_question={
    fetchQuestion:function(){
        fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`)
        .then((response)=> response.json())
        .then((data)=>this.displayQuestion(data));
    },
    displayQuestion:function(data){
        const category=data.results[0].category;
        const quiz_question=data.results[0].question;
        const correctAnswer=data.results[0].correct_answer;
        const incorrectAnswer=data.results[0].incorrect_answers;
        question.innerHTML=`${quiz_question} <br> <span class="category"> ${category}</span>`;
        const optionList=[];
        optionList.push(...incorrectAnswer);
        optionList.splice(Math.floor(Math.random()*(incorrectAnswer.length+1)),0,correctAnswer);
        quizOptions.innerHTML=`${optionList.map((option,index)=>`
        <li>${index+1}. ${option}</li>
        `).join('')}
        `;
        console.log(category);
        console.log(data);
        console.log(data.results[0].category);
        console.log(optionList);
    }
}