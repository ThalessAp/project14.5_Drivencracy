import Day from "dayjs";
import { Router } from "express";
import { ObjectId } from "mongodb";
import db from "../mongo.js";
import { voteOpSchema } from "../schema.js";

const router = Router();

/* POST / choice;
Deve receber pelo body da request, um parâmetro title, contendo o nome da opção a ser cadastrada e pollId. 
{
    title: "JavaScript",
		pollId: "54759eb3c090d83494e2d222",
}
- Validação:
    - [ ]  Uma opção de voto não pode ser inserida sem uma enquete existente, retornar status 404.
    - [ ]  **Title** não pode ser uma string vazia, retornar status 422.
    - [ ]  **Title** não pode ser repetido, retornar status 409.
  - []  Se a enquete já estiver expirado deve retornar erro com status 403.    
  - [ ]  Deve retornar a opção de voto criada em caso de sucesso com status 201. */
router.post("/choice", async function postNewVoteOption(req, res) {
	const newVoteOp = {
		title: req.body.title,
		pollId: ObjectId(req.body.pollId),
	};
	const validation = voteOpSchema.validate(newVoteOp, { abortEarly: false });

	if (validation.error) {
		return res.status(422).send(
			validation.error.details.map((err) => {
				err.message;
			})
		);
	}

	try {
		const ValidEnq = await db
			.collection("polls")
			.findOne(ObjectId(newVoteOp.pollId));
		if (!ValidEnq) {
			return res.status(404);
		} else if (ValidEnq.expireAt > Day(Date.now).format("DD/MM/YYYY") - 30) {
			return res.status(403);
		}

		const ValidOp = await db.collection("choices").findOne(newVoteOp.title);
		if (ValidOp) {
			return res.status(409);
		}

		await db.collection("choices").insertOne(newVoteOp);
		res.status(201).send(newVoteOp);
	} catch (error) {
		console.error(error);
	}
});

/*  - **POST** `/choice/:id/vote`
    - [ ]  Não recebe nenhum dado do body da requisição. Deve registrar um voto na opção selecionada.
    - [ ]  O voto deve armazenar a data e hora que foi criado no backend.
    - Validações:
        - [ ]  Verificar se é uma opção existente, se não existir retornar 404.
        - [ ]  Não pode ser registrado se a enquete já estiver expirado, retornar erro 403.
    - [ ]  Retorna status 201 em caso de sucesso. */
router.post("/choice/:id/vote", async function selectVoteOption(req, res) {
	const id = req.params.id;

	try {
		const ValidOption = await db
			.collection("choices")
			.findOne({ _id: ObjectId(id) });
		if (!ValidOption) {
			return res.status(404);
		}
		const ValidEnq = await db
			.collection("polls")
			.findOne(ObjectId(ValidOption.pollId));
		if (ValidEnq.expireAt > Date.now - 30) {
			return res.status(403);
		}

		ValidEnq.update({
			result: {
				votes: [$set + 1],
			},
		});

		res.send(201);
	} catch (error) {
		console.error(error);
	}
});

/*  - **GET** `/poll/:id/choice`
    - [ ]  Retorna a lista de opções de voto de uma enquete:
    [{
    		_id: "54759eb3c090d83494e2d999",
    		title: "Javascript",
    		pollId: "54759eb3c090d83494e2d222" 
    	 },
    	{
    		_id: "54759eb3c090d83494e2d888",
    	  title: "Python",
    		pollId: "54759eb3c090d83494e2d222"
    	},]    
    - [ ]  Validação: caso a enquete não exista deve retornar status 404. */
router.get("/poll/:id/choice", async function getPollOptions(req, res) {
	const id = req.params.id;

	try {
		const ValidEnq = await db.collection("polls").find({ _id: ObjectId(id) });
		if (!ValidEnq) {
			return res.status(404);
		}

		const optionList = await db
			.collection("choices")
			.filter({
				pollId: id,
			})
			.toAray();

		res.send(optionList);
	} catch (error) {
		console.error(error);
	}
});

/* 	- **GET** `/poll/:id/result`
    - [ ]  Retorna o resultado de uma enquete, ou seja, a opção de voto **mais votada** na enquete até o momento, seguindo o formato sugerido:
    {
    	_id: "54759eb3c090d83494e2d222",
    	title: "Qual a sua linguagem de programação favorita?"
    	expireAt: "2022-02-14 01:00",
    	result : {
    		title: "Javascript",
    		votes: 487
    	}
    }
		- [ ]  Validação: caso a enquete não exista deve retornar status 404. */

router.get("/poll/:id/result", async function getPollResult(req, res) {
	const id = req.params.id;

	try {
		const ValidEnq = await db.collection("polls").find({ _id: ObjectId(id) });
		if (!ValidEnq) {
			return res.status(404);
		}

		const EnqOptions = await db
			.collection("choices")
			.find({ pollId: ObjectId(id) })
			.toArray();

		let result;
		EnqOptions.map((res, index) => {
			if (res.result.votes > EnqOptions[index]) {
				result = EnqOptions[index];
			}
		});
		/* const result = EnqOptions.map(EnqOptions.result.votes).reduce(function (a, b) {
			return Math.max(a, b);
		}); */

		res.send(result);
	} catch (error) {
		console.error(error);
	}
});

export default router;
