
exports.convert = function convert(array) {
  var t1 = array[0]
  var t2 = array[1]
  var t3 = array[2]
  var t4 = array[3]
  return {
    offset: ((t2 - t1) + (t3 - t4)) / 2,
    delay:  (t4 - t1) - (t3 - t2)
  }
}

exports.offset = function offset(clocks) {
  clocks = clocks.slice()
  clocks.sort(function(a, b) {
    return a.offset - b.offset
  })
  clocks = clocks.slice(1, clocks.length - 1)
  clocks.sort(function(a, b) {
    return a.delay - b.delay
  })
  var sum = 0, count = 0
  var hp = Math.ceil(clocks.length / 8)
  for (var i = 0; i < clocks.length; i++) {
    if (clocks[i].delay > clocks[0].delay) hp--
    if (hp === 0) break
    sum += clocks[i].offset
    count += 1
  }
  return sum / count
}
