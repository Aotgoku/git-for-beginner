// Get references to the DOM elements
const startButton = document.getElementById('startButton');
const statusText = document.getElementById('statusText');
const outputText = document.getElementById('outputText');
const loadingIndicator = document.getElementById('loadingIndicator');

// Initialize Speech Recognition (for Voice Input)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';  // Set language
recognition.interimResults = false;  // Get only the final result
recognition.maxAlternatives = 1;  // Max alternatives for results

// Function to handle the "Start Listening" button click
startButton.addEventListener('click', () => {
    // Disable the button while listening
    startButton.disabled = true;
    startButton.classList.add('btn-disabled');
    
    statusText.textContent = 'Listening... Please speak now...';
    loadingIndicator.style.display = 'block'; // Show loading indicator
    recognition.start();  // Start voice recognition
});

// Event: When speech is recognized
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    outputText.value = transcript;  // Display recognized speech in the output text box
    statusText.textContent = 'Processing your request...';
    speakResponse(transcript);  // Process and respond with voice feedback
    resetButton(); // Re-enable the button
    loadingIndicator.style.display = 'none'; // Hide loading indicator
};

// Event: When an error occurs
recognition.onerror = (event) => {
    statusText.textContent = 'Sorry, I didn\'t catch that. Please try again.';
    resetButton(); // Re-enable the button
    loadingIndicator.style.display = 'none'; // Hide loading indicator
};

// Function to reset button state after speaking
function resetButton() {
    startButton.disabled = false;
    startButton.classList.remove('btn-disabled');
}

// Function to speak a response using Text-to-Speech (TTS)
function speakResponse(responseText) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `You said: ${responseText}. How can I assist you further?`;
    utterance.voice = speechSynthesis.getVoices()[0]; // Use default system voice
    speechSynthesis.speak(utterance);
}

startButton.addEventListener('click', () => {
    console.log("Start Listening clicked");  // Debugging
    startButton.disabled = true;
    startButton.classList.add('btn-disabled');
    
    statusText.textContent = 'Listening... Please speak now...';
    loadingIndicator.style.display = 'block'; // Show loading indicator
    recognition.start();  // Start voice recognition
});

// Event: When speech is recognized
recognition.onresult = (event) => {
    console.log("Speech recognized: ", event);  // Debugging
    const transcript = event.results[0][0].transcript;
    outputText.value = transcript;  // Display recognized speech in the output text box
    statusText.textContent = 'Processing your request...';
    speakResponse(transcript);  // Process and respond with voice feedback
    resetButton(); // Re-enable the button
    loadingIndicator.style.display = 'none'; // Hide loading indicator
};

// Event: When an error occurs
recognition.onerror = (event) => {
    console.log("Error occurred: ", event);  // Debugging
    statusText.textContent = 'Sorry, I didn\'t catch that. Please try again.';
    resetButton(); // Re-enable the button
    loadingIndicator.style.display = 'none'; // Hide loading indicator
};
