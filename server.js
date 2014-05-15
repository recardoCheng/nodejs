var websocketClient = require('websocket').client;
var client = new websocketClient();
var exec = require('child_process').exec;
var url = 'http://127.0.0.1:444/v2/device/system/timestamp';

var conn = 'ws://127.0.0.1:9000';


var cmd = exec('curl '+url, function(err, stdout, stderr){
    if(err){
      console.log(err);
    }else{
        var res = JSON.parse(stdout);
        var username = 'admin';
        var password = 'admin';
        var timestamp = (res.data.timeStamp).toString();
        var token = require('sha1')(username + password + timestamp);

        var token1 = require('hex64').encode(token);

        console.log(username + password + (res.data.timeStamp).toString());

        console.log('token:' + token);
        console.log('token1:' + token1);

        var ca = '?ts=' + res.data.timeStamp + '&access_token=' + token1;
        conn = conn + ca;
        console.log('Trying to build up ws connection: ' +conn);
        client.connect(conn, 'service');
      }

    });


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
     console.log(JSON.stringify(message));
  });


});

//client
