import express from "express";
import cors from "cors";

import PollRouter from "./routes/poll.js";

const server = express();
server.use(express.json());
server.use(cors());


server.use(PollRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log("listening on port " + PORT));
