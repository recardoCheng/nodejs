var Q = require('q');

var defer = Q.defer();

function run(o){
  var sum = 0;
  for(var i = 0; i<o; i++){
    sum += i;
  }
  defer.resolve(sum);
return defer.promise;
}

run(5).then(function(value){
  console.log(value);
  defer.resolve(value);
  return defer.promise;
}).then(function(value){
  console.log(value+1);
});


