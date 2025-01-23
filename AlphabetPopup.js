$(document).ready(function() {
    $('.alphabet-index a').click(function(e) {
        e.preventDefault();
        e.stopPropagation(); // Stop event from bubbling up
        
        const id = $(this).data('id');
        
        if ($(`#popup-${id}`).length) {
            return;
        }

        const popupContent = `
            <div class="popup nested-popup" id="popup-${id}">
                <div class="popup-header">
                    <span>${id} | Index</span>
                    <button class="close-button">[X]</button>
                </div>
                <div class="popup-content">
                    <!-- Contenuto specifico del popup -->
                </div>
            </div>
        `;
        
        $('body').append(popupContent); // Append to body instead of nested container
        const $popup = $(`#popup-${id}`);

        // Independent draggable configuration
        $popup.draggable({
            containment: 'window',
            drag: function(event, ui) {
                const maxX = $(window).width() - $(this).outerWidth();
                const maxY = $(window).height() - $(this).outerHeight();
                
                ui.position.left = Math.min(maxX, Math.max(0, ui.position.left));
                ui.position.top = Math.min(maxY, Math.max(0, ui.position.top));
            }
        }).resizable();

        // Position relative to click
        const clickX = e.pageX;
        const clickY = e.pageY;
        
        $popup.css({
            position: 'fixed',
            top: clickY,
            left: clickX
        });
        
        $popup.find('.popup-content').load(`popup-${id}.html`);

        $(`#popup-${id} .close-button`).click(function(e) {
            e.stopPropagation();
            $(`#popup-${id}`).remove();
        });
    });
});