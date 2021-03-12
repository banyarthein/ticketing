import {Message} from "node-nats-streaming";
import {Subjects, Listener, TicketUpdatedEvent} from "@ticketingbnt/common";
import {Ticket} from "../../models/ticket";
import {queueGroupName as qGroupName} from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = qGroupName;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        //const ticket = await Ticket.findById(data.id);
        const ticket = await Ticket.findPreviousVersion(data);
        

        if(!ticket)
        {
            throw new Error("Ticket not found");            
        }

        const {title, price} = data;
        ticket.set ({title, price});
        await ticket.save();
        
        msg.ack();

    }
}