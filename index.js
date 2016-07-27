var https = require('https');
var fs = require('fs');
var request = require('request');

var options = {
   key  : fs.readFileSync('key.key'),
   cert : fs.readFileSync('cert.cert')
};

var VersionHeaders = {
  url: 'https://104.27.146.126/api/version',
  headers: {
    'Host': 'mygobot.org'
  }
};

var AuthAwnser = fs.readFileSync('bought.json')

https.createServer(options, function (req, res) {
   console.log("Request", req.url)
   
   if(req.url == "/api/auth"){
       console.log("API Awnser")
       res.end(AuthAwnser)     
   }else if(req.url == "/api/version"){
    request(VersionHeaders, function (err, raw, body){
        console.log("Sended Version.json")
        res.end(body)
    })
   }else{
       console.log("Not Found")
       res.end()
   }
   
}).listen(443);