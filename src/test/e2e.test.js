const chai = require('chai')
const chaiHttp = require('chai-http')

const { describe, it } = require('mocha');
const app = require('../../app').app

chai.use(chaiHttp)

describe('Suite de testing E2E de AUTH', () => {
    // ? Test a ruta protegida
    it('Should return 200 and token for successfull login', (done) => {
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
                chai.request(app)
                    .get('/api/v1/post')
                    .set('Auhorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.status, 200)
                        done()
                    })
            })
    })
    //TODO: Test E2E to create a new post
    it('Should return 200 after to create a new Post', (done) => {
        chai.request(app)
            .post('/api/v1/auth/post')
            .set('content-type', 'application/json')
            .send({
                email: 'elvisrodriguezc@gmail.com',
                password: 'root'
            })
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.typeOf(res.body.token, 'string')
                chai.request(app)
                    .post('/api/v1/post')
                    .set('Auhorization', `JWT ${res.body.token}`)
                    .send({
                        title: 'Test',
                        content: 'Test'
                        user_id: 1
                    })
                    .end((err, res) => {
                        chai.assert.equal(res.status, 200)
                        done()
                    })
            })
    })

    //TODO: Test E2E to delete the post
    it('Should return 200 when delete a Post', (done) => {
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
                chai.request(app)
                    .delete('/api/v1/post/1')
                    .set('Auhorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.status, 200)
                        done()
                    })
            })
    })
})