import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

//Routes



const PORT = process.env.PORT;
server.listen(PORT, ()=> console.log('listening on port '+PORT));