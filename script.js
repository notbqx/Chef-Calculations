let allContainers = Array.from(document.querySelectorAll('.quiz-container'));

// 1. Shuffle and pick only 10
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffle(allContainers);
let currentIndex = 0;

function showQuestion(index) {
    allContainers.forEach(div => div.classList.remove('active')); // Hide ALL
    if (allContainers[index]) {
        allContainers[index].classList.add('active'); // Show current from the 10
    } else {
        document.body.innerHTML = "<h1>Quiz Complete! 🏆</h1>";
    }
}

showQuestion(currentIndex);

// 2. Logic for Check and Show buttons
allContainers.forEach(container => {
    const checkBtn = container.querySelector('.check-btn');
    const showanswerBtn = container.querySelector('.showanswer-btn');
    const showformulaBtn = container.querySelector('.showformula-btn');
    const input = container.querySelector('.user-input');
    const feedback = container.querySelector('.feedback');
    const formulaImage = container.querySelector('.formula-image');
    const answerText = container.getAttribute('data-answer');

    // CHECK ANSWER LOGIC
    checkBtn.addEventListener('click', () => {
        const userGuess = input.value.toLowerCase().trim();
        if (userGuess === answerText.toLowerCase()) {
            feedback.textContent = "Correct! 🎉";
            feedback.className = "feedback correct";
            setTimeout(() => {
                currentIndex++;
                showQuestion(currentIndex);
            }, 1500);
        } else {
            feedback.textContent = "Try again! ❌";
            feedback.className = "feedback wrong";
        }
    });

    // SHOW ANSWER LOGIC
    showanswerBtn.addEventListener('click', () => {
        feedback.textContent = `The answer is: ${answerText}`;
        feedback.className = "feedback"; // Neutral color
    });

    showformulaBtn.addEventListener('click', () => {
        if (formulaImage) {
            formulaImage.style.display = formulaImage.style.display === 'block' ? 'none' : 'block';
        } else {
            feedback.textContent = "No formula available for this question.";
            feedback.className = "feedback"; // Neutral color
        }
});
});