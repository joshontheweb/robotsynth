(function() {
  if (window.AudioContext) {

    try {
      // safari has an audio context but breaks on setting detune as of version 6.0.5
      var osc = window.AudioContext.createOscillator();
      osc.detune.value = 5;
    } catch (err) {
      $('.no-audio').fadeIn();
    }
    
    window.router = new bs.routers.Main();
    Backbone.history.start({pushState: true});
  } else {
    $('.no-audio').fadeIn();
  }
})();
