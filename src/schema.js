import joi from "joi";

/* - Armazenamento de dados
- Para persistir os dados (enquete, opção de voto e voto), utilize coleções do Mongo com a biblioteca `mongodb`.
  - O formato de uma enquete deve ser:
    {
        _id: ObjectId("54759eb3c090d83494e2d222"),
        title: 'Qual a sua linguagem de programação favorita?', 
        expireAt: "2022-02-28 01:00"
    } */
const pollSchema = joi.object({
	title: joi.string().required().trim(),
	expiraAt: joi.date().required().trim(),
});

/*- O formato de uma opção de voto deve ser:
    { 
        _id: ObjectId("54759eb3c090d83494e2d999"),
        title: "Javascript", 
        pollId: ObjectId("54759eb3c090d83494e2d222") 
    }*/
const voteOpSchema = joi.object({
	title: joi.string().required().trim(),
	pollId: joi.any(),
});

/*     - O formato de um voto deve ser:
    { 
        _id: ObjectId("54759eb3c090d83494e2d000")
        createdAt: "2022-02-13 01:00", 
        choiceId: ObjectId("54759eb3c090d83494e2d999"), 
    }*/
const voteSchema = joi.object({
	createdAt: joi.date().required().trim(),
	choiceId: joi.any(),
});

export { pollSchema, voteOpSchema, voteSchema };
