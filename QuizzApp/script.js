// Quiz questions array for programming topics
const questions = [
    // HTML Questions
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<href>", correct: false },
            { text: "<a>", correct: true },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image?",
        answers: [
            { text: "title", correct: false },
            { text: "alt", correct: true },
            { text: "src", correct: false },
            { text: "text", correct: false }
        ]
    },
    // CSS Questions
    {
        question: "Which CSS property is used to change the text color?",
        answers: [
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "foreground-color", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the space between elements?",
        answers: [
            { text: "padding", correct: false },
            { text: "spacing", correct: false },
            { text: "margin", correct: true },
            { text: "border", correct: false }
        ]
    },
    // JavaScript Questions
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        answers: [
            { text: "append()", correct: false },
            { text: "push()", correct: true },
            { text: "add()", correct: false },
            { text: "insert()", correct: false }
        ]
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        answers: [
            { text: "variable myVar;", correct: false },
            { text: "v myVar;", correct: false },
            { text: "let myVar;", correct: true },
            { text: "declare myVar;", correct: false }
        ]
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        answers: [
            { text: "getElementById()", correct: true },
            { text: "selectById()", correct: false },
            { text: "getElement()", correct: false },
            { text: "findById()", correct: false }
        ]
    },
    {
        question: "What does '===' operator do in JavaScript?",
        answers: [
            { text: "Compares only values", correct: false },
            { text: "Assigns a value", correct: false },
            { text: "Compares values and types", correct: true },
            { text: "Creates a variable", correct: false }
        ]
    },
    // Algorithm Questions
    {
        question: "What is the time complexity of binary search?",
        answers: [
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n²)", correct: false },
            { text: "O(1)", correct: false }
        ]
    },
    {
        question: "Which sorting algorithm has the best average case time complexity?",
        answers: [
            { text: "Bubble Sort", correct: false },
            { text: "Selection Sort", correct: false },
            { text: "Quick Sort", correct: true },
            { text: "Insertion Sort", correct: false }
        ]
    },
    {
        question: "What is a recursive function?",
        answers: [
            { text: "A function that loops infinitely", correct: false },
            { text: "A function that calls itself", correct: true },
            { text: "A function with multiple parameters", correct: false },
            { text: "A function that returns nothing", correct: false }
        ]
    },
    {
        question: "What does 'Big O' notation describe?",
        answers: [
            { text: "The memory usage of an algorithm", correct: false },
            { text: "The worst-case time complexity", correct: true },
            { text: "The number of lines in code", correct: false },
            { text: "The programming language used", correct: false }
        ]
    },
    {
        question: "Which data structure follows LIFO (Last In First Out) principle?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Array", correct: false },
            { text: "Stack", correct: true },
            { text: "Linked List", correct: false }
        ]
    }
];

// Get DOM elements
const questionElement = document.getElementById("Question"); // Fixed: matches HTML id="Question"
const answerBtnsElement = document.getElementById("ansewr-btn");
const nextBtn = document.getElementById("next-btn");

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let isAnswerSelected = false;

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    nextBtn.style.display = "none"; // Hide next button initially
    showQuestion();
}

// Display current question and answers
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    
    // Create answer buttons dynamically
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text; // Fixed: use textContent instead of innerHTML
        button.classList.add("btn");
        
        // Add event listener for answer selection
        button.addEventListener("click", () => selectAnswer(answer, button));
        
        answerBtnsElement.appendChild(button);
    });
}

// Reset the quiz state for new question
function resetState() {
    nextBtn.style.display = "none";
    isAnswerSelected = false;
    
    // Clear all answer buttons - improved method
    answerBtnsElement.innerHTML = "";
}

// Handle answer selection
function selectAnswer(selectedAnswer, selectedButton) {
    // Prevent multiple selections
    if (isAnswerSelected) return;
    
    isAnswerSelected = true;
    
    // Check if the selected answer is correct
    if (selectedAnswer.correct) {
        selectedButton.style.background = "#48bb78"; // Green background for correct answer
        score++;
    } else {
        selectedButton.style.background = "#f56565"; // Red background for wrong answer
        
        // Highlight the correct answer in green
        const buttons = answerBtnsElement.querySelectorAll(".btn");
        buttons.forEach((button, index) => {
            if (questions[currentQuestionIndex].answers[index].correct) {
                button.style.background = "#48bb78"; // Green for correct answer
            }
        });
    }
    
    // Disable all answer buttons after selection
    const allButtons = answerBtnsElement.querySelectorAll(".btn");
    allButtons.forEach(button => {
        button.style.pointerEvents = "none"; // Make buttons unclickable
        button.style.cursor = "not-allowed";
    });
    
    // Show next button
    nextBtn.style.display = "block";
}

// Handle next button click
function handleNextButton() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Display final score and play again option
function showScore() {
    resetState();
    
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    
    // Customize message based on score
    if (percentage >= 80) {
        message = "Excellent work! 🎉";
    } else if (percentage >= 60) {
        message = "Good job! 👍";
    } else if (percentage >= 40) {
        message = "Not bad, keep practicing! 📚";
    } else {
        message = "Keep studying and try again! 💪";
    }
    
    questionElement.innerHTML = `
        <div style="text-align: center;">
            <h2>Quiz Completed!</h2>
            <p style="font-size: 1.5rem; margin: 20px 0; color: #001e4d;">
                Your Score: <strong>${score}/${questions.length}</strong> (${percentage}%)
            </p>
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 20px;">
                ${message}
            </p>
        </div>
    `;
    
    // Change next button to "Play Again"
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
    nextBtn.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
}

// Event listener for next button
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Restart the quiz
    }
});

// Initialize the quiz when page loads
document.addEventListener("DOMContentLoaded", () => {
    startQuiz();
});