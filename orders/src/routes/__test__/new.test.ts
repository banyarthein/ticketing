import mongoose from "mongoose";
import request from "supertest";
import {app} from "../../app";
import { Order, OrderStatus } from "../../models/orders";
import { Ticket } from "../../models/ticket";
import {OrderCreatedEvent} from "@ticketingbnt/common";
import { OrderCreatedPublisher } from "../../events/publishers/order-created-publisher";
import { natsWrapper } from "../../nats-wrapper";


it ("returns an error if the ticket does not exists", async() => {
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ticketId})
        .expect(404);
});

it ("returns an error if the ticket is already reserved or sold", async() => {
    const ticket = Ticket.build({
        title: "concert",
        price: 20
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: "asdfsadfsdd",
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    await order.save();

    // Publish and event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price,
        },
    });

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ticketId: ticket.id})
        .expect(400);
});

it ("reserves a ticket", async() => {
    const ticket = Ticket.build({
        title: "concert",
        price: 20
    });
    await ticket.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ticketId: ticket.id})
        .expect(201);

});

// it("Emits and order created event", async() => {
//     const ticket = Ticket.build({
//         title: "Concert",
//         price: 20,
//     });

//     await ticket.save();

//     await request(app)
//         .post("/api/orders")
//         .set("Cookie", global.signin())
//         .send({ticketId: ticket.id})
//         .expect(201);

//         expect(natsWrapper.client.publish).toHaveBeenCalled();

// });
