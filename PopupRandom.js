
$(document).ready(function() {
    let adPopupOffset = 0;

    // Function to animate counter
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 200000;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(startValue + (target - startValue) * progress);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // Function to show popup
    function showAdPopup() {
        if ($('#random-popup').is(':visible')) {
            return;
        }
        $('#random-popup').show();
        const counter = document.querySelector('.counter');
        animateCounter(counter);
    }

    // Attach close button handler
    $('.close-button').on('click', function() {
        $('#random-popup').hide();
    });

    // Schedule popup appearance
    function scheduleNextPopup() {
        const delay = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => {
            showAdPopup();
            scheduleNextPopup();
        }, delay);
    }

    // Start the popup cycle
    scheduleNextPopup();
});