(function() {
  var beatSource;
  var beatGain = synth.context.createGain();
  beatGain.gain.value = 5;
  beatGain.connect(synth.context.destination)
  $('.beat').click(function(e) {
    e.preventDefault();
    var $target = $(e.target);
    
    if ($target.hasClass('active')) {
      $('.beat').removeClass('active');
      $('.robot-head').removeClass('dancing');
      beatSource.stop(0);
    } else { 
      $('.beat').removeClass('active');
      $target.addClass('active');
      $('.robot-head').addClass('dancing');
    
      var url = $target.attr('href');


      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function() {
        synth.context.decodeAudioData(request.response, function(buffer) {
          if (beatSource) {
            beatSource.stop(0);
          }
          beatSource = synth.context.createBufferSource();
          beatSource.buffer = buffer;
          beatSource.loop = true;
          beatSource.connect(beatGain);
          beatSource.start(0);
        }, function(err) {
          console.log(err);
        });
      }
      request.send();
    }
  });

})();
