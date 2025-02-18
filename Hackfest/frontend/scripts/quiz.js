const quizData = [
    {
        question: "What is the most energy-efficient way to heat water in your home?",
        options: ["Electric kettle", "Solar water heater", "Gas stove", "Microwave oven"],
        correct: "Solar water heater"
    },
    {
        question: "How much energy does turning off lights when leaving a room save over a year?",
        options: ["It doesn't save much", "Around $10", "Around $50", "Around $200"],
        correct: "Around $50"
    },
    {
        question: "Which appliance uses the most energy in a typical household?",
        options: ["Refrigerator", "Washing machine", "Air conditioner", "Dishwasher"],
        correct: "Air conditioner"
    },
    {
        question: "What is the benefit of using energy-efficient LED bulbs?",
        options: ["They are cheaper to buy", "They last longer and use less energy", "They emit more light", "They are brighter than regular bulbs"],
        correct: "They last longer and use less energy"
    },
    {
        question: "Which of these actions can help reduce your home's energy consumption?",
        options: ["Leaving devices plugged in", "Using energy-efficient appliances", "Keeping windows open in winter", "Running the dishwasher half-full"],
        correct: "Using energy-efficient appliances"
    }
];

let currentQuestionIndex = 0;  // Keeps track of which question the user is on
let score = 0;  // Keeps track of user's score

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

function loadQuestion() {
    // Clear previous question (if any)
    quizContainer.innerHTML = '';
    resultContainer.textContent = '';

    if (currentQuestionIndex < quizData.length) {
        const questionItem = quizData[currentQuestionIndex];

        const questionText = document.createElement('h3');
        questionText.textContent = questionItem.question;
        quizContainer.appendChild(questionText);

        // Create options
        questionItem.options.forEach(option => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question';
            optionInput.value = option;
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));
            quizContainer.appendChild(optionLabel);
        });

        // Update submit button text based on question number
        if (currentQuestionIndex === quizData.length - 1) {
            submitButton.textContent = 'Submit Quiz';
        } else {
            submitButton.textContent = 'Next Question';
        }

        // Disable the submit button until an answer is selected
        submitButton.disabled = true;
    } else {
        showResults();
    }
}

function handleAnswer() {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption) {
        // Check if the answer is correct
        const currentQuestion = quizData[currentQuestionIndex];
        if (selectedOption.value === currentQuestion.correct) {
            score++;
        }

        // Move to the next question
        currentQuestionIndex++;
        loadQuestion();  // Load the next question
    }
}

// Enable the submit button once an answer is selected
quizContainer.addEventListener('change', function() {
    submitButton.disabled = false;
});

submitButton.addEventListener('click', handleAnswer);

function showResults() {
    quizContainer.innerHTML = '';
    resultContainer.textContent = `You got ${score} out of ${quizData.length} correct!`;
    
    // Change button text to 'Retry' and update its function
    submitButton.textContent = 'Retry Quiz';
    submitButton.removeEventListener('click', handleAnswer);  // Remove the old listener
    submitButton.addEventListener('click', restartQuiz);  // Add new listener
}

function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    
    // Reset button
    submitButton.textContent = 'Next Question';
    submitButton.removeEventListener('click', restartQuiz);  // Remove restart listener
    submitButton.addEventListener('click', handleAnswer);  // Add back the handle answer listener
    
    // Load first question
    loadQuestion();
}

// Load the first question when the page loads
loadQuestion();