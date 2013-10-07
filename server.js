var express = require('express');
var _ = require('underscore');
var exec = require('child_process').exec
var port = 2012;
var mcapiKey = '33aec45bf6894883a6a1b921ba3bfe2f-us2';
var soundKeepListId = 'edb3858885';
var MailChimpAPI = require('mailchimp').MailChimpAPI;

try { 
    var mcapi = new MailChimpAPI(mcapiKey, { version : '1.3', secure : false });
} catch (error) {
    console.log('Error: ' + error);
}

var app = express.createServer();

app.use(express.bodyParser());
app.use('/media', express.static(__dirname + '/media'));
app.set('views', __dirname + '/templates');

// app.register('.html', {
//   compile: function (str, options) {
//     var template = _.template(str);
//     return function (locals) {
//       return template(locals);
//     };
//   }
// });

app.get('*', function(req, res) {
  res.status(200).sendfile(__dirname + '/templates/index.html');
});

app.post('/signup', function(req, res) {
  mcapi.listSubscribe({apikey: mcapiKey, id: soundKeepListId, email_address: req.body.email}, function(success) {
    if (success) {
      res.send('Success', 200);
    } else {
      res.send('Error', 405);
    }
  });
});

var child = exec('cowsay Running on port: '+port, function(err, stdout, stderr) {
  if (!err) {
	console.log(stdout);
  } else {
  	console.log('Running on port: '+port);
  }
});

app.listen(port);

