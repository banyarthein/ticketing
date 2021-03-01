import request from "supertest";
import {app} from "../../app";
import { Order, OrderStatus } from "../../models/orders";
import {Ticket} from "../../models/ticket";

it("marks and order as cancelled", async () => {
    // Create a ticket with Ticket Model
    const ticket = Ticket.build({
        title: "concert",
        price: 20
    });
    await ticket.save();

    const user = global.signin();

    // make a request to build an order with the ticket
    const {body: order} = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ticketId: ticket.id})
    .expect(201);

    // make a request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.order.id}`)
        .set("Cookie", user)
        .send()
        .expect(204);

    // expectation to make sure the thing is cancelled
    const updatedOrder = await Order.findById(order.order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits a order cancelled event");