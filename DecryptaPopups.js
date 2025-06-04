let popupOffset = 0;

$(document).ready(function() {
    $('a[data-id]').click(function() {
        const id = $(this).data('id');
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log(`Clicked row with ID: ${id}`);

        if ($(`#popup-${id}`).length) {
            return;
        }

        const popupContent = `
            <div class="popup ${isMobile ? 'mobile' : ''}" id="popup-${id}">
                <div class="popup-header">
                    <span>${id} | FILE</span>
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
                left: 20 + popupOffset,
                width: '40%',
                height: '70%',
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

        $popup.find('.popup-content').load(`../../decryptaPopups/popup-${id}.html`);

        $(`#popup-${id} .close-button`).click(function() {
            $(`#popup-${id}`).remove();
            if (!isMobile) {
                popupOffset -= 20;
            }
        });
    });
});