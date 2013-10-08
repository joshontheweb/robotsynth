(function() {
  Backbone.emulateHTTP = true;
  Backbone.emulateJSON = true;
  Backbone.Model.prototype.idAttribute = '_id';

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  bs = { // Backbone Synth
    models: {},
    views: {},
    collections: {},
    routers: {}
  }
})();
