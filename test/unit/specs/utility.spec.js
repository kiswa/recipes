import * as utility from '../../../src/utility'

describe('utility', () => {
  describe('convertTime', () => {
    it('should convert 1 to "1 min"', () => {
      expect(utility.convertTime(1)).to.equal('1 min')
    })

    it('should convert 2 to "2 mins"', () => {
      expect(utility.convertTime(2)).to.equal('2 mins')
    })

    it('should convert 60 to "1 hour"', () => {
      expect(utility.convertTime(60)).to.equal('1 hour')
    })

    it('should convert 120 to "2 hours"', () => {
      expect(utility.convertTime(120)).to.equal('2 hours')
    })

    it('should convert 61 to "1 hour, 1 min"', () => {
      expect(utility.convertTime(61)).to.equal('1 hour, 1 min')
    })

    it('should convert 122 to "2 hours, 2 mins"', () => {
      expect(utility.convertTime(122)).to.equal('2 hours, 2 mins')
    })
  })
})
