import request from 'supertest';
import { app } from '../../app';


it('return a 400 on missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
        })
        .expect(400);
});


it('return a 400 on invalid email address', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhitbz.com",
            password: "hahaha1255"
        })
        .expect(400);
});

it('return a 400 on weak password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hah"
        })
        .expect(400);
});


it('return a 201 on successful signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(201);
});


it('disallows duplicated emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(400);
});


it('set a cookie after the successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});

