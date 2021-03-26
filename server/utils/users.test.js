const expect = require('chai').expect
const {Users} = require('./users')



describe('Users', () => {
    let users

    beforeEach(() => {
        users=new Users()
        users.user = [{
            id: '123',
            name: 'sobh',
            room:'the guys'
        },{
            id: '5555',
            name: 'samir',
            room:'React course'
        }]
    })
    
    it('should find user', () => {
        let user = users.getUser('123')  
        expect(user).to.equal(users.user[0])
    })

    it('should not find a user', () => {
        let user = users.getUser('122')  
        expect(user).to.not.exist
    })
////////////////////////////////////////////////////////
    it('should remove a user', () => {
        let removed = users.removeUser('5555')
        expect(removed.name).to.equal('samir')
        expect(users.user).to.have.lengthOf(1)
    })
    
    it('should not remove a user', () => {
        let removed = users.removeUser('555')
        expect(removed).to.not.exist
        expect(users.user).to.have.lengthOf(2)
        })
///////////////////////////////////////////////////////
it('should add newUser', () => {
    expect(users.user).to.have.lengthOf(2)
})
///////////////////////////////////////////////////////
it('should return list of names ', () => {
    let userList = users.getUserList('the guys')
    expect(userList).to.have.lengthOf(1)
})
})