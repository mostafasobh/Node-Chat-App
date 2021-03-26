const expect = require('chai').expect
const {isRealString} = require('./validation')

describe('isRealString', () => {
    
    it('should reject non-string values', () => {
        let test = isRealString(123)
        expect(test).to.equal(false)
    })
    it('should reject string with only spaces', () => {
        let test = isRealString('               ')
        expect(test).to.equal(false)
    })
    it('should allow string with non-spaces characters', () => {
        let test = isRealString(' sdf sdf ')
        expect(test).to.equal(true)
    })
})