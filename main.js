let questions = [
    {
        question:"Chappal Waddi is the highest mountain of Nigeria. What state is it located in?",
        answers: [
            {text:'Taraba', correct:true},
            {text:'Sokoto', correct:false},
            {text:'Oyo', correct:false},
            {text:'Kano', correct:false}
            ]
    },
    {
        question:"What is the capital of Nigeria?",
        answers: [
            {text:'Lagos', correct:false},
            {text:'Port Harcourt', correct:false},
            {text:'Kaduna', correct:false},
            {text:'Abuja', correct:true}
            ]
    },
    {
        question:"The national anthem of Nigeria has been Arise, O Compatriots since 1978. What was the previous national anthem?",
        answers: [
            {text:'Arise O fellow Nigerians', correct:false},
            {text:'Nigeria We Hail Thee', correct:true},
            {text:'Nigeria We love thee', correct:false},
            {text:'Our dear country Nigeria', correct:false}
            ]
    },
    {
        question:"What is the capital of Kwara State?",
        answers: [
            {text:'Niger', correct:false},
            {text:'Oyo', correct:false},
            {text:'Ilorin', correct:true},
            {text:'Osun', correct:false},
            ]
    },
    {
        question:"Nigeria is divided into 36 states. Which one is the largest by area?",
        answers: [
            {text:'Lagos', correct:false},
            {text:'Niger', correct:true},
            {text:'Oyo', correct:false},
            {text:'Kano', correct:false},
            ]
    },
    {
        question:"Whose face is on the 20 Naira Note?",
        answers: [
            {text:'Nnamdi Azikwe', correct:false},
            {text:'Tafawa Balewa', correct:false},
            {text:'Yakubu Gowon', correct:false},
            {text:'Murtala Muhammed', correct:true},
            ]
    },
    {
        question:"Nigeria's flag consists of two colors. What are they?",
        answers: [
            {text:'White and Yellow', correct:false},
            {text:'Yellow and Grey', correct:false},
            {text:'Grey and White', correct:false},
            {text:'White and Green', correct:true},
            ]
    },
    {
        question:"Nigeria achieved independence in 1960 from which country?",
        answers: [
            {text:'UK', correct:true},
            {text:'US', correct:false},
            {text:'USSR', correct:false},
            {text:'UAE', correct:false}
            ]
    }
]


const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let  AllButtons = Array.from(answerButton.children);
let  isCorrect;

let currentQuestionIndex = 0;
let score = 0;
let startQuiz = () => {
    resetState()
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}
const options = document.querySelectorAll(".btn");
let showQuestion = () => {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo+". "+currentQuestion.question;
    currentQuestion.answers.map((ans,index) => {
       let eachOption =  options[index]
       eachOption.innerHTML = ans.text
       if(ans.correct){
        eachOption.dataset.correct = ans.correct;
       }
        
       eachOption.addEventListener('click',selectAnswer)
    })
}

let selectAnswer = (e) => {
    selectedBtn = e.target;
    isCorrect = selectedBtn.dataset.correct==='true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        
    }else{
        selectedBtn.classList.add("incorrect");
        
    }
    AllButtons.forEach(button => {

      if(button.dataset.correct === "true"){
           button.classList.add("correct");
                
        }
        button.disabled = true;
           
      })
    nextButton.style.display = "block";

}
 nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        
        handleNextButton()
        AllButtons.forEach(button => {
             
            button.disabled = false;
        })
    }else{
        answerButton.style.display = "block"
        startQuiz()
    }
 });

 let handleNextButton = () => {
    AllButtons.forEach(button => {

        if(button.dataset.correct === "true"){
            button.removeAttribute("data-correct");
            button.classList.remove("correct");
            nextButton.style.display = "none";
            }else{
                button.classList.remove("incorrect")
            }
        })
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        answerButton.style.display = "none"
        showScore()
    }
 }

 let showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
 }

let resetState = () => {
    nextButton.style.display = "none"
    
    
}

startQuiz()

