import request from 'supertest';
import {app} from "../../app";



it("has a router handler listening to /api/tickets for post requests", async() => {

    const response = await  request(app).post("/api/tickets").send({});
    expect (response.status).not.toEqual(404);

});

it("can only be accessed if the user is signed in", async() => {
    request(app).post("/api/tickets").send({}).expect (401);
});

it("return a status other than 401 if the user is signed in", async() => {

    const response = await  request(app)
                        .post("/api/tickets")
                        .set('Cookie', global.signin())
                        .send({});
    expect (response.status).not.toEqual(404);

});


it("returns an error if an invalid title is provided", async() => {
    await request (app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

        await request (app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);
                
});

it("returns an error if an invalid price is provided", async() => {
    await request (app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'this is valid title',
        price: -10
    })
    .expect(400);

    await request (app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'valid title'
    })
    .expect(400);
});

it("returns an error if an invalid aaa is provided", async() => {});

it("returns an error if an invalid bbb is provided", async() => {});

it("returns an error if an invalid ccc is provided", async() => {});

it("creates a ticket with valid inputs", async() => {});