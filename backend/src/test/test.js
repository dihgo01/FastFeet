const assert = require('assert')
const app = require('../app')


describe('Test backend to blog!', async function (){
    this.timeout(Infinity);
    it('Test connection with database!', async function () {
        const result = await app.connection()
        assert.equal(result, true)
    })
})