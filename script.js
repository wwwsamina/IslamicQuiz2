const questions = [
    {
        question: "What is the biggest animal mentioned in the Holy Quran?",
        answers: [
            { text: "Tiger", correct: false},
            { text: "Whale", correct: false},
            { text: "Lion", correct: false},
            { text: "Elephant", correct: true},
        ]
    },
    {
        question: "What does Ar-Rahman mean in English?",
        answers: [
            { text: "The Most Compassionate", correct: false},
            { text: "The most Loving", correct: false},
            { text: "The most Merciful", correct: true},
            { text: "The Almighty", correct: false},
        ]
    },
    {
        question: "How many gates of Jannah are there?",
        answers: [
            { text: "5", correct: false},
            { text: "6", correct: false},
            { text: "7", correct: false},
            { text: "8", correct: true},
        ]
    },
    {
        question: "What is the first masjid ever built?",
        answers: [
            { text: "Masjid al-Nabawi", correct: false},
            { text: "Masjid Quba", correct: true},
            { text: "Masjid al-Haram", correct: false},
            { text: "Masjid al-Aqsa", correct: false},
        ]
    },
    {
        question: "What is another name given to the Quran?",
        answers: [
            { text: "An-Nasr", correct: false},
            { text: "Al-Furqan", correct: true},
            { text: "Al-Fatiha", correct: false},
            { text: "Al-Qamar", correct: false},
        ]
    }   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();