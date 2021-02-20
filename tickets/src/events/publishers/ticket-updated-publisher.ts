import {Publisher, Subjects, TicketUpdatedEvent} from "@ticketingbnt/common";

export class TicketUpdatedPublisher extends Publisher <TicketUpdatedEvent> 
{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}