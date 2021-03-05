import mongoose from "mongoose";
import { app } from "./app";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { natsWrapper } from "./nats-wrapper";
}

const start = async () => {
if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined!");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined!");
}

if (!process.env.NATS_CLUSTER_ID) {
  throw new Error("NATS_CLUSTER_ID must be defined!");
}

if (!process.env.NATS_CLIENT_ID) {
  throw new Error("NATS_CLIENT_ID must be defined!");
}
if (!process.env.NATS_URL) {
  throw new Error("NATS_URL must be defined!");
}


try {
    //await mongoose.connect("mongodb://localhost:27017/auth", {
    await natsWrapper.connect( process.env.NATS_CLUSTER_ID, 
                               process.env.NATS_CLIENT_ID, 
                               process.env.NATS_URL);

    natsWrapper.client.on("close", () => {
        console.log("NATS connection is closing down. ... ...");
        process.exit();
    });

    process.on('STGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Connected to mongoDB!!");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("(Tickets Service) Listening on port 3000!");
  });
};

start();
