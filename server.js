var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8888));

app.use(express.static(__dirname + '/build'));

app.listen(app.get('port'), function() {
  console.log('Express server is now running at localhost:' + app.get('port'));
});
