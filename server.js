var express = require('express');
var _ = require('underscore');
var exec = require('child_process').exec
var port = 2013;

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

var child = exec('cowsay Running on port: '+port, function(err, stdout, stderr) {
  if (!err) {
	console.log(stdout);
  } else {
  	console.log('Running on port: '+port);
  }
});

app.listen(port);
