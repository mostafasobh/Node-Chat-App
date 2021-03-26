class Users{
    constructor() {
    this.user=[]
}
    addUser(id,name,room) {
    let user ={id,name,room}
    this.user.push(user)
        return user;
    }
    
    removeUser(id) {
     let user = this.getUser(id)
        if (user) {
            this.user = this.user.filter((user) => user.id !== id)
            return user
        }
    }
    getUser(id) {
    return this.user.find((user)=> user.id === id)        
    }
    getUserList(room) {
        let users = this.user.filter((user) => user.room === room)
        let namesArray = users.map((user)=> user.name)
        return namesArray
    }
}

module.exports={Users}