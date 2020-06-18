import * as request from 'supertest';

const app = 'http://localhost:3333';

describe('players', () => {
    it('should return arrays of players', () => {
        return request(app)
            .get('/players')
            .expect(200)
    })
})
