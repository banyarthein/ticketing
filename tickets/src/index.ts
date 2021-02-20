import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
  }

  try {
    //await mongoose.connect("mongodb://localhost:27017/auth", {
    await natsWrapper.connect('ticketing', 'abc123', 'http://nats-service:4222');

    natsWrapper.client.on("close", () => {
        console.log("NATS connection is closing down. ... ...");
        process.exit();
    })

    process.on('STGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    

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
