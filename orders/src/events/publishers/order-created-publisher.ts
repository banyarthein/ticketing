import {Publisher, OrderCreatedEvent, Subjects} from "@ticketingbnt/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}