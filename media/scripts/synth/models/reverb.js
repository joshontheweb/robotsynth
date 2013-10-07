(function() {
  'use strict';

  bs.models.Reverb = Backbone.Model.extend({
    initialize: function(attrs, options) {
      this.context = options.context;
      this.reverb = this.context.createConvolver();
    },

    connect: function(node) {
      this.reverb.connect(node);
    }
  });
})();
