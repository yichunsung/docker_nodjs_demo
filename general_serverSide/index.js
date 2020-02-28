const express = require('express');

let app = express();

app.get('/', function(req, res){
	res.send('<h1>Hello Docker</h1>');
});

// 啟動伺服器在 http://localhost:1234/

let port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Start on "+port);
});