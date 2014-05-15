var http = require('http');
var fs = require('fs');
var port = 1338;
var WebSocketServer = require('websocket').server;
var WebSocketRouter = require('websocket').router;
var mjpgdata;
var mjpgOk=false;


//var server = https.createServer(options, function(request, response) {
var server = http.createServer(function(request, response) {

function WriteHttpHeader(response)
{
  response.writeHead(200, {
    'Server': 'iCamera',
    'X-Powered-By': 'iCamera Application',
    'Connection': 'close',
    'Cache-Control': 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
    'Pragma': 'no-cache',
    'Expires': 'Mon, 3 Jan 2000 00:00:00 GMT',
    'Access-Control-Allow-Origin': '*',
    'Content-Type' :'multipart/x-mixed-replace;boundary=cameramjpgboundary',
  });
  response.write ('\r\n--cameramjpgboundary\r\n');

}

function WriteMjpgFrame()
{
  if (mjpgOk==true) {
    response.write ('Content-Type: image/jpeg\r\n');
    response.write ('Content-Length: ' + mjpgdata.length + '\r\n');
    response.write ('\r\n');
    response.write (mjpgdata);
    response.write ('\r\n--cameramjpgboundary\r\n');
    setTimeout(WriteMjpgFrame, 33);
  }
}


  console.log(' Received request for ' + request.url);
  WriteHttpHeader(response);
  setTimeout(WriteMjpgFrame, 100);
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
  if (request.resourceURL.query.DeviceSN) {
    var commandConnection=request.accept(null, request.origin);

    var data = { CUID:"cuid-1234", PrivateKey:"key-5678" };
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
   "sessionId" : "mFbWYHZwig1YesYfCQa1SL5G",
   "cuid" : "0bff0b26-ec6c-11e1-9d3a-42768c5a2091",
   "cmdId" : cmdidStr,
   "uri" : "/v1/record",
   "parameters" : {
     "action" : "get_fileslist",
     "type" : "manual",
     "index" : 1,
     "size" : 4,
    }
   };


   strData = JSON.stringify(msg);
   cmdid+=1;
   if (cmdconn) {
     cmdconn.send(strData);
   }
   setTimeout(timerSend, 8000);
  }

  // camera authentication
  if (request.resourceURL.query.CUID && request.resourceURL.query.HV) {

    var data = { category:"stoken", token:"abcd1234", HV:'12345678' };
    var query = request.resourceURL.query;
    cmdconn=request.accept(null, request.origin);

    data = JSON.stringify(data);
    cmdconn.send(data);
    console.log ("send stoken for service_ws");

    cmdid=0;
    timerSend();

    cmdconn.on('message', function (msg) {
      console.log ("cli reponse message "+msg.utf8Data);
    });
  }
});


router.mount('*', 'pushmjpg', function(request) {

  var data = { category:"stoken", token:"abcdo00xx", HV:"12345678" };

  var query = request.resourceURL.query;
  var commandConnection=request.accept(null, request.origin);

  commandConnection.on('message', function (msg) {
    mjpgdata = msg.binaryData;
    mjpgOk=true;
    console.log("mjpgOK")
  });

});

router.mount('*', 'pushpcm', function(request) {

  var data = { category:"stoken", token:"abcdo00xx", HV:"12345678" };

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

});
