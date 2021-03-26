const expect =require('chai').expect
const {generateMessage,generateLocationMessage} = require('./message')
describe('generate message', () => {
    it('should generate the correct message object', () => {
        expect(generateMessage('admin','hello users').from).to.equal('admin')
        expect(generateMessage('admin','hello users').text ).to.equal('hello users')
        expect(generateMessage('admin','hello users').createdAt ).to.be.an('number')
    })
})

describe('generate location message', () => {
    it('should generate correct location object', () => {
        let data={from:'Admin',latitude:12,longitude:11}
        let message= generateLocationMessage(data.from,data.latitude,data.longitude)
        expect(message.from).to.equal(data.from)
        expect(message.createdAt).to.be.an('number')
        expect(message.url).to.equal('https://www.google.com/maps?q=12,11')
    })
})