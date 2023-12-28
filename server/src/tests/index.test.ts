import * as chai from 'chai';
import supertest from 'supertest';
import { app } from '..';

const expect = chai.expect;

describe('Endpoints', () => {
  it('GET /ping should return "Pong"', (done) => {
    supertest(app)
      .get('/ping')
      .end((err, response) => {
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('Pong');
        done();
      });
  });

  it('POST /login should return a token with valid credentials', (done) => {
    const userData = {
      "username": "test@konsi.com.br",
      "password": "Test@Konsi20238*"
    };

    supertest(app)
      .post('/login')
      .send(userData)
      .end((err, response) => {
        console.log("🚀 ~ file: index.test.ts:28 ~ .end ~ response:", response)
        expect(response.status).to.equal(200);
        expect(response.body.token).to.exist;
        done();
      });
  });

  it('POST /login should not return a token with invalid credentials', (done) => {
    const userData = {
      "username": "test@konsi.com.br",
      "password": "Test@Konsi20238*"
    };

    supertest(app)
      .post('/login')
      .send(userData)
      .end((err, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.token).to.not.exist;
        done();
      });
  });
});
