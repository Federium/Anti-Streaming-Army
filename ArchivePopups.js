let popupOffset = 0;

$(document).ready(function() {
    $('tr[data-id]').click(function() {
        const id = $(this).data('id');
        console.log(`Clicked row with ID: ${id}`);

        if ($(`#popup-${id}`).length) {
            return;
        }

        const popupContent = `
            <div class="popup" id="popup-${id}">
                <div class="popup-header">
                    <span>${id} | Decoded Output</span>
                    <button class="close-button">[X]</button>
                </div>
                <div class="popup-content">
                    <div class="code-text">
                        <p id="crypted-message-${id}">Loading crypted message...</p>
                    </div>
                    <div class="translated-text">
                        <p>Decoded output <br> -------------- <br> <br></p>
                        <p id="message-content-${id}">Loading message...</p>
                    </div>
                </div>
            </div>
        `;

        $('#popup-container').append(popupContent);
        const $popup = $(`#popup-${id}`);

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

        loadPopupContent(id);

        $(`#popup-${id} .close-button`).click(function() {
            $(`#popup-${id}`).remove();
            popupOffset -= 20;
        });
    });
});

function loadPopupContent(id) {
    $.get('archiveData.csv', function(data) {
        const lines = data.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(';');
            if (fields[1].trim() === id) {
                const cryptedMessage = fields[10].trim();
                const decryptedMessage = `[${fields[1].trim()}] - ${fields[2].trim()} <br> <br> ${fields[9].trim()}`;
                $(`#crypted-message-${id}`).html(cryptedMessage);
                $(`#message-content-${id}`).html(decryptedMessage);
                break;
            }
        }
    }).fail(function() {
        console.error(`Failed to load CSV data for popup ${id}`);
    });
}
