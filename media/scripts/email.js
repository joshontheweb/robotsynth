(function() {

  $('.email-input').keydown(function(e) {
    e.stopPropagation();
    if (e.keyCode === 13) {
      e.preventDefault();
      $('.submit').click();
    }

  });

  $('.submit').click(function(e) {
    e.preventDefault();

    // $('.email-container').fadeOut('fast', function() {
      var opts = {
        lines: 10, // The number of lines to draw
        length: 5, // The length of each line
        width: 2, // The line thickness
        radius: 3, // The radius of the inner circle
        rotate: 0, // The rotation offset
        color: '#fff', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 10, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      window.spinner = new Spinner(opts).spin();
      window.$spinner = $(window.spinner.el);
      $('.email-container').append(window.$spinner);
      window.$spinner.fadeIn();

      $.ajax({
        type: 'POST',
        url: '/signup',
        data: {email: $('.email-input').val()},
        success: function(data) {
          $('.email-input').val('');
          window.$spinner.fadeOut('fast', function() {
            window.spinner.stop();
            $('.email-container').text('Thanks! You have been sent a confirmation email.');
          })
        },
        error: function(data) {
          window.$spinner.fadeOut('fast', function() {
            window.spinner.stop();
          });
          $('.email-container').fadeIn('fast', function() {
            $('.email-container').text('<span class="error">Oh Noes! Something went wrong. :/</span>');
          });
        }
      })
    // });
  });
})();
