import {Publisher, OrderCancelledEvent, Subjects} from "@ticketingbnt/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}