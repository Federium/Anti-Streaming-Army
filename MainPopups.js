let popupOffset = 0;

$(document).ready(function() {
    $('a[data-id]').click(function() {
        const id = $(this).data('id');
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if ($(`#popup-${id}`).length) {
            return;
        }

        const popupContent = `
            <div class="popup ${isMobile ? 'mobile' : ''}" id="popup-${id}">
                <div class="popup-header">
                    <span>${id} | leaked file</span>
                    <button class="close-button">[X]</button>
                </div>
                <div class="popup-content">
                    <!-- Contenuto specifico del popup -->
                </div>
            </div>
        `;
        $('#popup-container').append(popupContent);
        const $popup = $(`#popup-${id}`);

        if (!isMobile) {
            $popup.draggable({
                containment: 'window',
                drag: function(event, ui) {
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
        } else {
            $popup.css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                margin: 0,
                zIndex: 10000
            });
        }

        // Carica il contenuto della pagina HTML nel popup
        $popup.find('.popup-content').load(`/Anti-Streaming-Army/mainPopups/popup-${id}.htmlts=${new Date().getTime()}`, function() {
          console.log(`/Anti-Streaming-Army/mainPopups/popup-${id}.html`);
            // Adjust popup size to fit content
            $popup.css({
                width: '40%',
                height: '65%',
                maxWidth: '100%',
                maxHeight: '100%'
            });
        });

        $(`#popup-${id} .close-button`).click(function() {
            $(`#popup-${id}`).remove();
            if (!isMobile) {
                popupOffset -= 20;
            }
        });
    });
});