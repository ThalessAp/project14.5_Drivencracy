import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db;

const client = new MongoClient(process.env.MONGO_URI);

client.connect().then(() => {
	db = client.db(process.env.MONGO_DB_NAME);
});

export default db;