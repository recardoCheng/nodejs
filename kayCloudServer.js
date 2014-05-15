//var fs = require('fs');
//
//webServer = https.createServer(option, function(request, response) {
//
//logger.verbose('CA: HTTPS server listening on port ' + caPort);
//
//response.writeHead(404);
//
//response.end();
//
// });
//
// option = {
//
// key: fs.readFileSync(__dirname + '/cert/privatekey.pem');
//
// cert: fs.readFileSync(__dirname + '/cert/certificate.pem');
//
// }

var http = require('https');
var crypto = require('crypto')
var fs = require('fs');
var port = 1337;
var WebSocketServer = require('websocket').server;
var WebSocketRouter = require('websocket').router;
var mjpgdata;
var mjpgOk=false;

var shasum = crypto.createHash('sha1')

options= {
  key: fs.readFileSync('./cert/privatekey.pem'),
  cert: fs.readFileSync('./cert/certificate.pem')
}

//var server = https.createServer(options, function(request, response) {
var server = http.createServer(options, function(request, response) {
  console.log(' Received request for ' + request.url);
});


server.listen(port, function() {
  console.log(' Server is listening on port ' + port);
});

// create the server.
wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

router = new WebSocketRouter();
router.attachServer(wsServer);

wsServer.on('error', function(error) {
  clr.log('red', 'weServer error: ' + error);
});

function originIsAllowed(origin) {
  // always all domains
  return true;
}



//
// camera register websocket
//
router.mount('*', 'camReg', function(request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    return;
  }

  console.log (JSON.stringify(request.httpRequest.headers));
  console.log (request.resourceURL.query);
  if (request.resourceURL.query.ac && request.resourceURL.query.hv) {
    var commandConnection=request.accept(null, request.origin);

    var data = { cuid:"cuid-1234", privateKey:"key-5678" };

    var query = request.resourceURL.query;
    console.log (query);
    data = JSON.stringify(data);
    commandConnection.send(data);
  }
});


var cmdconn;
var cmdid;
//
// camera service websocket
//
router.mount('*', 'service', function(request) {

  function timerSend() {
   var strData;
   var strData2="";
   var cmdidStr=cmdid+"";
   var msg = {
     "isRO" : false,
     "utId" : 1,
     "payload":{
       "tId" : 12345678,
       "uri" : "/v2/video/common/brightness",
       "param" : {
         "value":2,
       }
     }
   };

//   var msg = {
//     "isRO" : false,
//     "utId" : 1,
//     "payload":{
//       "tId" : 12345678,
//       "uri" : "/v2/device/system/fw_download",
//       "param" : {
//         "filename":"FWv0.9b9_uImage",
//         "serverAddr":"http://192.168.7.118",
//         "sha1sum":"886caccba9d87cbb1da102fd0cf14a55054f4207",
//       }
//     }
//   };
//   var msg = {
//     "isRO" : true,
//     "utId" : 1,
//     "payload":{
//       "tId" : 12345678,
//       "uri" : "/v2/audio/speaker/file",
//       "param" : {
//         "enabled": true,
//       }
//     }
//   };





   strData = JSON.stringify(msg);
   cmdid+=1;
   if (cmdconn) {
     cmdconn.send(strData);
   }
   setTimeout(timerSend, 6000000);
  }

  // camera authentication
  if (request.resourceURL.query.cuid && request.resourceURL.query.hv) {

    var data = { category:"stoken", token:"abcd1234", HV:'12345678' };
    var query = request.resourceURL.query;
    cmdconn=request.accept(null, request.origin);

    data = JSON.stringify(data);
    cmdconn.send(data);

    cmdid=0;
    timerSend();

    cmdconn.on('message', function (msg) {
      if (msg.type == "utf8") {
        //console.log ("text: " + msg.utf8Data);
        //console.log ("");
      }
      else if (msg.type == "binary") {
        console.log ("");
        console.log ("binary: " + msg.binaryData);
        console.log (msg.binaryData);
      }
    });
  }
});

router.mount('*', 'pushmjpg', function(request) {

  // camera authentication
  if (request.resourceURL.query.CUID) {
    var query = request.resourceURL.query;
    var commandConnection=request.accept(null, request.origin);

    commandConnection.on('message', function (msg) {
      if (typeof msg.data == 'string') {
      }
      else {
        console.log ("video data");
      }

    });
  }
});

router.mount('*', 'pushwave', function(request) {

  // camera authentication
  if (request.resourceURL.query.CUID) {
    var query = request.resourceURL.query;
    var commandConnection=request.accept(null, request.origin);

    commandConnection.on('message', function (msg) {
      if (typeof msg.data == 'string') {
        console.log ("rms:"+msg.data);
      }
      else {
        console.log ("audio data");
      }
    });
  }
});
