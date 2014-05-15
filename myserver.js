var WebSocketServer = require('websocket').server;
var http = require('http');
var port = 1337;
var clients = [];

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
    //request.reject(123, "shit");

    //var commandConnection = request.accept('service_ws', request.origin);
    var commandConnection = request.accept('camerareg_ws', request.origin);
    //var commandConnection = request.accept('', request.origin);
    //var connection = request.accept(null);
    //var connection = request.accept();
    var index = clients.push(commandConnection) - 1;
    console.log("ipaddress" + commandConnection.remoteAddress);

    var data = { CUID:"1234", PrivateKey:"5678" };
    //var data = { sessionId:"1234", CUID:"5678", uri:"/device/v1/firmwareversion", parameters: {test:1234}};
    console.log((new Date()) + ' Connection accepted.');
    data = JSON.stringify(data);
    commandConnection.send(data);

    commandConnection.on('error', function(error){
        console.log(commandConnection.requestedProtocol + error);
      });

    commandConnection.on('message', function(message) {

        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);

//            for(var i=0; i<clients.length; ++i){
//              if(i != index) {
//                clients[i].sendUTF(message.utf8Data);
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
        clients.splice(index, 1);
    });

});

wsServer.on('error', function(error){
      console.log(error);
    });

