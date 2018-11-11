const expect = require('expect')
const {Users} = require('./users')

describe('Users',()=>{

var users;
beforeEach(()=>{
    users=new Users()
    users.users=[{
        id:'1',
        name:'asdf',
        room:'A'
    },{
        id:'2',
        name:'asdfg',
        room:'B'
    },{
        id:'3',
        name:'asdfgh',
        room:'A'
    }]
})

    it('should add new user',()=>{
        var users = new Users()
        var user={
            id:'123',
            name:"as",
            room:'this'
        }
        const res = users.addUser(user.id,user.name,user.room)
        expect(users.users).toEqual([user])
    })

    it('should remove a user',()=>{
     var userId = '1'
     var user = users.removeUser(userId)
     expect(user.id).toBe(userId)
     expect(users.users.length).toBe(2)
    })

    it('should should not remove a user',()=>{
        var userId = '123'
        var user = users.removeUser(userId)
        expect(user).toNotExist()
        expect(users.users.length).toBe(3)
    })

    it('should find a user',()=>{
        var userId= '2'
        var  user = users.getUser(userId)

        expect(user.id).toBe(userId)
    })

    it('should not find a user',()=>{
        var userId= '99'
        var  user = users.getUser(userId)

        expect(user).toNotExist()
    })


    it('should return names for A',()=>{
        var userList = users.getUserList('A')
        expect(userList).toEqual(['asdf','asdfgh'])
    })

    it('should return names for B',()=>{
        var userList = users.getUserList('B')
        expect(userList).toEqual(['asdfg'])
    })
})