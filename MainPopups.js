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


                // Add containment and bounds checking
        $popup.draggable({
            containment: 'window',
            drag: function(event, ui) {
                // Prevent dragging beyond viewport
                const maxX = $(window).width() - $(this).outerWidth();
                const maxY = $(window).height() - $(this).outerHeight();
                
                ui.position.left = Math.min(maxX, Math.max(0, ui.position.left));
                ui.position.top = Math.min(maxY, Math.max(0, ui.position.top));
            }
        }).resizable();

        $popup.css({
            top: 20 + popupOffset,
            left: 20 + popupOffset
        });

        popupOffset += 20;

        // Carica il contenuto della pagina HTML nel popup
        $popup.find('.popup-content').load(`mainPopups/popup-${id}.html`, function() {
            // Adjust popup size to fit content
            $popup.css({
                width: '21cm',
                height: '29.7cm',
                maxWidth: '50%',
                maxHeight: '50%'
            });
        });

        $(`#popup-${id} .close-button`).click(function() {
            $(`#popup-${id}`).remove();
            popupOffset -= 20; // Riduci l'offset quando un popup viene chiuso
        });
    });
});