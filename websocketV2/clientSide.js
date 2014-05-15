var websocketClient = require('websocket').client;
var client = new websocketClient();

client.on('connectFailed', function(error){
  console.log("Connection error:"+error.toString());
});

client.on('connect', function(connection){
  console.log('Connected success');

  connection.on('error', function(error){
      console.log('Connection error:'+error.toString());
  });

  connection.on('close', function(){
    console.log('close');
  });

  connection.on('message', function(message){
    if(message.type='utf8'){
      console.log("Received message:"+message.utf8Data);
    }
  });

  function sendNum(){
    if(connection.connected){
     var num = Math.round(Math.random()*12345);
     connection.send(num.toString());
     setTimeout(sendNum, 1000);
    }
  }
  sendNum();
});

client.connect('ws://localhost:8000','echo');
