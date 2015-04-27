
var timesync = require('./timesync')
module.exports = sync

function sync(url, callback, callback2) {
  var ws = new WebSocket(url)
  var clocks = []
  ws.onmessage = function(e) {
    if (e.data == 'k') {
      emit()
    }
    if (e.data.indexOf(',') >= 0) {
      process(e.data)
      emit()
    }
  }
  ws.onclose = function() {
    if (clocks.length < 1) return callback(new Error('no offset received'))
    return callback(null, timesync.offset(clocks))
  }
  function emit() {
    ws.send('' + new Date().getTime())
  }
  function process(text) {
    var fields = text.split(',')
    var a = +fields[0]
    var b = +fields[1]
    var c = new Date().getTime()
    if (a <= c) clocks.push(timesync.convert([a, b, b, c]))
    if (clocks.length >= 8) {
      if (callback2) callback2(timesync.offset(clocks))
    }
  }
}


