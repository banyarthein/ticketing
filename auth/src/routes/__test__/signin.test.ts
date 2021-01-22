import request from 'supertest';
import { app } from '../../app';

it('fails missing email and password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
        })
        .expect(400);
});


it('fails when email or password does not exsits', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "tharkhitbz.com",
            password: "hahaha123"
        })
        .expect(400);
});



it('fails when an incorrect email or password was supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "tharkhit1@bz.com",
            password: "hahaha"
        })
        .expect(400);
});



it('created cooke when valid email or password was supplied', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "tharkhit@bz.com",
            password: "hahaha123"
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
