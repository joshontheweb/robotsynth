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

    $('.email-container').fadeOut('fast', function() {
      var opts = {
        lines: 17, // The number of lines to draw
        length: 30, // The length of each line
        width: 5, // The line thickness
        radius: 30, // The radius of the inner circle
        rotate: 0, // The rotation offset
        color: '#fff', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      window.spinner = new Spinner(opts).spin();
      window.$spinner = $(window.spinner.el);
      $('.email-signup').append(window.$spinner);
      window.$spinner.fadeIn();

      $.ajax({
        type: 'POST',
        url: '/signup',
        data: {email: $('.email-input').val()},
        success: function(data) {
          $('.email-input').val('');
          window.$spinner.fadeOut('fast', function() {
            window.spinner.stop();
            $('.email-signup').text('Thanks! You have been sent a confirmation email.');
          })
        },
        error: function(data) {
          window.$spinner.fadeOut('fast', function() {
            window.spinner.stop();
          });
          $('.email-signup').fadeIn('fast', function() {
            $('.email-signup').text('<span class="error">Oh Noes! Something went wrong. :/</span>');
          });
        }
      })
    });
  });
})();
