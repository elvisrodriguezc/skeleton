
const chai = require('chai')
const chaiHttp = require('chai-http')

const { describe, it } = require('mocha');
const app = require('../../app').app

chai.use(chaiHttp)

describe('Suite de testing de integracion para AUTH', () => {
    // ? Test a ruta protegida
    it('Should return 401 when no jwt available', (done) => {
        chai.request(app)
            .get('/api/v1/post')
            .end((err, res) => {
                chai.assert.equal(res.status, 401)
                done()
            })
    })
    // ? Test a Login sin datos 
    it('Should return 400 when no data id provided', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .end((err, res) => {
                chai.assert.equal(res.status, 400)
                done()
            })
    })
    //? Test a informcion correcta
    it('Should return 200 when correct data provided', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .set('content-type', 'application/json')
            .send({
                email: 'elvisrodriguezc@gmail.com',
                password: 'root'
            })
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.typeOf(res.body.token, 'string')
                done()
            })
    })

})