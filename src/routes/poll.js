import { pollSchema } from "../schema.js";
import { Router } from "express";
import db from "../mongo.js";

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

router.post("/poll", async function newPoll(req, res) {
	const nwPoll = {
		title: req.body.title,
		expireAt: [req.body.expireAt || Date.now() + 30],
	};
	const pollValidation = pollSchema.validate(nwPoll, { abortEarly: false });

	try {
		if (pollValidation.error) {
			return res.status(422).send(
				pollValidation.error.details.map((err) => {
					err.message;
				})
			);
		}

		db.collection('polls').insertOne
	} catch (error) {
		console.error(error);
	}
});

/* 
GET /poll
  - []  Retorna a lista de todas as enquetes:

  [
	{
		_id: "54759eb3c090d83494e2d222",
    title: "Qual a sua linguagem favorita?",
		expireAt: "2022-02-28 01:00" 
	},
	...
] */
