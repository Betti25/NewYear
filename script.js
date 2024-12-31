document.addEventListener("DOMContentLoaded", function () {
    const countdownElement = document.getElementById("countdown");
    const videoContainer = document.getElementById("video-container");
    const messageContainer = document.getElementById("message-container");
    const initialContent = document.getElementById("initial-content");
    const gifImage = document.getElementById("gif-image");
    const backsound = document.getElementById("backsound");
    const newYearVideo = document.getElementById("new-year-video");
    const transitionElements = document.querySelectorAll('.transition');

    // Start playing the backsound
    backsound.play().catch((error) => {
        console.log("Audio autoplay mungkin dicegah oleh browser. Mulai audio setelah interaksi pengguna.");
    });

    // Set the target time: 1 January 2025, 00:00 (Paris Time)
    const targetTime = new Date("2025-01-01T00:00:00+01:00");

    function updateCountdown() {
        const now = new Date();
        const timeDiff = targetTime - now;

        if (timeDiff <= 0) {
            // Hide the initial content
            initialContent.style.display = "none";

            // Stop the backsound
            backsound.pause();

            // Show message container and video
            messageContainer.style.display = "block";
            videoContainer.style.display = "block";

            // Change to GIF
            gifImage.style.display = "block";

            // Apply the transition effect
            transitionElements.forEach(element => {
                element.classList.add('show');
            });
        } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    // Stop backsound when video starts playing
    newYearVideo.addEventListener('play', function () {
        backsound.pause();
    });

    // Update countdown every second
    setInterval(updateCountdown, 1000);
});
