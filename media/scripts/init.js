(function() {
  if (window.AudioContext) {
    window.router = new bs.routers.Main();
    Backbone.history.start({pushState: true});
  } else {
    $('.no-audio').fadeIn();
  }
})();
