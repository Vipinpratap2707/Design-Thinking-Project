// script.js

// Sample quiz questions and answers
const quizQuestions = [
    { question: "What is digital privacy?", options: ["The right to control one's personal information.", "The ability to browse anonymously.", "The use of encryption."], answer: "The right to control one's personal information." },
    { question: "What is two-factor authentication?", options: ["A security process that requires two different forms of identification.", "A method to encrypt data.", "A type of firewall."], answer: "A security process that requires two different forms of identification." },
    { question: "What is phishing?", options: ["A method to catch fish.", "A fraudulent attempt to obtain sensitive information.", "A type of malware."], answer: "A fraudulent attempt to obtain sensitive information." },
    { question: "What does VPN stand for?", options: ["Virtual Private Network", "Variable Public Network", "Virtual Protected Network"], answer: "Virtual Private Network" },
    { question: "What is malware?", options: ["Software designed to harm or exploit any programmable device.", "A type of antivirus software.", "A method of data encryption."], answer: "Software designed to harm or exploit any programmable device." },
    { question: "What is a firewall?", options: ["A security system that monitors and controls incoming and outgoing network traffic.", "A type of malware.", "A method of data encryption."], answer: "A security system that monitors and controls incoming and outgoing network traffic." },
    { question: "What is encryption?", options: ["The process of converting information into a code to prevent unauthorized access.", "A method of data backup.", "A type of software."], answer: "The process of converting information into a code to prevent unauthorized access." },
    { question: "What is a strong password?", options: ["A password that is easy to remember.", "A password that includes a mix of letters, numbers, and symbols.", "A password that is the same as your username."], answer: "A password that includes a mix of letters, numbers, and symbols." },
    { question: "What is social engineering?", options: ["A method of manipulating people to gain confidential information.", "A type of software attack.", "A way to improve social skills."], answer: "A method of manipulating people to gain confidential information." },
    { question: "What is a data breach?", options: ["An incident where unauthorized access to data occurs.", "A method of data storage.", "A type of software."], answer: "An incident where unauthorized access to data occurs." },
    { question: "What is a secure connection?", options: ["A connection that is encrypted and protects data during transmission.", "A connection that is fast.", "A connection that is always available."], answer: "A connection that is encrypted and protects data during transmission." },
    { question: "What is identity theft?", options: ["The act of stealing someone's personal information to commit fraud.", "A type of online shopping.", "A method of data encryption."], answer: "The act of stealing someone's personal information to commit fraud." },
    { question: "What is a botnet?", options: ["A network of infected computers controlled by a hacker.", "A type of antivirus software.", "A method of data backup."], answer: "A network of infected computers controlled by a hacker." }
];

// Sample scenario questions and answers
const scenarioQuestions = [
    { scenario: "You receive an email asking for your bank details. What should you do?", answer: "Do not respond and report the email as phishing." },
    { scenario: "You notice unusual activity on your bank account. What is your immediate action?", answer: "Contact your bank immediately to report the activity." },
    { scenario: "You are asked to share your password with a colleague for a project. What should you do?", answer: "Do not share your password; instead, use a secure method to collaborate." },
    { scenario: "You find a USB drive in the parking lot. What should you do?", answer: "Do not plug it into your computer; report it to IT." },
    { scenario: "You receive a call from someone claiming to be from tech support asking for your login credentials. What should you do?", answer: "Do not provide any information; hang up and verify the call with the company." }
];

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create a question element
function createQuestionElement(question, index) {
    const questionDiv = document.createElement('div');

    const questionText = document.createElement('p');
    questionText.innerText = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);

    const optionsContainer = document.createElement('div');

    question.options.forEach((option) => {
        const label = document.createElement('label');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `quizAnswer${index}`;
        input.value = option;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
    });

    questionDiv.appendChild(optionsContainer);
    return questionDiv;
}

// Function to start the quiz
function startQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.style.display = 'block';
    quizContainer.innerHTML = '<h4 class="quiz-title">Quiz Questions</h4>';

    // Shuffle questions and select the first 5 for the quiz
    shuffleArray(quizQuestions);
    const selectedQuestions = quizQuestions.slice(0, 5);

    selectedQuestions.forEach((q, index) => {
        const questionElement = createQuestionElement(q, index);
        quizContainer.appendChild(questionElement);
    });

    const submitButton = createSubmitButton(submitQuiz);
    quizContainer.appendChild(submitButton);
}

// Function to create a submit button
function createSubmitButton(onClick) {
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit Quiz';
    submitButton.onclick = onClick;

    return submitButton;
}

// Function to submit the quiz and calculate score
function submitQuiz() {
    let score = 0;
    const selectedQuestions = quizQuestions.slice(0, 5); // Ensure we check the same questions

    selectedQuestions.forEach((q, index) => {
        const userAnswer = document.querySelector(`input[name="quizAnswer${index}"]:checked`);
        if (userAnswer && userAnswer.value === q.answer) {
            score++;
        }
    });
    alert(`Quiz submitted! Your score: ${score} out of ${selectedQuestions.length}`);
    document.getElementById('quizContainer').style.display = 'none';
}

// Function to start the scenario-based learning
function startScenario() {
    const scenarioContainer = document.getElementById('scenarioContainer');
    scenarioContainer.style.display = 'block';
    scenarioContainer.innerHTML = '<h4 class="scenario-title">Scenario Questions</h4>';

    scenarioQuestions.forEach((s, index) => {
        const scenarioDiv = document.createElement('div');

        const scenarioText = document.createElement('p');
        scenarioText.innerText = `${index + 1}. ${s.scenario}`;
        scenarioDiv.appendChild(scenarioText);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `scenarioAnswer${index}`;
        input.placeholder = 'Your answer';

        scenarioDiv.appendChild(input);
        scenarioContainer.appendChild(scenarioDiv);
    });

    const submitButton = createSubmitButton(submitScenario);
    scenarioContainer.appendChild(submitButton);
}

// Function to submit the scenarios and provide feedback
function submitScenario() {
    let feedback = '';
    scenarioQuestions.forEach((s, index) => {
        const userAnswer = document.getElementById(`scenarioAnswer${index}`).value.trim().toLowerCase();
        feedback += `Scenario ${index + 1}: ${userAnswer === s.answer.toLowerCase() ? 'Correct!' : `Incorrect. Suggested answer: "${s.answer}".`}<br>`;
    });
    document.getElementById('scenarioContainer').innerHTML = `<p>${feedback}</p>`;
}

// Function to handle feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !message) {
        displayErrorMessage('Please fill in all fields.');
        return;
    }
    
    // Here you can add logic to send the feedback to a server or process it
    document.getElementById('feedbackResult').innerHTML = `
        <p>Thank you, ${name}! Your feedback has been received.</p>
    `;
    
    // Clear the form
    document.getElementById('feedbackForm').reset();
});

// Function to update the footer year dynamically
function updateFooterYear() {
    const year = new Date().getFullYear();
    document.getElementById('footerYear').innerText = year;
}

window.onload = function() {
    updateFooterYear();
};

// Initially hide the quiz and scenario containers
document.getElementById('quizContainer').style.display = 'none';
document.getElementById('scenarioContainer').style.display = 'none';