
  let popupOffset = 0;

  $(document).ready(function() {
      $('a[data-id]').click(function() {
          const id = $(this).data('id');
          console.log(`Clicked row with ID: ${id}`); // Debug

          // Controlla se il popup è già aperto
          if ($(`#popup-${id}`).length) {
              return; // Evita di aprire un popup duplicato
          }

          const popupContent = `
              <div class="popup" id="popup-${id}">
                  <div class="popup-header">
                      <span>${id} | Decoded Output</span>
                      <button class="close-button">[X]</button>
                  </div>
                  <div class="popup-content">
                      <!-- Contenuto specifico del popup -->
                  </div>
              </div>
          `;
          $('#popup-container').append(popupContent);
          const $popup = $(`#popup-${id}`);
          $popup.draggable().resizable();
          $popup.css({
                top: 20 + popupOffset,
                left: 20 + popupOffset
            });

            popupOffset += 20;

          // Carica il contenuto della pagina HTML nel popup
          $popup.find('.popup-content').load(`mainPopups/popup-${id}.html`);

          $(`#popup-${id} .close-button`).click(function() {
              $(`#popup-${id}`).remove();
              popupOffset -= 20; // Riduci l'offset quando un popup viene chiuso
          });
      });
  });