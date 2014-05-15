var WebSocketServer = require('websocket').server;
//var http = require('https');
var http = require('http');
var port = 1337;
var regclients = [];
var serclients = [];
var index;
var commandConnection;
var fs = require('fs');
var sslKey = fs.readFileSync("/home/recardo/Downloads/node-v0.8.14/nodejs/server.key");
var sslCert = fs.readFileSync("/home/recardo/Downloads/node-v0.8.14/nodejs/server.crt");

var options = {
  key: sslKey,
  cert: sslCert
}

//var server = http.createServer(options, function(request, response) {
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(port, function() {
    console.log((new Date()) + ' Server is listening on port ' + port);
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});


function timerSend() {

  var strData;
  var data = {sessionId:"1234", CUID:"5678", uri:"/device/v1/firmwareversion"};
  strData = JSON.stringify(data);
  commandConnection.send(strData);
  console.log("send data");

  setTimeout(timerSend, 1000); 
}





function originIsAllowed(origin) {
  // always all domains
  return true;
}

wsServer.on('request', function(request) {
    //if (!originIsAllowed(request.origin)) {
    //  request.reject();
    //  console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    //  return;
    //}

    console.log("test %s", request.origin);
    console.log("test %s", request.host);
    console.log("test %j", request.resourceURL);

    var commandConnection = request.accept(null, request.origin);
    //var commandConnection = request.accept('service_ws', request.origin);

    index = regclients.push(commandConnection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    var data = { CUID:"cuid-1234", PrivateKey:"key-5678" };

    //var data = { category:"stoken", token:"abcd1234", HV:'12345678' };

    data = JSON.stringify(data);
    commandConnection.send(data);

    timerSend();

    commandConnection.on('error', function(error){
        console.log(commandConnection.requestedProtocol + error);
      });

    commandConnection.on('message', function(message) {

        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);

//            for(var i=0; i<regclients.length; ++i){
//              if(i != index) {
//                regclients[i].sendUTF(message.utf8Data);
//              }
//            }
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            commandConnection.sendBytes(message.binaryData);
        }
    });


    commandConnection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + commandConnection.remoteAddress + ' disconnected.');
        regclients.splice(index, 1);
    });

});

wsServer.on('error', function(error){
      console.log(error);
    });

