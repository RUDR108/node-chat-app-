const expect = require('expect')
const {isRealString} = require('./validation')

describe('isRealString',()=>{
    it('should reject non-string values',()=>{
        const res=isRealString(123)
        expect(res).toBe(false)
    })
    it('should reject strings only with spaces',()=>{
        const res=isRealString('   ')
        expect(res).toBe(false)
    })
    it('should allow string with non-space characters',()=>{
        const res=isRealString('ak sf')
        expect(res).toBe(true)
    })
})