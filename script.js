let startTime;
let endTime;

document.getElementById('user-input').addEventListener('focus', function() {
    startTime = new Date().getTime();
});

document.getElementById('submit').addEventListener('click', function() {
    endTime = new Date().getTime();
    const userInput = document.getElementById('user-input').value;
    const textToType = document.getElementById('text-to-type').textContent;

    if (userInput === textToType) {
        const timeTaken = (endTime - startTime) / 1000; // in seconds
        const wordsTyped = userInput.split(' ').length;
        const typingSpeed = (wordsTyped / timeTaken) * 60; // words per minute

        document.getElementById('result').innerHTML = `
            <h2>Result</h2>
            <p>Time taken: ${timeTaken.toFixed(2)} seconds</p>
            <p>Typing speed: ${typingSpeed.toFixed(2)} WPM</p>
        `;
    } else {
        document.getElementById('result').innerHTML = `<p>Text does not match. Please try again.</p>`;
    }
});

