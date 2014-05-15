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


    var commandConnection = request.accept('camerareg_ws', request.origin);

    var index = clients.push(commandConnection) - 1;
    console.log("ipaddress:" + commandConnection.remoteAddress);
  
    var query = request.resourceURL.query;
    console.log ("sno=" + query);

    var data = { CUID:"1234", PrivateKey:"5678" };
    console.log((new Date()) + ' Connection accepted.');

    data = JSON.stringify(data);
    commandConnection.send(data);

    commandConnection.on('error', function(error){
        console.log(commandConnection.requestedProtocol + error);
      });

    commandConnection.on('message', function(message) {

        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            for(var i=0; i<clients.length; ++i){
              if(i != index) {
                clients[i].sendUTF(message.utf8Data);
              }
            }
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

