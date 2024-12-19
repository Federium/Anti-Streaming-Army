<script>
document.querySelector('.menu-toggle').addEventListener('click', function() {
document.querySelector('.nav-menu').classList.toggle('active');
});
</script>

<!-- 	<script type="module">
import { run } from '/play.core-master/src/run.js'
import * as program from '/play.core-master/src/programs/demos/chromaspiral.js'
run(program, { element : document.querySelector('pre') }).then(function(e){
  console.log(e)
}).catch(function(e) {
  console.warn(e.message)
  console.log(e.error)
})
</script> -->


<script>
let popupOffset = 0;

$(document).ready(function() {
  $('.link-button[data-id]').click(function(e) {
      e.preventDefault();
      const id = $(this).data('id');
      
      if ($(`#popup-${id}`).length) {
          return;
      }

      const popupContent = `
          <div class="popup" id="popup-${id}">
              <div class="popup-header">
                  <span>${id}</span>
                  <button class="close-button">[X]</button>
              </div>
              <div class="popup-content">
                  <!-- Content loaded from HTML file -->
              </div>
          </div>
      `;

      $('#popup-container').append(popupContent);
      const $popup = $(`#popup-${id}`);
      $popup.draggable({
          containment: "window"
      }).resizable();
      
      $popup.css({
          top: 20 + popupOffset,
          left: 20 + popupOffset
      });

      popupOffset += 20;

    
      $popup.find('.popup-content').load(`mainPopups/popup-${id}.html`);

      $(`#popup-${id} .close-button`).click(function() {
          $(`#popup-${id}`).remove();
          popupOffset -= 20;
      });
  });
});
</script>




<script>
let adPopupOffset = 0;

function showAdPopup() {
    if ($('#ad-popup').is(':visible')) {
        return;
    }

    // Position popup randomly on screen
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 300;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    $('#ad-popup')
        .css({
            position: 'fixed',
            top: randomY + 'px',
            left: randomX + 'px',
            zIndex: 10000
        })
        .show()
        .resizable();

    // Close button functionality
    $('#ad-popup .close-button').click(function() {
        $('#ad-popup').hide();
    });
}

// Show popup at random intervals between 15 and 30 seconds
function scheduleNextPopup() {
    const minDelay = 1000000;  // 15 seconds
    const maxDelay = 3000000;  // 30 seconds
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    
    setTimeout(() => {
        showAdPopup();
        scheduleNextPopup();
    }, randomDelay);
}

// Start the popup cycle when document is ready
$(document).ready(function() {
    scheduleNextPopup();
});
</script>
