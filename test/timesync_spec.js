
var timesync = require('../timesync')
var expect = require('chai').expect

describe('timesync', function() {

  it('::convert should convert times to offset and delays', function() {

    // clock :: { offset, delay }
    // timesync.convert([t1, t2, t3, t4]) -> clock
    // http://www.eecis.udel.edu/~mills/ntp/html/warp.html

    expect(timesync.convert([ 0, 10, 20, 10 ]))
      .to.deep.equal({ offset: 10, delay: 0 })

    expect(timesync.convert([ 1000, 2020, 2020, 1040 ]))
      .to.deep.equal({ offset: 1000, delay: 40 })

  })

  it('::offset should find the best offset, removing outliers', function() {

    expect(timesync.offset([
      { offset: -1, delay: 5 },
      { offset: 0, delay: 5 },
      { offset: 1, delay: 5 },
      { offset: 1000, delay: 2000 }
    ])).to.equal(0.5)

    expect(timesync.offset([
      { offset: 555, delay: 5 },
      { offset: 100,  delay: 3000 },
      { offset: 2000, delay: 4500 },
      { offset: 3000, delay: 6000 }
    ])).to.equal(555)

    expect(timesync.offset([
      { offset: 100, delay: 5 },
      { offset: 200, delay: 6 },
      { offset: 300, delay: 7 },
      { offset: 400, delay: 4 }
    ])).to.equal(200)
    
  })
  
})
