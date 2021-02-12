import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";


it("returns a 404 if the provided ID does not exists", async() => 
{
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put (`/api/tickets/${id}`)
        .set("Cookie", global.signin())
        .send({
            title: "Some Title",
            price: 20,
        })
        .expect(404);

});


it("returns a 401 if the user is not authenticated", async() => 
{
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put (`/api/tickets/${id}`)
        .send({
            title: "Some Title",
            price: 20,
        })
        .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "abc title",
        price: 20,
      });
  
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.signin())
      .send({
        title: " title",
        price: 30,
      })
      .expect(401);
  });

it("returns a 400 if the user provideds an invalid title or price", async() => 
{
    const cookie =global.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "abc title",
        price: 20,
      });
  
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 30,
      })
      .expect(400);

    
      await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "This is new",
        price: -10,
      })
      .expect(400);
  
});


it("update the ticket if valid input is provided", async() => 
{
    const cookie =global.signin();

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            title: "This is New Title",
            price: 100,
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "This is Updated Title v2",
            price: 120,
        });


    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual("This is Updated Title v2");
    expect(ticketResponse.body.price).toEqual(120);
    
});

