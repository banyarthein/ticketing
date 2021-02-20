import {Publisher, Subjects, TicketCreatedEvent} from "@ticketingbnt/common";

export class TicketCreatedPublisher extends Publisher <TicketCreatedEvent> 
{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}