import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(201);
});


it('return a 400 on invalid email address', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhitbz.com",
            password: "hahaha123"
        })
        .expect(400);
});

it('return a 400 on weak password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hah"
        })
        .expect(400);
});

