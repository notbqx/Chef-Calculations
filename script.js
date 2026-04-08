let allContainers = Array.from(document.querySelectorAll('.quiz-container'));
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 1. Shuffle Function
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
    // Hide ALL questions first
    allContainers.forEach(div => div.classList.remove('active'));

    // Handle Nav Button Visibility (using allContainers.length)
    if (index === 0) {
        prevBtn.classList.add('hidden-nav');
    } else {
        prevBtn.classList.remove('hidden-nav');
    }

    if (index === allContainers.length - 1) {
        nextBtn.classList.add('hidden-nav');
    } else {
        nextBtn.classList.remove('hidden-nav');
    }

    // Show current question
    if (allContainers[index]) {
        allContainers[index].classList.add('active');
    } else {
        document.body.innerHTML = "<h1>Quiz Complete! 🏆</h1>";
    }
}

// Initial call
showQuestion(currentIndex);

// 2. Logic for Question Buttons (Check, Show Answer, Formula)
allContainers.forEach(container => {
    const checkBtn = container.querySelector('.check-btn');
    const showanswerBtn = container.querySelector('.showanswer-btn');
    const showformulaBtn = container.querySelector('.showformula-btn');
    const input = container.querySelector('.user-input');
    const feedback = container.querySelector('.feedback');
    const formulaImage = container.querySelector('.formula-image');
    const answerText = container.getAttribute('data-answer');

    checkBtn.addEventListener('click', () => {
        const userGuess = input.value.toLowerCase().trim();
        if (userGuess === answerText.toLowerCase()) {
            feedback.textContent = "Correct! 🎉";
            feedback.className = "feedback correct";
        } else {
            feedback.textContent = "Try again! ❌";
            feedback.className = "feedback wrong";
        }
    });

    showanswerBtn.addEventListener('click', () => {
        feedback.textContent = `The answer is: ${answerText}`;
        feedback.className = "feedback";
    });

    showformulaBtn.addEventListener('click', () => {
        if (formulaImage) {
            const isVisible = formulaImage.style.display === 'block';
            formulaImage.style.display = isVisible ? 'none' : 'block';
        } else {
            feedback.textContent = "No formula available.";
            feedback.className = "feedback";
        }
    });
}); // End of forEach

// 3. Arrow Navigation Listeners (Move these OUTSIDE the forEach)
nextBtn.addEventListener('click', () => {
    if (currentIndex < allContainers.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
    }
});