
    document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.nav-menu').classList.toggle('active');
});





$(document).ready(function() {
    console.log('Document ready'); // Debug log

    // Toggle main table content
    $('.table-header').click(function() {
        console.log('Header clicked'); // Debug log
        $(this).next('.table-content').toggle();
    });
});
