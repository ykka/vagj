var express = require("express");
var app = express();
app.use(express.logger());

app.use(express.static(__dirname ));


app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  res.render('index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
