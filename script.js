document.addEventListener("DOMContentLoaded", function () {
    const speakBtn = document.getElementById("speak-btn");
    const textToSpeech = document.getElementById("text-to-speech");

    let voices = [];

    // Load voices and filter female voice
    function loadVoices() {
        voices = window.speechSynthesis.getVoices();

        // Try to find a female English voice
        const preferredVoice = voices.find(voice =>
            voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("zira") ||
            (voice.name.toLowerCase().includes("english") && voice.name.toLowerCase().includes("google"))
        );

        return preferredVoice || voices[0]; // fallback to first voice if not found
    }

    // Some browsers load voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    speakBtn.addEventListener("click", function () {
        const text = textToSpeech.value.trim();
        if (text === "") {
            alert("Please enter some text to speak");
            return;
        }

        window.speechSynthesis.cancel(); // Cancel any current speech

        const utterance = new SpeechSynthesisUtterance(text);

        const selectedVoice = loadVoices();
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        window.speechSynthesis.speak(utterance);

        speakBtn.classList.add("speaking");
        utterance.onend = function () {
            speakBtn.classList.remove("speaking");
        };
    });
});