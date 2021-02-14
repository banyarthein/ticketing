import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../app';
import { signupRouter } from '../signup';


it('responds with details about the current user', async () => {
    // const signUpResponse = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email: "tharkhit@bz.com",
    //         password: "hahaha123"
    //     })
    //     .expect(201);

    //const cookie = signUpResponse.get("Set-Cookie");

    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set("Cookie", cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual("tharkhit@bz.com");

    console.log(response.body);
});

it("respond with null if not authenticated", async () => {

    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(response.body.currentuser).toEqual(undefined);
});
