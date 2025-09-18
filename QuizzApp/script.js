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

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("ansewr-btn");
const nextBtn = document.getElementById("next-btn");