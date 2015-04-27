
var sync = require('./client')

global.WebSocket = require('ws')

sync(process.argv[2] || 'ws://localhost:1357', function(error, result) {
  console.log(result)
}, function(result) {
  console.log(result + '...')
})
