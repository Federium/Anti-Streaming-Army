let popupOffset = 0;

$(document).ready(function() {
    $('tr[data-id]').click(function() {
        const id = $(this).data('id');
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log(`Clicked row with ID: ${id}`);

        if ($(`#popup-${id}`).length) {
            return;
        }

        const popupContent = `
            <div class="popup ${isMobile ? 'mobile' : ''}" id="popup-${id}">
                <div class="popup-header">
                    <span>${id} | Decoded Output</span>
                    <button class="close-button">[X]</button>
                </div>
                <div class="popup-content">
                    <div class="code-text">
                        <p id="crypted-message-${id}">Loading crypted message...</p>
                    </div>
                    
                    <div class="alphabet-index" style="text-align: right; font-size: 14px;">
                    +---------------------+ <br>
                    | <button onclick="openAlphabetPopup()" class="alphabet-trigger" style="color: #ffffff; background: none; border: none; cursor: pointer; font-size: 14px;">open alphabet index</button> | <br>
                    +---------------------+          
                    </div>
                    
                    <div class="translated-text">
                        <p>Decoded output <br> -------------- <br> <br></p>
                        <p id="message-content-${id}">Loading message...</p>
                    </div>
                </div>
                <div id="nested-popup-container"></div>
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

        loadPopupContent(id);

        $(`#popup-${id} .close-button`).click(function() {
            $(`#popup-${id}`).remove();
            if (!isMobile) {
                popupOffset -= 20;
            }
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

function openAlphabetPopup() {
    console.log('Opening alphabet popup');
    const alphabetPopup = `
        <div class="popup standalone" id="popup-ALPHABET">
            <div class="popup-header">
                <span>ALPHABET INDEX</span>
                <button class="close-button">[X]</button>
            </div>
            <div class="popup-content">
                <div class="svg-table-index"></div>
            </div>
        </div>
    `;
    
    $('body').append(alphabetPopup);
    const $popup = $('#popup-ALPHABET');
    
    $popup.draggable({
        containment: 'window',
        handle: '.popup-header'
    });

    $popup.css({
        'position': 'fixed',
        'top': '10%',
        'left': '10%',
        'background': '#000000',
        'border': '2px solid #ffffff',
        'z-index': '20000',
        'min-width': '300px'
    });

    $('#popup-ALPHABET .popup-content').load('../../popup-ALPHABET.html');
    
    $('#popup-ALPHABET .close-button').click(function() {
        $('#popup-ALPHABET').remove();
    });
}