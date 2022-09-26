import { pollSchema } from "../schema.js";
import { Router } from "express";
import db from "../mongo.js";
import Day from "dayjs";

const router = Router();

/* POST /poll 
Deve receber pelo body da request, um parâmetro title, contendo o nome da enquete a ser cadastrada e expireAt, contendo a data e hora de expiração da enquete:
{
	title: "Qual a sua linguagem favorita?",
	expireAt: "2022-02-28 01:00" 
} 
- [ ]  **Title** não pode ser uma string vazia, retornar status 422.
- [ ]  Se **expireAt** for vazio deve ser considerado 30 dias de enquete por padrão.
- [ ]  Deve retornar a enquete criada em caso de sucesso com status 201.*/

router.post("/poll", async function postNewPoll(req, res) {
	const newPoll = {
		title: req.body.title,
		expireAt: req.body.expireAt
			? Day(req.body.expireAt).format("DD.MM.YYYY")
			: Day(Date.now() + 30).format(`DD.MM.YYYY`),
	};
	console.log(newPoll);
	const pollValidation = pollSchema.validate(newPoll, { abortEarly: false });

	try {
		if (pollValidation.error) {
			return res.status(422).send(
				pollValidation.error.details.map((err) => {
					err.message;
				})
			);
		}

		await db.collection("polls").insertOne(newPoll);

		res.sendStatus(201);
	} catch (error) {
		console.error(error);
	}
});

/* GET /poll
- []  Retorna a lista de todas as enquetes:

[
	{
		_id: "54759eb3c090d83494e2d222",
    title: "Qual a sua linguagem favorita?",
		expireAt: "2022-02-28 01:00" 
	},
	...
] */

router.get("/poll", async function getPollList(req, res) {
	try {
		const pollList = await db.collection("polls").find().toArray();

		res.send(pollList);
	} catch (error) {
		console.error(error);
	}
});

export default router;
