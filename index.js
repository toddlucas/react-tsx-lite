var express = require('express');

var app = express();
app.set('port', 3000);
app.use(express.static('dist'))

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listening on port ' + port);
});
