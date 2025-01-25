$(document).ready(function() {
  $('.menu-toggle').click(function() {
    $(this).toggleClass('active');
    $('.nav-menu').toggleClass('active');
  });
});





$(document).ready(function() {
    console.log('Document ready'); // Debug log

    // Toggle main table content
    $('.table-header').click(function() {
        console.log('Header clicked'); // Debug log
        $(this).next('.table-content').toggle();
    });
});
