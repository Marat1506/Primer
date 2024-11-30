const request = require('supertest');
const { app } = require('../main');

describe('/movies', () => { // тестируем роут movies

    it('POST', async () => { // проверяем метод POST для этого роута
        // это условный код, в котором пока нет реального запроса 
        const movie = {
            'title': 'The Shawshank Redemption',
            'rating': 9.2,
            'comments': 1994,
            'directorId': '666b5af35c6fe854b51df9b4'
        }

        const { body } = await request(app)
            .post('/movies')
            .send(movie)
            .expect(201);
        expect(body.title).toEqual(movie.title);

    })

});